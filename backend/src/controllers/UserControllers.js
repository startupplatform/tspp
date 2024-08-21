require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const mailHelper = require("../email/mail");

const User = prisma.user;

function handleError(res, error) {
  return res.status(500).json({ error: "Internal server error" });
}

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if email already exists
    const existingUser = await User.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Hash the password using a secure cost factor (adjust as needed)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      data: {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
      },
    });
    const verification_token = await prisma.verificationToken.create({
      data: {
        email: newUser.email,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        token: uuidv4(),
      },
    });
    try {
      await mailHelper.sendConfirmation(
        newUser.username,
        newUser.email,
        `${process.env.SERVER_URL}/verify/token/${newUser.email}/${verification_token.token}`
      );
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res
      .status(201)
      .json({ message: "User created successfully", email: newUser.email });
  } catch (error) {
    handleError(res, error);
  }
};

exports.handleRefreshVerifyToken = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findUnique({ where: { email: email } });
    if (!user) return res.status(404).json({ message: "User not Found." });
    const verification_token = await prisma.verificationToken.create({
      data: {
        email: user.email,
        expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
        token: uuidv4(),
      },
    });
    await mailHelper.sendConfirmation(
      user.username,
      user.email,
      `${process.env.SERVER_URL}/verify/token/${user.email}/${verification_token.token}`
    );
    res
      .status(201)
      .json({ message: "email successfully sent ", email: user.email });
  } catch (error) {
    handleError(res, error);
  }
};

exports.handleVerifyUserToken = async (req, res) => {
  const { email, token } = req.params;
  if (!email || !token)
    return res.status(401).json({ error: "no email or token sent" });

  const verification_token = await prisma.verificationToken.findUnique({
    where: {
      email_token: { email, token },
    },
  });

  if (!verification_token)
    return res.status(401).json({ error: "no token of the such exists" });

  if (verification_token.expires < new Date())
    return res
      .status(408)
      .json({ error: "verification token has expired", email: email });

  const user = await User.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  if (user.is_verified) {
    return res
      .status(403)
      .json({ error: "User already verified", token: accessToken });
  }

  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  await User.update({
    where: { email },
    data: {
      is_verified: true,
      refresh_token: refreshToken,
      verified_at: new Date(),
    },
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json({ message: "Verification successful", token: accessToken });
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid Email Address or password." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid Email Address or password." });
    }

    // Check if user is verified
    if (!user.is_verified) {
      const verification_token = await prisma.verificationToken.create({
        data: {
          email: user.email,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          token: uuidv4(),
        },
      });
      return res
        .status(403)
        .json({ error: "Your email has not been verified", email: email });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Update user with the refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
    });

    // Send refresh token as a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send access token in response
    return res
      .status(200)
      .json({ message: "Login successful", token: accessToken });
  } catch (error) {
    // console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await prisma.user.findUnique({
    where: { refresh_token: refreshToken },
  });
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || foundUser.id !== decoded.userID) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { userId: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ accessToken: accessToken });
  });
};

exports.logoutUser = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await prisma.user.findUnique({
    where: { refresh_token: refreshToken },
  });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  await prisma.user.update({
    where: { id: foundUser.id },
    data: { refresh_token: null },
  });
  res.clearCookie("jwt", { httpOnly: true, secure: true });
  res.sendStatus(204);
};

exports.getIsUserVerified = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(401).json({ error: "No email Provided" });
    }
    const user = await User.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    return res.status(200).json({ is_verified: user.is_verified });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.handleSendForgetToken = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findUnique({ where: { email: email } });
    if (!user) return res.status(404).json({ message: "User not Found." });
    const password_reset_token = await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        expires: new Date(Date.now() + 30 * 60 * 1000),
        token: uuidv4(),
      },
    });
    await mailHelper.sendConfirmation(
      user.username,
      user.email,
      `${process.env.SERVER_URL}/reset/reset/${user.email}/${password_reset_token.token}`
    );
    res.status(201).json({
      message: "email successfully sent ",
      email: user.email,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.handleVerifyForgetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword, email } = req.body;
    if (!email || !token)
      return res.status(404).json({ error: "no email or token sent" });
    const password_reset_token = await prisma.passwordResetToken.findUnique({
      where: {
        email: email,
        token: token,
      },
    });
    if (!password_reset_token)
      return res.status(404).json({ error: "no token of the such exists" });
    if (password_reset_token.expires < new Date())
      return res.status(401).json({ error: "verification token has expired" });
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Hash the password using a secure cost factor (adjust as needed)
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.update({
      where: { email: email },
      data: { password: hashedPassword, updated_at: new Date() },
    });
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    handleError(res, error);
  }
};
