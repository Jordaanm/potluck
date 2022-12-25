import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { resolveString } from "../../../utils/query";
import type { IDish} from "../../../utils/validation/potluck-schemas";
import { potluckDishSchema } from "../../../utils/validation/potluck-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../../utils/trpc";
import { useCallback } from "react";

export const AddDishPage: NextPage = () => {
  
  const router = useRouter();
  const { eventid } = router.query;
  const potluckId = resolveString(eventid);

  const { register, handleSubmit, formState } = useForm<IDish>({
    resolver: zodResolver(potluckDishSchema),
    defaultValues: {
      quantity: 1,
      type: 'main',
    }
  });

  const { mutateAsync } = trpc.potluck.addDish.useMutation();

  const onSubmit = useCallback(
    async (dish: IDish) => {
      const result = await mutateAsync({potluckId, dish});
      if(result.status === 201) {
        router.push("/potluck/[eventid]", `/potluck/${potluckId}`);
      }
    },
    [mutateAsync, potluckId, router]
  );

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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#dfd9d2] to-[#e0dad2] flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] text-opacity-75" style={{fontFamily: 'Playfair Display'}}>
            Add a Dish
          </h1>        
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              {formState.errors.type && <p className="text-red-500">{formState.errors.type.message}</p>}
              <label className="text-black text-opacity-75" htmlFor="type">Type</label>
              <select className="border border-black border-opacity-25 rounded-md p-2" {...register("type")}>
                <option value="appetizer">Appetizer</option>
                <option value="entree">Entree</option>
                <option value="main">Main</option>
                <option value="side">Side</option>
                <option value="salad">Salad</option>
                <option value="dessert">Dessert</option>
                <option value="drink">Drink</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              {formState.errors.suggestion && <p className="text-red-500">{formState.errors.suggestion.message}</p>}
              <label className="text-black text-opacity-75" htmlFor="suggestion">Suggested Meal</label>
              <input className="border border-black border-opacity-25 rounded-md p-2" type="text" placeholder="Suggested Meal" {...register("suggestion")} />
            </div>
            <div className="flex flex-col gap-2">
              {formState.errors.quantity && <p className="text-red-500">{formState.errors.quantity.message}</p>}
              <label className="text-black text-opacity-75" htmlFor="quantity">Quantity</label>
              <input className="border border-black border-opacity-25 rounded-md p-2" type="number" placeholder="Quantity" {...register("quantity", {valueAsNumber: true})} />
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn btn-primary rounded-3xl bg-[#cfa168] focus:bg-[#cfa168] text-white" type="submit">Add Dish</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddDishPage;