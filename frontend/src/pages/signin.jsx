import React, { useState } from "react";
import { useLogin } from "../adapters/Requests";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import AlertCustom from "../components/alert";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const loginMutation = useLogin();

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

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await loginMutation.mutateAsync(formData);
        // Handle successful login (e.g., redirect to dashboard)
      } catch (error) {
        console.error("Error submitting data:", error);
        if (error.response && [400, 401, 404].includes(error.response.status)) {
          setAlert({
            show: true,
            message: error.response.data.error || "Login failed",
            severity: "error",
          });
        } else {
          setAlert({
            show: true,
            message: "Something went wrong, please try again later.",
            severity: "error",
          });
        }
      }
    }
  };

  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/five.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
          <div className="relative top-[6vh] backdrop-blur-xl bg-white border max-w-[400px] w-[90%] m-auto border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-4 sm:p-7 ">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign in
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Don't have an account yet?
                  <a
                    className="text-blue-600 ml-2 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    href="/signup"
                  >
                    Sign up here
                  </a>
                </p>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <svg
                    className="w-4 h-auto"
                    width="46"
                    height="47"
                    viewBox="0 0 46 47"
                    fill="none"
                  >
                    <path
                      d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                      fill="#34A853"
                    />
                    <path
                      d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                  Or
                </div>
                <form onSubmit={onSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label className="block text-sm mb-2 dark:text-white">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          required
                          aria-describedby="email-error"
                        />
                        {errors.email && (
                          <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                            <svg
                              className="size-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p
                          className="text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="block text-sm mb-2 dark:text-white">
                          Password
                        </label>
                        <a
                          className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                          href="/reset"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          type={visible ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
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
                    <div className="flex items-center">
                      <div className="flex">
                        <input
                          id="remember-me"
                          name="rememberMe"
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="shrink-0 mt-0.5 border-gray-200 rounded checked:bg-black bg-black  text-gray-600 focus:ring-gray-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-gray-500 dark:checked:border-gray-500 dark:focus:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ms-3">
                        <label className="text-sm dark:text-white">
                          Remember me
                        </label>
                      </div>
                    </div>

                    <AlertCustom
                      severity={alert.severity}
                      message={alert.message}
                      open={alert.show}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending
                        ? "Signing you in..."
                        : "Sign In"}
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

export default SignIn;
