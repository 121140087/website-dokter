"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/definitions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    setMessage(searchParams.get("message"));
  }, []);
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setMessage(null);
    setError(undefined);
    setIsLoading(true);

    try {
      const result = await login(values);
      setError(result?.error);
      setMessage(result?.message);
      if (!result) {
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
      setError("Terjadi Kesalahan");
    }
    setIsLoading(false);
  };
  return (
    <div className="h-full w-full flex justify-center">
      <Card className="w-[400px] mt-20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Masuk</CardTitle>

          <CardDescription className="text-center">
            Masuk untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>Contoh john@mail.com</FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="**********"
                          {...field}
                          type="password"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>
                        Masukan password yang sesuai
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {error && (
                <div className="p-2 w-full rounded bg-destructive-foreground">
                  <p className=" text-destructive text-center">{error}</p>
                </div>
              )}
              {message && (
                <div className="p-2 w-full rounded bg-green-100">
                  <p className=" text-green-700 text-center">{message}</p>
                </div>
              )}
              <Link
                href={"/forgot-password"}
                className="text-end text-slate-500 mt-8"
              >
                Lupa password?
              </Link>

              <Button className="w-full" disabled={isLoading}>
                Masuk
              </Button>

              <Link href="/register">
                <Button
                  className="w-full mt-4"
                  variant={"outline"}
                  disabled={isLoading}
                >
                  Belum punya akun? Daftar
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
