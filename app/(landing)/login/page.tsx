"use client";
import { login } from "@/actions/login";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { loginSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="h-full w-full flex justify-center">
      <Card className="w-[400px] mt-48">
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
              <Button className="w-full" disabled={isLoading}>
                Masuk
              </Button>

              <Link href="/register">
                <Button className="w-full mt-4" variant={"outline"}>
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
