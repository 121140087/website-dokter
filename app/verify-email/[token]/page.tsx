"use server";

import { verifyEmail } from "@/actions/verifyEmail";
import { redirect } from "next/navigation";

const VerifyEmailPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const parm = await params;
  await verifyEmail(parm.token);
  return redirect("/login");
};

export default VerifyEmailPage;
