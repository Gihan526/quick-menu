import AddFood from "@/components/add-food";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-zinc-50 px-6 py-16 font-sans">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-xl text-black ">
        Get your restaurant online in one pass
      </h1>
      <AddFood />
    </main>
  );
}
