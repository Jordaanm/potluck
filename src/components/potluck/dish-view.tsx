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

  const trpcUtils = trpc.useContext();
  const {mutateAsync: updateDishCall} = trpc.potluck.updateDish.useMutation();
  const { mutateAsync: removeDish } = trpc.potluck.removeDish.useMutation({
    onSuccess: () => {
      trpcUtils.potluck.get.invalidate();
    }
  });

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

  const deleteDish = () => {
    removeDish({id});
  }

  const setField = (field: keyof DishWithAttendee) => (value: string|number) => {
    updateDish({...dish, [field]: value});    
  };

  const isAssigned = attendee !== null && attendee !== undefined;

  return (
    <div className="flex flex-col bg-opacity-50 bg-white rounded-md mb-2 p-2 lg:flex-row">
      <div className="flex flex-1 flex-row font-semibold text-md text-black text-opacity-50 items-center mb-2 lg:mb-0">
        <p className="leading-8 font-fancy">
          For a <EditableDishType value={type} onChange={setField('type')} />,&nbsp;
          <EditableUser value={attendee} onChange={setField('attendeeId')} attendees={props.allAttendees} /> 
          {isAssigned ? ' is bringing ' : ' should bring '}
          <EditableNumber value={quantity} onChange={setField('quantity')} />x <EditableText value={suggestion||''} onChange={setField('suggestion')} />
          {isAssigned ? ' (or similar), ' : ', '}
        </p>        
      </div>
      <div className="flex flex-row items-center justify-end">
        {isHost && <button className="btn btn-secondary rounded-md text-sm bg-[#cfa168] focus:bg-[#cfa168] text-white px-4 py-0 ml-4 p-0 h-8 min-h-8" onClick={deleteDish}>
          Remove
        </button>}
      </div>
    </div>
  );
};


export default DishView;
"{Attendee} is bringing {Quantity}x {Food} as a {Meal Type}"