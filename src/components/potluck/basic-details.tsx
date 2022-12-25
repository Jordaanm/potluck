import type { FullPotluck } from "./types";

interface BasicDetailsProps {
  potluck: FullPotluck | null | undefined;
}

export const BasicDetails = (props: BasicDetailsProps) => {
  const { potluck } = props;
  
  if(!potluck) return null;

  const { description, date, location } = potluck;
  const dateFormatter = new Intl.DateTimeFormat();
  const formattedDate = dateFormatter.format(new Date(date));

  return (
    <div className="flex flex-col">
      <Row label="What?" value={description} />
      <Row label="When?" value={formattedDate} />
      <Row label="Where?" value={location} />
    </div>
  );
};


interface RowProps {
  label: string,
  value: string
}
const Row = (props: RowProps) => {
  const { label, value } = props;

  return (
    <div className="flex flex-col">
      <p className="text-md font-semibold text-black text-opacity-50 mb-2"  style={{fontFamily: 'Playfair Display'}}>
        {label}
      </p>
      <p className="text-xl font-extrabold text-black text-opacity-75 mb-4" style={{fontFamily: 'Playfair Display'}}>
        {value}
      </p>
    </div>
  );
}

export default BasicDetails;