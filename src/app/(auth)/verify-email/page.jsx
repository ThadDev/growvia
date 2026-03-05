import { Suspense } from "react";
import VerifyEmailClient from "./verifyEmailClientComponent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
