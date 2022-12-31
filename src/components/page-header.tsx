import Link from "next/link";

export const PageHeader = () => {
  //Simple page header with a link to the home page
  return (
    <div className="flex flex-col items-center justify-center bg-[#dfd9d2] flex-1 pb-4 pt-4">
      <Link href="/">
        <span className="text-4xl font-extrabold text-black text-opacity-75 font-fancy cursor-pointer border-b-2 border-[#cfa168]">
          Potluck.io
        </span>
      </Link>
    </div>
  );
};

export default PageHeader;