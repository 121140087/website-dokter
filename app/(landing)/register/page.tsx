"use client";
import { register } from "@/actions/register";
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
import { registerSchema } from "@/lib/definitions/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | undefined>();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      nama: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError(undefined);
    setIsLoading(true);
    try {
      await register(values);
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message}`);
      } else {
        setError(`${error}`);
      }
    }
    setIsLoading(false);
    redirect("/user/create");
  };
  return (
    <div className="h-full w-full flex justify-center">
      <Card className="w-[400px] mt-48">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Daftar</CardTitle>

          <CardDescription className="text-center">
            Daftar untuk bergabung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nama"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>Contoh John</FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
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
              <p className="text-red-500">{error}</p>
              <Button className="w-full" disabled={isLoading}>
                Daftar
              </Button>

              <Link href="/login">
                <Button className="w-full mt-4" variant={"outline"}>
                  Sudah punya akun? Masuk
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
