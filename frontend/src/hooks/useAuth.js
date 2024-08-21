import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.userId ? "Logged In" : "Logged Out"));
  return { auth, setAuth };
};

export default useAuth;
