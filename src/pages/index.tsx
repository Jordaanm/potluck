import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import UserSwitch from "../components/user-switcher";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data, error, isFetching } = trpc.potluck.getAllForUser.useQuery({ userId: sessionData?.user?.id});


  return (
    <>
      <Head>
        <title>Potluck.io</title>
        <meta name="description" content="Potluck.io, the easiest way to host a potluck" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
        </style>

      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#dfd9d2] to-[#e0dad2] sm-flex-col-reverse lg:flex-row pl-8">
        <div className="container flex-1 flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="w-6/12 text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] text-opacity-75" style={{fontFamily: 'Playfair Display'}}>
            Potluck.io
          </h1>
          <div className="w-6/12 my-4 text-black text-opacity-50" style={{fontFamily: 'Playfair Display'}}>
            <p className="text-2xl">The easiest way to host a potluck.</p>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            { !sessionData && <UserSwitch /> }
            { sessionData && <div className="w-6/12">
              <h3 className="text-xl text-black text-opacity-50 mb-4" style={{fontFamily: 'Playfair Display'}}>Welcome back, {sessionData.user?.name}</h3>
              {data?.status === 200 && Boolean(data.result) && (
                <div className="flex flex-col gap-4">
                  {data.result.hosting.length > 0 && <>
                    <p className="text-black font-extrabold text-opacity-50" style={{fontFamily: 'Playfair Display'}}>
                      Potlucks You&apos;re Hosting
                    </p>
                    <div className="flex flex-col items-start">
                      {data.result.hosting.map((potluck) => (
                        <Link href={`/potluck/${potluck.id}`} className="rounded-2xl bg-[#cfa168] bg-opacity-25 border-[#cfa168] focus:border-[#cfa168] border-b-2 mb-4 px-4 py-2 text-white" key={potluck.id}>
                          {potluck.name}
                        </Link>
                      ))}
                    </div>
                  </>}
                  {data.result.attending.length > 0 && <>
                    <p className="text-black font-extrabold text-opacity-50" style={{fontFamily: 'Playfair Display'}}>
                      Potlucks You&apos;re Attending
                    </p>
                    <div className="flex flex-col items-start">
                      {data.result.attending.map((potluck) => (
                        <Link href={`/potluck/${potluck.id}`} className="rounded-2xl bg-[#cfa168] bg-opacity-25 border-[#cfa168] focus:border-[#cfa168] border-b-2 mb-4 px-4 py-2 text-white" key={potluck.id}>
                          {potluck.name}
                        </Link>
                      ))}
                    </div>
                  </>}
                </div>
              )}
              <Link href="/potluck/create" className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white mt-8">Create a new Potluck</Link>
            </div>}
          </div>
        </div>
        <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-no-repeat bg-center bg-contain" style={{backgroundImage: 'url(/potluck-splash-no-bg2.png)'}}></div>
      </main>
    </>
  );
};

export default Home;
