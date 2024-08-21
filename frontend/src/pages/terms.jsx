import { ClipboardText } from "@phosphor-icons/react";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function LarsTerms() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/five.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative backdrop-blur-xl bg-white border max-w-[400px] w-[90%] m-auto border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 overflow-hidden">
          {/* <img src="terms.png" className="w-full" /> */}
          <div className="p-4 sm:p-7">
            <div className="flex">
              <ClipboardText
                size={80}
                className="mt-2 ml-4 animate-bounce font-thin"
              />
              <span className="mt-6 ml-2 text-xl font-thin">
                Accept Our Terms And Review Privacy Notice
              </span>
            </div>
            <div className="font-thin w-[90%] mx-auto mt-5 mb-10 text-sm">
              <p>
                By selecting 'I Agree' below, I have reviewed and agree to the{" "}
                <a href="" className="text-blue-300 hover:underline">
                  Terms of Use
                </a>{" "}
                and acknowledge the{" "}
                <a href="" className="text-blue-300 hover:underline">
                  Privacy Notice
                </a>
                .
              </p>
            </div>
            <div>
              <hr />
              <div className="ml-4 w-20 text-md font-thin mt-2">I Agree</div>
              <div className="float-end relative -top-10 mr-2 ">
                <Checkbox ripple={true} />
              </div>
              <div className="flex left-2 relative top-8">
                <Link to={"/signup"}>
                  <Button className="rounded-full w-8">
                    <ArrowLeft size={20} className="-ml-3" />
                  </Button>
                </Link>
              </div>
              <div className="flex float-end relative -top-3">
                <Link to={"/signin"}>
                  <Button className="flex rounded-full">
                    <span className="mt-[2px]">next</span>
                    <ArrowRight size={20} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LarsTerms;
