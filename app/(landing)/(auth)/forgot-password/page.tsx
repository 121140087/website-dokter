"use client"
import { sendResetPasswordEmail } from "@/actions/sendResetPasswordEmail";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { validEmail } from "@/lib/utils";
import { useState } from "react";

const ForgotPasswordPage = () => {
    const [email,setEmail] = useState("");
    const [error,setError] = useState<string | undefined>();
    const [message,setMessage] = useState<string | undefined>();
    const onSubmit = async() => {
        if (!validEmail(email)) {
            setError("Email tidak valid");
            return;
        }

    }
    return ( <Card className="max-w-[400px] mx-auto mt-40">
        <CardHeader>
            <CardTitle>Ganti Password</CardTitle>
            <CardDescription>Link ganti password akan dikirim ke email anda. Pastikan anda memasukan email yang telah terdaftar</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
        <Input type="email" placeholder="example@mail.com" value={email} onChange={(e) => {
            e.preventDefault();
            setEmail(e.currentTarget.value);
        }}/>
        {error && <CardFooter className="text-destructive">
            {error}
            </CardFooter>}
            {message && <CardFooter className="text-green-500">
            {message}
            </CardFooter>}
        <Button onClick={onSubmit}>Kirim link ganti password</Button>
        </CardContent>
    </Card> );
}
 
export default ForgotPasswordPage;