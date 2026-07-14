"use client";

import { useRef, useState, type FormEvent } from "react";

import AddDishDialog from "@/components/add-dish-dialog";
import DishItem, { type Dish, type DishDraft } from "@/components/dish-item";
import TemplateSelector from "@/components/template-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { deleteDishPhoto } from "@/lib/upload";

export default function AddFood() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [step, setStep] = useState("details");
  const [restaurant, setRestaurant] = useState({
    name: "",
    contactNumber: "",
    address: "",
    tagline: "",
  });
  const nextDishId = useRef(1);

  function updateRestaurant(field: string, value: string) {
    setRestaurant((current) => ({ ...current, [field]: value }));
  }

  function showTemplates(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep("templates");
  }

  function addDish(dish: DishDraft) {
    const id = nextDishId.current++;

    setDishes((currentDishes) => [...currentDishes, { ...dish, id }]);
  }

  function removeDish(id: number) {
    const removed = dishes.find((dish) => dish.id === id);

    if (removed?.photo) {
      deleteDishPhoto(removed.photo).catch((err) =>
        console.warn("Failed to delete dish photo:", err),
      );
    }
    setDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== id),
    );
  }

  function createAnotherMenu() {
    setRestaurant({
      name: "",
      contactNumber: "",
      address: "",
      tagline: "",
    });
    setDishes([]);
    nextDishId.current = 1;
    setStep("details");
  }

  if (step === "templates") {
    return (
      <TemplateSelector
        dishes={dishes}
        onBackAction={() => setStep("details")}
        onCreateAnotherAction={createAnotherMenu}
        restaurant={restaurant}
      />
    );
  }

  return (
    <Card className="w-full max-w-4xl gap-0 rounded-3xl bg-card py-0 shadow-sm ring-1 ring-foreground/10">
      <CardContent className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <form className="space-y-7" onSubmit={showTemplates}>
          <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm"
                htmlFor="restaurant-name"
              >
                Restaurant name
              </Label>
              <Input
                className="h-11 rounded-xl px-4 text-sm shadow-none sm:h-12 sm:text-base"
                id="restaurant-name"
                name="restaurantName"
                onChange={(event) =>
                  updateRestaurant("name", event.target.value)
                }
                placeholder="e.g. Dhaba Express"
                required
                value={restaurant.name}
              />
            </div>

            <div className="space-y-2">
              <Label
                className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm"
                htmlFor="contact-number"
              >
                Contact number
              </Label>
              <Input
                className="h-11 rounded-xl px-4 text-sm shadow-none sm:h-12 sm:text-base"
                id="contact-number"
                inputMode="tel"
                name="contactNumber"
                onChange={(event) =>
                  updateRestaurant("contactNumber", event.target.value)
                }
                placeholder="e.g. +91 98765 43210"
                required
                type="tel"
                value={restaurant.contactNumber}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm"
                htmlFor="address"
              >
                Address
              </Label>
              <Input
                className="h-11 rounded-xl px-4 text-sm shadow-none sm:h-12 sm:text-base"
                id="address"
                name="address"
                onChange={(event) =>
                  updateRestaurant("address", event.target.value)
                }
                placeholder="e.g. 12 MG Road, Pune"
                required
                value={restaurant.address}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm"
                htmlFor="tagline"
              >
                Tagline
              </Label>
              <Input
                className="h-11 rounded-xl px-4 text-sm shadow-none sm:h-12 sm:text-base"
                id="tagline"
                name="tagline"
                onChange={(event) =>
                  updateRestaurant("tagline", event.target.value)
                }
                placeholder="e.g. Home-style food, made fresh daily"
                value={restaurant.tagline}
              />
            </div>
          </div>

          <Separator />

          <fieldset className="space-y-3">
            <legend className="mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm">
              Dishes
            </legend>

            {dishes.map((dish) => (
              <DishItem
                dish={dish}
                key={dish.id}
                onRemoveAction={() => removeDish(dish.id)}
              />
            ))}

            <AddDishDialog onAddAction={addDish} />
          </fieldset>

          <Button
            className="h-12 w-full rounded-xl text-sm font-semibold sm:text-base"
            disabled={dishes.length === 0}
            type="submit"
          >
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
