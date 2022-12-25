import Link from "next/link";
import DishView from "./dish-view";
import type { FullPotluck } from "./types";

interface DishesProps {
  potluck: FullPotluck | null | undefined;
  isHost: boolean;
}

export const Dishes = (props: DishesProps) => {
  const { potluck, isHost } = props;
  
  if(!potluck) return null;

  const { dishes } = potluck;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-extrabold text-black text-opacity-75 mb-4" style={{fontFamily: 'Playfair Display'}}>
        Dishes
      </h2>
      {dishes?.length === 0 && <EmptyView />}
      {dishes != null && dishes.length > 0 && <div className="flex flex-col">
        {dishes.map((dish) => (
          <DishView isHost={isHost} dish={dish} key={dish.id} />
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
    <p className="text-xl font-extrabold text-black text-opacity-75 mb-4" style={{fontFamily: 'Playfair Display'}}>
      No dishes yet
    </p>
  </div>
);

export default Dishes;