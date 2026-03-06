import { Suspense } from "react";
import VerifyOtpClient from "./verifyOtpClient";


const VerifyOtpPage = () => {
  return ( 
    <Suspense fallback={<Loading/>}>
      <VerifyOtpClient/>
    </Suspense>
   );
}
 
export default VerifyOtpPage;

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen text-text">
      Loading...
    </div>
  );
}
