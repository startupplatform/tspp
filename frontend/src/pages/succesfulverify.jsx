import { Link } from "react-router-dom";
import card from "@material-tailwind/react/theme/components/card";
export default function Verified() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative flex  flex-col  px-4 py-12 sm:px-6 lg:px-8"
        style={{ backgroundImage: "url('/five.jpg')" }}
      >
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div> */}
        {/* <div className="flex min-h-[550px] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"> */}
        <div className="mx-auto max-w-md text-center mt-10 bg-white p-10 rounded-lg shadow-xl">
          <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Email Verified
          </h1>
          <p className="mt-4 text-muted-foreground">
            Congratulations! Your email has been successfully verified. You can
            now login
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-end sm:mr-10">
            <Link
              to={"/signin"}
              className="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-green-50 shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              prefetch={false}
            >
             Sign In
            </Link>{" "}
            <Link
              to={"/"}
              className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              prefetch={false}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
