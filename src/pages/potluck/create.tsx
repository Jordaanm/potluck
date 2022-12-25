import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import type { IPotluckCreate } from "../../utils/validation/potluck-schemas";
import { potluckCreationSchema } from "../../utils/validation/potluck-schemas";

export const PotluckPage: NextPage = () => {
  const router = useRouter();
  const {data: sessionData } = useSession();
  const { register, handleSubmit, formState } = useForm<IPotluckCreate>({
    resolver: zodResolver(potluckCreationSchema),
  });

  const { mutateAsync } = trpc.potluck.create.useMutation();

  const onSubmit = useCallback(
    async (data: IPotluckCreate) => {
      const result = await mutateAsync(data);
      if(result.status === 201) {
        router.push("/potluck/[potluckid]", `/potluck/${result.result.potluck.id}`);
      }
    },
    [mutateAsync, router]
  );

  return (
    <>
      <Head>
        <title>Potluck.io</title>
        <meta name="description" content="Potluck.io, the easiest way to host a potluck" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');`}
        </style>

      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#dfd9d2] to-[#e0dad2] sm-flex-col-reverse lg:flex-row">
        <div className="container flex-1 flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] text-opacity-75" style={{fontFamily: 'Playfair Display'}}>
            Create a new Potluck
          </h1>
          <form className="flex flex-col gap-4 mt-8 w-full px-8" onSubmit={handleSubmit(onSubmit)}>
            {formState?.errors?.name && <>
              <div className="text-red-500">
                {formState?.errors?.name?.message}
              </div>
            </>}
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered border border-gray-300 rounded-md p-2"
              {...register("name")}
            />
            {formState?.errors.description && <>
              <div className="text-red-500">
                {formState?.errors?.description?.message}
              </div>
            </>}
            <input
              type="text"
              placeholder="Description"
              className="input input-bordered border border-gray-300 rounded-md p-2"
              {...register("description")}
            />
            {formState?.errors.date && <>
              <div className="text-red-500">
                {formState?.errors?.date?.message}
              </div>
            </>}
            <input
              type="datetime-local"
              placeholder="Date"
              className="input input-bordered border border-gray-300 rounded-md p-2"
              {...register("date")}
            />
            <input
              type="hidden"
              value={sessionData?.user?.email || ""}
              {...register("hostEmail")}
            />
            {formState?.errors.location && <>
              <div className="text-red-500">
                {formState?.errors?.location?.message}
              </div>
            </>}
            <input
              type="text"
              placeholder="Location"
              className="input input-bordered border border-gray-300 rounded-md p-2"
              {...register("location")}
            />
            <div className="modal-action">
              <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white" type="submit">Create</button>
              <Link href="/" className="btn btn-secondary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white">Cancel</Link>
            </div>
          </form>
        </div>
        <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-no-repeat bg-center bg-contain" style={{backgroundImage: 'url(/potluck-splash-no-bg2.png)'}}></div>
      </main>
    </>
  );
};

export default PotluckPage;