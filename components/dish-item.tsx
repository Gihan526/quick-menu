"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export type Dish = {
  id: number
  name: string
  price: string
  photo: string | null
}

type DishItemProps = {
  dish: Dish
  onRemove: () => void
}

export default function DishItem({ dish, onRemove }: DishItemProps) {
  return (
    <div className="flex min-h-20 items-center gap-3 rounded-xl border bg-background px-3 py-2 sm:gap-4 sm:px-4">
      <div
        className="size-14 shrink-0 overflow-hidden rounded-lg bg-[repeating-linear-gradient(135deg,oklch(0.985_0_0),oklch(0.985_0_0)_7px,oklch(0.94_0_0)_7px,oklch(0.94_0_0)_14px)] bg-cover bg-center sm:size-16"
        style={dish.photo ? { backgroundImage: `url(${dish.photo})` } : undefined}
      />

      <span className="flex-1 truncate px-2 text-sm sm:text-base">
        {dish.name}
      </span>

      <div className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-muted-foreground sm:text-base">
        <span aria-hidden="true">₹</span>
        <span>{dish.price || "0"}</span>
      </div>

      <Button
        aria-label={`Remove ${dish.name || "dish"}`}
        className="size-8 shrink-0 rounded-lg text-muted-foreground hover:text-foreground"
        onClick={onRemove}
        size="icon"
        type="button"
        variant="ghost"
      >
        <X aria-hidden="true" />
      </Button>
    </div>
  )
}
