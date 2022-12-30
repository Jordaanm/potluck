import type { User } from '@prisma/client';
import { trpc } from '../../utils/trpc';
import { EditableDishType, EditableUser, EditableNumber, EditableText } from '../editable-fields';
import type { FullDish } from './types';

type DishWithAttendee = FullDish

interface DishViewProps {
  dish: DishWithAttendee;
  isHost: boolean;
  allAttendees: User[];
}

export const DishView = (props: DishViewProps) => {
  const { dish, isHost } = props;
  const { type, quantity, suggestion, id, attendee } = dish;

  const {mutateAsync: updateDishCall} = trpc.potluck.updateDish.useMutation();

  const updateDish = (dish: DishWithAttendee) => {
    updateDishCall({
      dish: {
        type: dish.type,
        quantity: dish.quantity,
        suggestion: dish.suggestion || '',
        attendeeId: dish.attendeeId || undefined,
        id,
      }
    });
  };

  const setField = (field: keyof DishWithAttendee) => (value: string|number) => {
    updateDish({...dish, [field]: value});    
  };

  return (
    <div className="flex flex-col bg-opacity-50 bg-white rounded-2xl mb-4 p-2">
      <div className="flex flex-row font-semibold text-md text-black text-opacity-50 items-center">
        <p className="leading-8 font-fancy">
          We want <EditableNumber value={quantity} onChange={setField('quantity')} />x <EditableDishType value={type} onChange={setField('type')} />,
          preferrably <EditableText value={suggestion||''} onChange={setField('suggestion')} />,
          brought by <EditableUser value={attendee} onChange={setField('attendeeId')} attendees={props.allAttendees} />
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