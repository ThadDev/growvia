import { Suspense } from "react";
import ResetPasswordClient from "./resetPasswordClient";

const ResetPasswordPage = () => {
  return ( 
    <Suspense fallback={<Loading />}>
      <ResetPasswordClient/>
    </Suspense>
   );
}
 
export default ResetPasswordPage;

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen text-text">
      Loading...
    </div>
  );
}