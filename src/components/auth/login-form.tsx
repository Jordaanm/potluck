import { zodResolver } from "@hookform/resolvers/zod";
import type { ILogin} from "../../utils/validation/auth-schemas";
import { loginSchema } from "../../utils/validation/auth-schemas";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface LoginFormProps {
  goToSignup: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { goToSignup } = props;

  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", { ...data, callbackUrl: "/" });
  }, []);

  return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center w-full mt-8"
        >
          <div className="card w-96">
            <div className="card-body">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs mt-2 rounded-md bg-black bg-opacity-10 placeholder-gray-200 text-white"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs mt-2 rounded-md bg-black bg-opacity-10 placeholder-gray-200 text-white"
                {...register("password")}
              />
              <div className="card-actions items-center justify-between">
                <Link href="" className="link text-opacity-50 text-black text-base" onClick={goToSignup}>
                  I need to create an account
                </Link>
                <button type="submit" className="btn btn-secondary rounded-3xl bg-[#cfa168] text-white">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
  );
};

export default LoginForm;