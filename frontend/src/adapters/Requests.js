import { apiClient, queryClient } from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { GetUserId, handleError } from "./utils";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "sonner";

function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: (formData) => {
      return apiClient.post("users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      const token = res.data.token;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setAuth({ userId, token });
      queryClient.invalidateQueries("userdata");
      navigate("/start");
    },
    onError: (error) => {
      console.error("An error occurred during login:", error);
      if (error.response && error.response.status === 403) {
        const email = error.response.data.email;
        localStorage.setItem("unverifiedEmail", email);
        navigate("/notverified");
      } else {
        // Handle other types of errors
        console.error("Unexpected error:", error);
      }
    },
  });
}

function UseSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await apiClient.post(`users/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (!data || !data.email) {
        console.error("Invalid data received:", data);
        return;
      }
      queryClient.invalidateQueries("userdata");
      toast.success("You have been successfully registered.");
      navigate(`/verify/email/${data.email}`);
    },
    onError: (error) => {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during signup. Please try again.");
      }
    },
  });
}

function useLogout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const apiClientPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await apiClientPrivate.get("/users/logout");
        return res.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      setAuth({});
      queryClient.invalidateQueries();
      navigate("/signin", { replace: true });
    },
  });
}

function UseGetIsUserVerified(email) {
  return useQuery({
    queryKey: ["userdata", email],
    queryFn: async () => {
      if (!email) {
        return null;
      }
      try {
        const res = await apiClient.get(`users/verify/status/${email}`);
        return res.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
}

function UsePostRefeshToken() {
  return useMutation({
    mutationFn: async ({ email }) => {
      try {
        const response = await apiClient.post(`users/verify/resend/${email}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Email Successfully Sent.");
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
}

//correction
function UseHandleVerifyToken() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signin";
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async ({ email, token }) => {
      return apiClient.post(`users/verify/email/${email}/${token}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        // staleTime: 50000,
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
      if ([401, 403, 404].includes(error.response.status)) {
        navigate("/tokenused");
        console.log(error);
      } else if (error.response?.status === 408) {
        localStorage.setItem("expiredEmail", error.response.data.email);
        navigate("/tokenexpired", { replace: true });
        console.log(error);
      } else if (
        error.response?.data?.error === "no token of the such exists"
      ) {
        navigate(`/signup`);
      }
    },
    onSuccess: (res) => {
      const token = res.data.token;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setAuth({ userId, token });
      queryClient.invalidateQueries("userdata");

      if (res.data.message === "Verification successful") {
        navigate("/verified");
      }
    },
  });
}

function UsePostResetToken() {
  return useMutation({
    mutationFn: async ({ email }) => {
      try {
        const response = await apiClient.post(`users/reset/email/${email}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Email Successfully Sent.");
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
}

function UseHandleResetToken() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ token, formData }) => {
      const response = await apiClient.post(
        `users/reset/password/${token}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      navigate("/signin", { replace: true });
    },
  });
}

function UseUserinfo() {
  const userId = GetUserId();
  const apiClientPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["userdata", userId],
    queryFn: async () => {
      if (!userId) {
        return null;
      }
      try {
        const res = await apiClientPrivate.get(`users/${userId}`);
        return res.data;
      } catch (error) {
        handleError(error);
      }
    },
    staleTime: 1000000,
  });
}

export {
  useLogin,
  UseSignup,
  useLogout,
  UseUserinfo,
  UseGetIsUserVerified,
  UsePostRefeshToken,
  UseHandleVerifyToken,
  UsePostResetToken,
  UseHandleResetToken,
};
