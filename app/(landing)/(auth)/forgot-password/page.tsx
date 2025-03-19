"use client";
import { generateResetPasswordToken } from "@/app/(landing)/(auth)/forgot-password/_action/generateResetPasswordToken";
import { sendResetPasswordEmail } from "@/app/(landing)/(auth)/forgot-password/_action/sendResetPasswordEmail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { validEmail } from "@/lib/utils";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    setError(undefined);
    setMessage(undefined);
    if (!validEmail(email)) {
      setError("Email tidak valid");
      setLoading(false);
      return;
    }
    const token = await generateResetPasswordToken(email);
    await sendResetPasswordEmail(email, token.token);
    setMessage(`Link reset password telah dikirim ke ${email}`);
    setLoading(false);
  };
  return (
    <Card className="max-w-[400px] mx-auto mt-40">
      <CardHeader>
        <CardTitle>Ganti Password</CardTitle>
        <CardDescription>
          Link reset password akan dikirim ke email anda. Pastikan anda
          memasukan email yang telah terdaftar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <Input
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.currentTarget.value);
          }}
        />
        {error && <CardFooter className="text-destructive">{error}</CardFooter>}
        {message && (
          <CardFooter className="text-green-500">{message}</CardFooter>
        )}
        <Button onClick={onSubmit}>Kirim link reset password</Button>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
