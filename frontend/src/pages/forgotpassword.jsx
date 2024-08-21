import { ArrowArcLeft, CaretLeft } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { UsePostResetToken } from "../adapters/Requests";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const resendResetToken = UsePostResetToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resendResetToken.mutateAsync({ email }).then(() => {
        navigate(`/reset/email/${email}`);
      });
    } catch (error) {
      console.error("Error sending reset token:", error);
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/five.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
          <div className="relative top-[15vh] backdrop-blur-xl bg-white border max-w-[400px] w-[90%] m-auto border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                  Forgot password?
                </h1>
                <p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Dont have an account?
                  <a
                    class="text-blue-600 ml-2 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    href="/signup"
                  >
                    Sign up here
                  </a>
                </p>
              </div>

              <div class="mt-5">
                <form onSubmit={handleSubmit}>
                  <div class="grid gap-y-4">
                    <div>
                      <label
                        for="email"
                        class="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div class="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          class="py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          required
                          aria-describedby="email-error"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div class="hidden absolute border inset-y-0 end-0 pointer-events-none pe-3">
                          <svg
                            class="size-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        class="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    </div>
                    <button
                      type="submit"
                      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Link to={"/signin"}>
              <div className="flex font-light text-sm -mt-2 w-32 mb-4 m-auto hover:text-blue-600 hover:underline hover:cursor-pointer">
                <CaretLeft size={18} /> Back to Sign In
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
