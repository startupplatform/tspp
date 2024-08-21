import { useNavigate } from "react-router-dom";
import { UsePostRefeshToken } from "../adapters/Requests";
import { useState } from "react";

export default function NotVerified() {
  const email = localStorage.getItem("unverifiedEmail");
  const refreshVerifyToken = UsePostRefeshToken();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0); 

  if (!email) {
    navigate("/signin");
  }

  const handleResendVerificationEmail = async () => {
    await refreshVerifyToken.mutateAsync({ email });
    setCounter(120); // Reset counter 
  };

  const handleNewVerificationMail = async () => {
    // Call the function to resend the verification mail
    await handleResendVerificationEmail();
    // Navigate to the email verification page
    navigate(`/verify/email/${email}`);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative flex-col  px-4 py-12 sm:px-6 lg:px-8"
        style={{ backgroundImage: "url('/five.jpg')" }}
      >
        {/* <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div> */}
        <div className="mx-auto max-w-md text-center mt-10 bg-white p-10 rounded-lg shadow-xl">
          <XIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Email Not Verified
          </h1>
          <p className="mt-4 text-muted-foreground">
            Your email is still pending verification. Please verify it first to
            log in or request a new verification mail.
          </p>
          <div className="mt-8 flex  gap-4 sm:flex-row justify-center ">
            <button
              onClick={handleNewVerificationMail}
              className="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-green-50 shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              New Verification Mail
            </button>
            {/* <Link
              to="/sign-up"
              className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign up
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

function XIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9L9 15" />
      <path d="M9 9l6 6" />
    </svg>
  );
}
