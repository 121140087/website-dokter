"use server";

import { verifyEmail } from "@/actions/verifyEmail";
import { redirect } from "next/navigation";

const VerifyEmailPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const parm = await params;
  const response = await verifyEmail(parm.token);
  if (response.error) {
    return redirect("/login" + "?" + "error=" + response?.error);
  }
  return redirect("/login" + "?" + "message=" + response?.message);
};

export default VerifyEmailPage;
