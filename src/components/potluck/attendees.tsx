import Link from "next/link";
import type { FullPotluck } from "./types";
import type { User } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { useCallback, useMemo } from "react";

interface AttendeesProps {
  potluck: FullPotluck | null | undefined;
  isHost: boolean;
  userId: string | undefined;
}

export const Attendees = (props: AttendeesProps) => {
  const { potluck, isHost, userId } = props;
  const utils = trpc.useContext();
  const { mutateAsync: setUserAttending } = trpc.potluck.setUserAttending.useMutation({
    onSuccess: () => {
      if(!potluck?.id) return;
      utils.potluck.get.invalidate({ id: potluck.id});
    }
  });

  const attendees = useMemo(() => potluck?.attendees || [], [potluck?.attendees]);

  const willAttend = useCallback(() => {
    if(!userId || !potluck?.id) return;
    if (attendees.some((attendee) => attendee.id === userId)) { return;}

    setUserAttending({ potluckId: potluck.id, userId: userId, attending: true });
  }, [attendees, userId, potluck, setUserAttending]); 

  const wontAttend = useCallback(() => {
    if(!userId || !potluck?.id) return;
    if (!attendees.some((attendee) => attendee.id === userId)) { return;}

    setUserAttending({ potluckId: potluck.id, userId: userId, attending: false });
  }, [attendees, userId, potluck, setUserAttending]); 

  if(!potluck) return null;
  const isAttending = attendees.some((attendee) => attendee.id === userId);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-extrabold text-black text-opacity-75 mb-4 font-fancy">
        Attendees
      </h2>
      {attendees?.length === 0 && <EmptyView />}
      {attendees != null && attendees.length > 0 && <div className="flex flex-col">
        {attendees.map((attendee) => (
          <AttendeeView attendee={attendee} key={attendee.id} />
        ))}
      </div>}
      {isHost && <AttendeeShare />}
      <div className="flex">
        {isAttending && 
          <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white mb-4 px-8" onClick={wontAttend}>
            I am not attending
          </button>
        }
        {!isAttending && 
          <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white mb-4 px-8" onClick={willAttend}>
            I am attending
          </button>
        }        
      </div>
    </div>
  );
};

const EmptyView = () => (
  <div className="flex flex-col">
    <p className="text-xl font-extrabold text-black text-opacity-75 mb-4 font-fancy">
      No attendees yet
    </p>
  </div>
);

interface AttendeeViewProps {
  attendee: User;
}

const AttendeeView = (props: AttendeeViewProps) => {
  const { attendee } = props;
  const { name } = attendee;

  return (
    <div className="flex flex-col mt-4">
      <p className="text-xl font-normal text-black text-opacity-75 mb-4 font-fancy">
        {name}
      </p>
    </div>
  );
};

const AttendeeShare = () => (
  <div className="flex flex-col mt-4">
    <p className="text-sm font-medium text-black text-opacity-75 mb-4">
      <span className="text-black text-opacity-75 font-fancy">
        Share this link with your attendees:&nbsp;
      </span>
      <Link className="link" href={window?.location.toString()}>{window?.location.toString()}</Link>
    </p>
  </div>
);


export default Attendees;
