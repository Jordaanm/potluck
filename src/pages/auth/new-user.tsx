import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/validation/auth-schemas";
import type { ISignUp } from "../../utils/validation/auth-schemas";
import { trpc } from "../../utils/trpc";

const Signup: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.auth.signup.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        //Extract 201 to a named const
        router.push("/auth/login");
      }
    },
    [mutateAsync, router]
  );

  return (
    <div className="page h-screen w-screen">
      <Head>
        <title>Potluck.io - Create a New User</title>
        <meta name="description" content="Potluck.io, the easiest way to host a potluck" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-full w-full">
        <div className="hero bg-base-200 h-full">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Signup Now!</h1>
              <p className="py-6">Lorem Ipsum dolor su su sudio</p>
            </div>
            <form
              className="flex items-center justify-center h-full w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Create an Account</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full max-w-xs"
                    {...register("name")}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                    {...register("email")}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                    {...register("password")}
                  />
                  <div className="card-actions items-center justify-between">
                    <Link href="/auth/login" className="link">
                      Go to Login
                    </Link>
                    <button type="submit" className="btn btn-secondary">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
