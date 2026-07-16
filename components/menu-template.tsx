import { MapPin, Phone } from "lucide-react";

export type MenuTemplateId =
  | "template-1"
  | "template-2"
  | "template-3"
  | "template-4";

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

function TemplateFour({ data }: { data: MenuTemplateData }) {
  const heroImage = data.dishes[0]?.photo ?? null;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    data.address,
  )}`;

  return (
    <div className="min-h-screen bg-[#140f0b] text-[#f5f5f4]">
      <header className="border-b border-[#f5f5f4]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <span className="font-serif text-lg font-semibold tracking-wide text-[#f59e0b] sm:text-xl">
            {data.name}
          </span>
          <nav className="flex items-center gap-4 sm:gap-8">
            <a
              className="text-sm text-[#a8a29e] transition-colors hover:text-[#f5f5f4]"
              href="#menu"
            >
              Menu
            </a>
            <a
              className="text-sm text-[#a8a29e] transition-colors hover:text-[#f5f5f4]"
              href="#find-us"
            >
              Find Us
            </a>
            <a
              className="rounded-lg bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-[#140f0b] transition-opacity hover:opacity-90"
              href={`tel:${data.contactNumber}`}
            >
              Call Now
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl brightness-[0.35]"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#140f0b]/40 via-[#140f0b]/70 to-[#140f0b]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f15] to-[#140f0b]" />
        )}

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#f59e0b] uppercase">
            Menu
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-[#f5f5f4] sm:text-6xl lg:text-7xl">
            {data.name}
          </h1>
          {data.tagline && (
            <p className="mt-4 max-w-xl text-base text-[#a8a29e] sm:text-lg">
              {data.tagline}
            </p>
          )}
          <a
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#f59e0b] px-6 py-3 text-base font-semibold text-[#140f0b] transition-opacity hover:opacity-90"
            href={`tel:${data.contactNumber}`}
          >
            {data.contactNumber}
          </a>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20" id="menu">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl font-medium tracking-tight text-[#f5f5f4] sm:text-5xl">
            Our Menu
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.dishes.map((dish) => (
              <article
                className="overflow-hidden rounded-2xl bg-[#1e1813] shadow-lg"
                key={dish.id}
              >
                <div
                  className="aspect-[4/3] bg-[#2a2119] bg-cover bg-center"
                  style={
                    dish.photo
                      ? { backgroundImage: `url(${dish.photo})` }
                      : undefined
                  }
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium leading-snug text-[#f5f5f4]">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#f59e0b]">
                    ₹{formatPrice(dish.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#f5f5f4]/10 px-5 py-14 sm:px-8 sm:py-20" id="find-us">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#f5f5f4] sm:text-5xl">
              Find Us
            </h2>
            <p className="mt-5 whitespace-pre-line text-base leading-7 text-[#a8a29e]">
              {data.address}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-[#a8a29e]">
              Book a table or order takeaway
            </p>
            <a
              className="mt-2 inline-block font-serif text-3xl font-medium text-[#f59e0b] transition-opacity hover:opacity-90 sm:text-4xl"
              href={`tel:${data.contactNumber}`}
            >
              {data.contactNumber}
            </a>
            <div className="mt-5">
              <a
                className="inline-flex items-center rounded-xl bg-[#2a2119] px-5 py-3 text-sm font-semibold text-[#f5f5f4] transition-colors hover:bg-[#3a2e22]"
                href={googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#f5f5f4]/10 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-[#a8a29e]">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
          <nav className="flex items-center gap-5">
            <a
              className="text-sm text-[#a8a29e] transition-colors hover:text-[#f5f5f4]"
              href="#menu"
            >
              Menu
            </a>
            <a
              className="text-sm text-[#a8a29e] transition-colors hover:text-[#f5f5f4]"
              href="#find-us"
            >
              Find Us
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default function MenuTemplate({ data, template }: MenuTemplateProps) {
  if (template === "template-2") return <TemplateTwo data={data} />;
  if (template === "template-3") return <TemplateThree data={data} />;
  if (template === "template-4") return <TemplateFour data={data} />;

  return <TemplateOne data={data} />;
}
