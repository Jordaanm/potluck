import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BasicDetails from "../../components/potluck/basic-details";
import Dishes from "../../components/potluck/dishes";
import { trpc } from "../../utils/trpc";
import { resolveString } from "../../utils/query";
import { Attendees } from "../../components/potluck/attendees";
import PageHeader from "../../components/page-header";

export const PotluckPage: NextPage = () => {
  const { data: sessionData } = useSession();
  const { user } = sessionData || {}; 
 
  const router = useRouter();
  const { eventid } = router.query;
  const resolvedEventId = resolveString(eventid);

  const { data, isFetching, error } = trpc.potluck.get.useQuery({ id: resolvedEventId });
  const { mutateAsync: destroyParty } = trpc.potluck.destroy.useMutation();
  
  if (error) {
    return <div>
      <>
        Boo! - {error}
      </>
    </div>
  }

  const potluck = data?.result.potluck;
  const isHost = user?.id === potluck?.hostId;

  const endParty = async () => {
    if(!potluck?.id) return;
    const id = potluck.id;
    destroyParty({ id });    
    router.push("/");
  }
  
  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Head>
        <title>{`Potluck.io | ${potluck?.name}`}</title>
        <meta name="description" content="Potluck.io, the easiest way to host a potluck" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');`}
        </style>
      </Head>
      <header className="flex">
        <PageHeader />
      </header>
      <main className="flex flex-1 bg-gradient-to-b from-[#dfd9d2] to-[#e0dad2] flex-col">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] text-opacity-75 mb-8 font-fancy">
            {isFetching ? `Potluck #${eventid}` : `${potluck?.name}`}
          </h1>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <div className="w-11/12 md:w-6/12 mb-8">
            <BasicDetails potluck={potluck} />
          </div>
          <div className="w-11/12 md:w-6/12 mb-8">
            <Attendees potluck={potluck} isHost={isHost} userId={user?.id}/>
          </div>
          <div className="w-11/12 md:w-6/12 mb-8">
            <Dishes potluck={potluck} isHost={isHost} userId={user?.id}/>
          </div>
          {isHost && <div className="w-11/12 md:w-6/12 mb-8">          
            <button onClick={endParty} className="btn btn-primary rounded-md bg-[#cfa168] focus:bg-[#cfa168] text-white mb-4 px-8">
              The Party is over.
            </button>
          </div>}
        </div>
      </main>
    </div>
  );
};

export default PotluckPage;
