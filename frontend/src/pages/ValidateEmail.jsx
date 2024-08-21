import { UseHandleVerifyToken } from "../adapters/Requests";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function ValidateEmail() {
  const { email, token } = useParams();
  const handleVerifyToken = UseHandleVerifyToken();
  const verificationAttempted = useRef(false);

  useEffect(() => {
    if (email && token && !verificationAttempted.current) {
      verificationAttempted.current = true;
      handleVerifyToken.mutate({ email, token });
    }
  }, [email, token, handleVerifyToken]);

  return (
    <div className="flex items-center justify-center w-full">
      <Loader2 className="w-16 h-16 stroke-green-600 animate-spin" />
    </div>
  );
}

export default ValidateEmail;
