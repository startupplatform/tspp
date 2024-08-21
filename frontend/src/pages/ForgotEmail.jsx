import { UsePostResetToken } from "../adapters/Requests";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Mailbox } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ForgotEmail() {
  const { email } = useParams();
  const [counter, setCounter] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        return prevCounter > 0 ? prevCounter - 1 : prevCounter;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resendResetToken = UsePostResetToken();

  const handleResendForgotPasswordEmail = async () => {
    await resendResetToken.mutateAsync({ email });
    setCounter(120);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/five.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
      <div className="pt-10 flex px-4 md:px-10 lg:px-20 items-center justify-center w-full">
        <Card className="w-96 bg-[#FAFAFA]">
          <CardHeader
            floated={false}
            className="h-20 flex items-center justify-center bg-[#8ADBAF]"
          >
            <Mailbox
              className="stroke-accent fill-[#159351]"
              width={60}
              height={60}
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="green" className="mb-2">
              Please Check Your Email to Reset Your Password
            </Typography>
            <Typography className="mb-2">
              You're almost there! We sent an email to
            </Typography>
            <Typography variant="h5" color="green" className="mb-2">
              {email}
            </Typography>
            <Typography className="mb-4">
              Just click on the link in that email to change your password. If
              you don't see it, you may need to{" "}
              <span className="font-semibold">check your spam</span> folder.
              Still can't find the email? No problem.
            </Typography>
            <Typography className="mb-4">
              Time remaining <span>{formatTime(counter)}</span>
            </Typography>
            <Button
              className="bg-[#007D39] hover:bg-[#159351]"
              onClick={handleResendForgotPasswordEmail}
              disabled={counter > 0}
              fullWidth
            >
              Resend Email
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ForgotEmail;
