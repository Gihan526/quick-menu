"use client";

import { useState } from "react";

import { Check, ChevronLeft } from "lucide-react";

import { createRestaurant } from "@/actions/create-restaurant";
import CopyMenuLink from "@/components/copy-menu-link";
import type { Dish } from "@/components/dish-item";
import MenuTemplate, {
  type MenuTemplateId,
} from "@/components/menu-template";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const templates = [
  { id: "template-1", name: "Template 1" },
  { id: "template-2", name: "Template 2" },
  { id: "template-3", name: "Template 3" },
] satisfies { id: MenuTemplateId; name: string }[];

type TemplateSelectorProps = {
  restaurant: {
    name: string;
    contactNumber: string;
    address: string;
    tagline: string;
  };
  dishes: Dish[];
  onBackAction: () => void;
  onCreateAnotherAction: () => void;
};

export default function TemplateSelector({
  restaurant,
  dishes,
  onBackAction,
  onCreateAnotherAction,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<
    MenuTemplateId | ""
  >("");
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  async function publishMenu(formData: FormData) {
    setIsPublishing(true);
    setPublishError("");

    try {
      const result = await createRestaurant(formData);
      setPublishedSlug(result.slug);
    } catch {
      setPublishError("Could not publish the menu. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  }

  if (publishedSlug) {
    return (
      <div className="w-full max-w-xl">
        <CopyMenuLink
          onCreateAnotherAction={onCreateAnotherAction}
          slug={publishedSlug}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-start gap-3">
        <Button
          aria-label="Back to restaurant details"
          className="mt-0.5 rounded-full"
          onClick={onBackAction}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Step 2 of 2
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Choose your menu style
          </h2>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Select a template to preview your menu.
          </p>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
        <section aria-labelledby="template-list-title" className="space-y-3">
          <h3
            className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
            id="template-list-title"
          >
            Templates
          </h3>

          {templates.map((template) => (
            <button
              aria-pressed={selectedTemplate === template.id}
              className="w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              type="button"
            >
              <div
                className={cn(
                  "flex items-center justify-between rounded-xl border bg-card px-4 py-4 shadow-sm transition-colors hover:border-foreground/50",
                  selectedTemplate === template.id &&
                    "border-foreground ring-2 ring-foreground/10",
                )}
              >
                <p className="font-semibold">{template.name}</p>
                {selectedTemplate === template.id && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                )}
              </div>
            </button>
          ))}
        </section>

        <section aria-labelledby="preview-title" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3
              className="text-xs font-semibold tracking-widest text-muted-foreground uppercase"
              id="preview-title"
            >
              Live preview
            </h3>
            <span className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
              Desktop
            </span>
          </div>

          {!selectedTemplate ? (
            <div className="flex min-h-96 items-center justify-center rounded-3xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
              Choose a template to see your menu preview.
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-zinc-200 shadow-sm">
              <MenuTemplate
                data={{ ...restaurant, dishes }}
                template={selectedTemplate}
              />
            </div>
          )}
        </section>
      </div>

      <form action={publishMenu} className="space-y-3">
        <input name="restaurantName" type="hidden" value={restaurant.name} />
        <input
          name="contactNumber"
          type="hidden"
          value={restaurant.contactNumber}
        />
        <input name="address" type="hidden" value={restaurant.address} />
        <input name="tagline" type="hidden" value={restaurant.tagline} />
        <input name="dishes" type="hidden" value={JSON.stringify(dishes)} />
        <input name="template" type="hidden" value={selectedTemplate} />

        {publishError && (
          <p className="text-sm text-destructive">{publishError}</p>
        )}

        <div className="flex justify-end">
          <Button
            className="h-12 w-full rounded-xl px-8 font-semibold sm:w-auto"
            disabled={!selectedTemplate || isPublishing}
            type="submit"
          >
            {isPublishing ? "Publishing..." : "Publish menu"}
          </Button>
        </div>
      </form>
    </div>
  );
}
