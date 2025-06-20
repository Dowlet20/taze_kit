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
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance.jsx"; 
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
  username: z.string().min(1, {
      message: "Please enter your username"
  }),
  firstname: z.string().min(1, {
      message: "Please enter your firstname"
  }),
  lastname: z.string().min(1, {
      message: "Please enter your lastname"
  }),
  password1: z.string().min(6, {
      message: "Password must be at least 6 characters long"
  }),
  password2: z.string().min(6, {
      message: "Password must be at least 6 characters long"
  })
})

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      password1: "",
      password2: "",
    },
  });




  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosInstance.post('/user/', data);
      router.push("/auth/login")

      reset();
    } catch (err) {
      setError(err.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Agza bolmak üçin!"
      title="Agza bol"
      backButtonHref="/auth/login"
      backButtonLabel="Öň agza bolduňyzmy? Giriş. "
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
                      placeholder="Ulanyjy adyňyzy giriziň"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adyňyz</FormLabel>
                  <FormControl>
                    <Input {...field} 
                    placeholder="Adyňyzy giriziň" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Familiýaňyz</FormLabel>
                  <FormControl>
                    <Input {...field} 
                    placeholder="Familiýaňyzy giriziň" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" 
                    placeholder="parolyňyzy giriziň" 
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Tassyklaň</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="paroly giriziň" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-gray-300" disabled={pending}>
            {loading ? "Loading..." : "Agza bol"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
