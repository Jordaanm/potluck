import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import UserSwitch from "../components/user-switcher";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const openPotluckDialog = () => { setCreateDialogOpen(true); }

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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#dfd9d2] to-[#e0dad2] sm-flex-col-reverse lg:flex-row">
        <div className="container flex-1 flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] text-opacity-75" style={{fontFamily: 'Playfair Display'}}>
            Potluck.io
          </h1>
          <div className="my-4 text-black text-opacity-50" style={{fontFamily: 'Playfair Display'}}>
            <p className="text-2xl">The easiest way to host a potluck.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            { !sessionData && <UserSwitch /> }
            { sessionData && <div>
              <h3 className="text-xl text-black text-opacity-50" style={{fontFamily: 'Playfair Display'}}>Welcome back, {sessionData.user?.name}</h3>
              {/* TODO: Show Existing Potlucks here */}
              <Link href="/potluck/create" className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white mt-8">Create a new Potluck</Link>
            </div>}
          </div>
        </div>
        <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-no-repeat bg-center bg-contain" style={{backgroundImage: 'url(/potluck-splash-no-bg2.png)'}}></div>
        
        <dialog open={isCreateDialogOpen} className="bg-[#c0bab2] shadow-2xl rounded-2xl w-6/12 p-8">
          <div className="">
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>Create a new Potluck</h2>
            <form className="flex flex-col gap-4">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="border border-gray-300 rounded-md p-2" />
              <label htmlFor="date">Date</label>
              <input type="date" name="date" id="date" className="border border-gray-300 rounded-md p-2" />
              <label htmlFor="time">Time</label>
              <input type="time" name="time" id="time" className="border border-gray-300 rounded-md p-2" />
              <label htmlFor="location">Location</label>
              <input type="text" name="location" id="location" className="border border-gray-300 rounded-md p-2" />
              <div className="modal-action">
                <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white">Create</button>
                <button className="btn btn-secondary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white" onClick={() => setCreateDialogOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      </main>
    </>
  );
};

export default Home;
