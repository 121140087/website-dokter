"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { changePassword } from "./_action/changePassword";
import { getResetToken } from "./_action/getResetToken";

const ResetPasswordPage = ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const [email, setEmail] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [message, setMessage] = useState<string | undefined>();
  const router = useRouter();
  const onSubmit = async () => {
    setMessage(undefined);
    if (!email) {
      return;
    }
    const response = await changePassword(
      email,
      newPassword,
      passwordConfirmation
    );
    if (response?.message) {
      setMessage(response.message);
      return;
    }
    setMessage("Berhasil merubah password");
    router.push("/login?message=Berhasil+merubah+password");
  };
  const updateToken = async () => {
    const parm = await params;
    const res = await getResetToken(parm.token);
    if (!res) {
      router.push("/");
      return;
    }
    setEmail(res.email);
  };
  useEffect(() => {
    updateToken();
  }, []);
  if (!email) {
    return <div></div>;
  }
  return (
    <Card className="max-w-[400px] mx-auto mt-40">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <p>New Password</p>
        <Input
          type="password"
          placeholder="********"
          value={newPassword}
          onChange={(e) => {
            e.preventDefault();
            setNewPassword(e.currentTarget.value);
          }}
        />
        <p>Confirm new password</p>
        <Input
          type="password"
          placeholder="********"
          value={passwordConfirmation}
          onChange={(e) => {
            e.preventDefault();
            setPasswordConfirmation(e.currentTarget.value);
          }}
        />
        {message && (
          <CardFooter className="text-slate-500">{message}</CardFooter>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit}>
          Ganti Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordPage;
