import type { FullDish } from './types';

type DishWithGuest = FullDish

interface DishViewProps {
  dish: DishWithGuest;
  isHost: boolean;
}

export const DishView = (props: DishViewProps) => {
  const { dish, isHost } = props;
  const { type, quantity, suggestion, guest } = dish;

  return (
    <div className="flex flex-col bg-opacity-50 bg-white rounded-2xl mb-4 p-2">
      <div className="flex flex-row font-semibold text-md text-black text-opacity-50 items-center">
        <p className="leading-8" style={{fontFamily: 'Playfair Display'}}>
          We want {quantity}x {type}&nbsp;
        </p>
        <p className="leading-8" style={{fontFamily: 'Playfair Display'}}>
          (preferrably {suggestion}),&nbsp;
        </p>
        <p className="leading-8" style={{fontFamily: 'Playfair Display'}}>
          brought by {guest?.user?.name || 'anyone'}
        </p>
        <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white px-4 ml-4 p-0">
          Edit Details
        </button>
        <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white px-4 ml-4 p-0">
          Assign to Me
        </button>
        {isHost && <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white px-4 ml-4 p-0">
          Delete
        </button>}
      </div>
    </div>
  );
};

export default DishView;