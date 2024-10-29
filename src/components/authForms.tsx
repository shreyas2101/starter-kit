"use client";
// import { FilledGoogleIcon } from "@/components/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type FieldValues, useForm, type UseFormReturn } from "react-hook-form";
import type z from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/login.schema";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { CheckCircledIcon, ExclamationTriangleIcon } from "@/components/icons";
import { api } from "@/trpc/react";
import { RegisterSchema } from "@/schemas/register.schema";
import { useLogin } from "@/hooks/use-login";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/enums";
import { toTitleCase } from "@/lib/stringUtils";

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending, isSuccess, data, error } = useLogin();

  const onSubmit = React.useCallback(
    async (values: z.infer<typeof LoginSchema>) => {
      login(values);
    },
    [login],
  );

  return (
    <FormCard
      title="Login"
      description="Enter your email below to login to your account"
      className="min-w-96"
    >
      <FormContent form={form} onSubmit={onSubmit}>
        {/* Email field */}
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="john.doe@example.com"
                  type="email"
                  className="mt-0"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <FormControl>
                <Input
                  {...field}
                  placeholder="*****"
                  type="password"
                  className="mt-0"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormResponseMessage
          message={isSuccess ? data?.message : error?.message}
          isSuccess={isSuccess}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={isPending}
          loadingText="Submitting"
        >
          Login
        </Button>
        {/* <Button variant="outline" className="w-full">
          <FilledGoogleIcon /> Login with Google
        </Button> */}
      </FormContent>

      <FormFooter>
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline">
          Sign up
        </Link>
      </FormFooter>
    </FormCard>
  );
}

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: UserRole.CUSTOMER,
    },
  });

  const { mutate, isPending, isSuccess, data, error } =
    api.user.create.useMutation({
      onSuccess(_data, _variables, _context) {
        form.reset();
      },
    });

  const onSubmit = React.useCallback(
    (values: z.infer<typeof RegisterSchema>) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <FormCard
      title="Register"
      description="Create account"
      className="min-w-96"
    >
      <FormContent onSubmit={onSubmit} form={form}>
        {/* Name field */}
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Doe"
                  type="text"
                  className="mt-0"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email field */}
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="john.doe@example.com"
                  type="email"
                  className="mt-0"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="*****"
                  type="password"
                  className="mt-0"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name={"role"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={UserRole.CUSTOMER} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {toTitleCase(UserRole.CUSTOMER)}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={UserRole.SELLER} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {toTitleCase(UserRole.SELLER)}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={UserRole.ADMIN} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {toTitleCase(UserRole.ADMIN)}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormResponseMessage
          message={isSuccess ? data?.message : error?.message}
          isSuccess={isSuccess}
        />
        <Button type="submit" className="w-full" isLoading={isPending}>
          Login
        </Button>
      </FormContent>
      <FormFooter>
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Sign in
        </Link>
      </FormFooter>
    </FormCard>
  );
}

type FormContentProps<TFormData extends FieldValues> = {
  className?: string;
  children: React.ReactNode;
  form: UseFormReturn<TFormData>;
  onSubmit: (values: TFormData) => void;
};

function FormContent<TFormData extends FieldValues>({
  className = "",
  children,
  form,
  onSubmit,
}: FormContentProps<TFormData>): JSX.Element {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col gap-6", className)}>{children}</div>
      </form>
    </Form>
  );
}

type FormFooterProps = {
  className?: string;
  children: React.ReactNode;
};

function FormFooter({
  className = "",
  children,
}: FormFooterProps): JSX.Element {
  return (
    <div className={cn("mt-4 text-center text-sm", className)}>{children}</div>
  );
}

type FormCardProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

function FormCard({
  children,
  title,
  description,
  className = "",
}: FormCardProps): JSX.Element {
  return (
    <Card className={cn("mx-auto max-w-sm", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

type FormResponseMessageProps = {
  message?: string;
  isSuccess?: boolean;
};

function FormResponseMessage({
  message,
  isSuccess,
}: FormResponseMessageProps): JSX.Element {
  if (!message) return <></>;

  return !isSuccess ? (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p aria-live="polite">{message}</p>
    </div>
  ) : (
    <div className="flex items-center gap-x-2 rounded-md bg-green-300/15 p-3 text-sm text-green-600">
      <CheckCircledIcon className="h-4 w-4" />
      <p aria-live="polite">{message}</p>
    </div>
  );
}
