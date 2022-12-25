import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validation/auth-schemas";
import type { ILogin } from "../../utils/validation/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", { ...data, callbackUrl: "/" });
  }, []);

  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Head>
        <title>Potluck.io - Login</title>
        <meta name="description" content="Potluck.io, the easiest way to host a potluck" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center w-full mt-8"
        >
          <div className="card w-96 shadow-xl">
            <div className="card-body bg-none">
              <h2 className="card-title">Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs mt-2"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs mt-2"
                {...register("password")}
              />
              <div className="card-actions items-center justify-between">
                <Link href="/auth/new-user" className="link">
                  Go to Sign Up
                </Link>
                <button type="submit" className="btn btn-secondary rounded-md">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
