"use client";

import * as z from 'zod';

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useFormStatus } from "react-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { setTokenSourceMapRange } from "typescript";
import { useAppContext } from "../../context";

const LoginSchema = z.object({
  username: z.string().min(1, {
      message: "Please enter your username"
  }),
  password: z.string().min(6, {
      message: "Password must be at least 6 characters long"
})
})

const LoginForm = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
      setToken
    } = useAppContext()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/login/', data);
      localStorage.setItem('token', response.data.access)
      setToken(response.data.access)
      router.push("/")
      reset();
    } catch (err) {
      setError(err.message);
      // console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Giriş üçin!"
      title="Giriş"
      backButtonHref="/auth/register"
      backButtonLabel="Öň agza bolduňyzmy? agza boluň. "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulanyjy adyňyz</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="username"
                      placeholder="Ulanyjy adyňyzy giriziň..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-gray-300" disabled={pending}>
            {loading ? "Loading..." : "Giriş"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
