import { useState } from "react";
import { UseSignup } from "../adapters/Requests";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import AlertCustom from "../components/alert";
import { UseHandleResetToken } from "../adapters/Requests";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const { email, token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    show: false,
  });
  const HandleResetToken = UseHandleResetToken();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms and Conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await HandleResetToken.mutateAsync({ token, formData });
        toast.success(
          "You Have Successfully Changed Your Password login to continue"
        );
        return setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status !== 500) {
          // Handle server-side validation error
          toast.error(error.response.data.error);
          return setTimeout(() => {
            navigate("/reset");
          }, 5000);
        } else {
          // Handle other errors (e.g., network issues)
          toast.error("There was a problem with your request.");
          return;
        }
      }
    }
  };

  const [visible, setVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/five.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
          <div className="relative top-[5vh] max-w-[450px] w-[90%] m-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Forgot Password
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Remember your password?
                  <a
                    className="text-blue-600 decoration-2 ml-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    href="/signin"
                  >
                    Sign in here
                  </a>
                </p>
              </div>

              <div className="mt-5">
                <form onSubmit={onSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                          className="py-3 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder={`${email}`}
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={visible ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                          required
                          aria-describedby="password-error"
                        />
                        <button
                          type="button"
                          onClick={() => setVisible(!visible)}
                          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                        >
                          {visible ? <Eye /> : <EyeClosed />}
                        </button>
                      </div>
                      {errors.password && (
                        <p
                          className="text-xs text-red-600 mt-2"
                          id="password-error"
                        >
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                          required
                          aria-describedby="confirm-password-error"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmPasswordVisible(!confirmPasswordVisible)
                          }
                          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                        >
                          {confirmPasswordVisible ? <Eye /> : <EyeClosed />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p
                          className="text-xs text-red-600 mt-2"
                          id="confirm-password-error"
                        >
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <AlertCustom
                      severity={alert.severity}
                      message={alert.message}
                      open={alert.show}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
