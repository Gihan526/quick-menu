"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { ImagePlus, Plus } from "lucide-react"

import type { Dish } from "@/components/dish-item"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AddDishDialogProps = {
  onAdd: (dish: Omit<Dish, "id">) => void
}

const emptyDraft = { name: "", price: "", photo: null as string | null }

export default function AddDishDialog({ onAdd }: AddDishDialogProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(emptyDraft)

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()
    reader.onload = () =>
      setDraft((current) => ({ ...current, photo: reader.result as string }))
    reader.readAsDataURL(file)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onAdd(draft)
    setDraft(emptyDraft)
    setOpen(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) setDraft(emptyDraft)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            className="h-12 w-full rounded-xl border-dashed text-sm font-medium text-muted-foreground hover:text-foreground sm:text-base"
            type="button"
            variant="outline"
          />
        }
      >
        <Plus aria-hidden="true" />
        Add dish (name, photo, price)
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a dish</DialogTitle>
          <DialogDescription>
            Add a photo, name and price for this dish.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2">
            <Label
              className="flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-[repeating-linear-gradient(135deg,oklch(0.985_0_0),oklch(0.985_0_0)_7px,oklch(0.94_0_0)_7px,oklch(0.94_0_0)_14px)] bg-cover bg-center text-muted-foreground transition-opacity hover:opacity-80"
              htmlFor="dish-draft-photo"
              style={
                draft.photo ? { backgroundImage: `url(${draft.photo})` } : undefined
              }
            >
              {!draft.photo && <ImagePlus aria-hidden="true" className="size-6" />}
              <span className="sr-only">Choose a photo for this dish</span>
            </Label>
            <Input
              accept="image/*"
              className="sr-only"
              id="dish-draft-photo"
              onChange={handlePhoto}
              type="file"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              htmlFor="dish-draft-name"
            >
              Dish name
            </Label>
            <Input
              autoFocus
              className="h-11 rounded-xl px-4 text-sm shadow-none"
              id="dish-draft-name"
              onChange={(event) =>
                setDraft((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="e.g. Butter Chicken"
              required
              value={draft.name}
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              htmlFor="dish-draft-price"
            >
              Price (₹)
            </Label>
            <Input
              className="h-11 rounded-xl px-4 text-sm shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              id="dish-draft-price"
              inputMode="numeric"
              min="0"
              onChange={(event) =>
                setDraft((current) => ({ ...current, price: event.target.value }))
              }
              placeholder="e.g. 320"
              required
              type="number"
              value={draft.price}
            />
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose
              render={<Button type="button" variant="outline" />}
            >
              Cancel
            </DialogClose>
            <Button type="submit">Add dish</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
