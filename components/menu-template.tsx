import { MapPin, Phone } from "lucide-react";

export type MenuTemplateId = "template-1" | "template-2" | "template-3";

type MenuDish = {
  id: string | number;
  name: string;
  price: string;
  photo: string | null;
};

export type MenuTemplateData = {
  name: string;
  address: string;
  contactNumber: string;
  tagline: string | null;
  dishes: MenuDish[];
};

type MenuTemplateProps = {
  data: MenuTemplateData;
  template: string;
};

function formatPrice(price: string) {
  const value = Number(price);

  if (!Number.isFinite(value)) return price;
  return value % 1 === 0 ? String(value) : value.toFixed(2);
}

function ContactDetails({ data }: { data: MenuTemplateData }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      <span className="flex items-center gap-1.5">
        <MapPin aria-hidden="true" className="size-4" />
        {data.address}
      </span>
      <span className="flex items-center gap-1.5">
        <Phone aria-hidden="true" className="size-4" />
        {data.contactNumber}
      </span>
    </div>
  );
}

function TemplateOne({ data }: { data: MenuTemplateData }) {
  return (
    <div className="bg-[#f7f7f5] px-5 py-8 text-zinc-950 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-zinc-300 pb-6 text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase">
            Our menu
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {data.name}
          </h1>
          {data.tagline && (
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 sm:text-base">
              {data.tagline}
            </p>
          )}
          <div className="mt-4 flex justify-center text-zinc-500">
            <ContactDetails data={data} />
          </div>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.dishes.map((dish) => (
            <article
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
              key={dish.id}
            >
              <div
                className="aspect-[4/3] bg-zinc-100 bg-cover bg-center"
                style={
                  dish.photo
                    ? { backgroundImage: `url(${dish.photo})` }
                    : undefined
                }
              />
              <div className="flex items-start justify-between gap-3 p-4">
                <h2 className="font-semibold">{dish.name}</h2>
                <p className="shrink-0 text-sm font-bold">
                  ₹{formatPrice(dish.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateTwo({ data }: { data: MenuTemplateData }) {
  return (
    <div className="bg-[#f4efe5] px-5 py-8 text-stone-900 sm:px-10 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="grid gap-5 border-b border-stone-400 pb-7 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-stone-500 uppercase">
              Menu
            </p>
            <h1 className="mt-2 font-serif text-4xl leading-none sm:text-5xl">
              {data.name}
            </h1>
            {data.tagline && (
              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
                {data.tagline}
              </p>
            )}
          </div>
          <div className="text-stone-600 sm:max-w-52">
            <ContactDetails data={data} />
          </div>
        </header>

        <div className="divide-y divide-stone-300">
          {data.dishes.map((dish, index) => (
            <article
              className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-5 sm:grid-cols-[2.5rem_5rem_1fr_auto]"
              key={dish.id}
            >
              <span className="font-mono text-xs text-stone-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className="hidden aspect-square rounded-full bg-stone-200 bg-cover bg-center sm:block"
                style={
                  dish.photo
                    ? { backgroundImage: `url(${dish.photo})` }
                    : undefined
                }
              />
              <h2 className="font-serif text-xl">{dish.name}</h2>
              <p className="font-semibold">₹{formatPrice(dish.price)}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateThree({ data }: { data: MenuTemplateData }) {
  return (
    <div className="bg-zinc-950 px-5 py-8 text-zinc-100 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="inline-flex rounded-full bg-lime-300 px-3 py-1 text-xs font-bold tracking-wider text-zinc-950 uppercase">
            Fresh picks
          </p>
          <h1 className="mt-5 max-w-3xl break-words text-4xl leading-[1.05] font-semibold tracking-[-0.025em] text-balance sm:text-5xl">
            {data.name}
          </h1>
          {data.tagline && (
            <p className="mt-3 max-w-xl text-base text-zinc-400">
              {data.tagline}
            </p>
          )}
          <div className="mt-5 text-zinc-400">
            <ContactDetails data={data} />
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {data.dishes.map((dish) => (
            <article
              className="grid grid-cols-[5rem_1fr] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
              key={dish.id}
            >
              <div
                className="min-h-24 bg-zinc-800 bg-cover bg-center"
                style={
                  dish.photo
                    ? { backgroundImage: `url(${dish.photo})` }
                    : undefined
                }
              />
              <div className="flex min-w-0 flex-col justify-between gap-3 p-4">
                <h2 className="truncate text-base font-semibold tracking-[-0.01em]">
                  {dish.name}
                </h2>
                <p className="text-lg font-bold tracking-tight text-lime-300">
                  ₹{formatPrice(dish.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MenuTemplate({ data, template }: MenuTemplateProps) {
  if (template === "template-2") return <TemplateTwo data={data} />;
  if (template === "template-3") return <TemplateThree data={data} />;

  return <TemplateOne data={data} />;
}
