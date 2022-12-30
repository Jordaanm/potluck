import Link from "next/link";
import DishView from "./dish-view";
import type { FullPotluck } from "./types";

interface DishesProps {
  potluck: FullPotluck | null | undefined;
  isHost: boolean;
  userId: string | undefined;
}

export const Dishes = (props: DishesProps) => {
  const { potluck, isHost, userId } = props;
  
  if(!potluck) return null;

  const { dishes, attendees } = potluck;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-extrabold text-black text-opacity-75 mb-4 font-fancy">
        Dishes
      </h2>
      {dishes?.length === 0 && <EmptyView />}
      {dishes != null && dishes.length > 0 && <div className="flex flex-col">
        {dishes.map((dish) => (
          <DishView isHost={isHost} dish={dish} key={dish.id} allAttendees={attendees}/>
        ))}
      </div>}
      {isHost && <div className="flex">
        <Link href={`/potluck/${potluck.id}/add-dish`} className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white mb-4 px-8">
          Add a Dish
        </Link>
      </div>}
    </div>
  );
};


const EmptyView = () => (
  <div className="flex flex-col">
    <p className="text-xl font-extrabold text-black text-opacity-75 mb-4 font-fancy">
      No dishes yet
    </p>
  </div>
);

export default Dishes;