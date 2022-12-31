import { useCallback } from "react";
import type { ISignUp} from "../../utils/validation/auth-schemas";
import { signUpSchema } from "../../utils/validation/auth-schemas";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

interface SignupProps {
  goToLogin: () => void;
}

export const SignupForm = (props: SignupProps) => {
  const { goToLogin } = props;
  
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const { mutateAsync } = trpc.auth.signup.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);
      if(result.status === 201) {
        goToLogin();
      }
    },
    [goToLogin, mutateAsync]
  );

  return (
    <form
    className="flex items-center justify-center h-full w-full"
    onSubmit={handleSubmit(onSubmit)}
  >
    <div className="card w-96">
      <div className="card-body">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs rounded-md bg-black bg-opacity-10 placeholder-gray-200 text-white"
          {...register("name")}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs rounded-md bg-black bg-opacity-10 placeholder-gray-200 text-white"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs rounded-md bg-black bg-opacity-10 placeholder-gray-200 text-white"
          {...register("password")}
        />
        <div className="card-actions items-center justify-between">
          <Link href="" className="link" onClick={goToLogin}>
            I already have an account
          </Link>
          <button type="submit" className="btn btn-secondary rounded-md bg-[#cfa168] text-white">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </form>
  )
};

export default SignupForm;