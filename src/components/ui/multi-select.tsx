
import React, { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  children: React.ReactNode;
}

export function MultiSelect({ value, onValueChange, placeholder, children }: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children}
    </Popover>
  );
}

export interface MultiSelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MultiSelectTrigger({ children, className, ...props }: MultiSelectTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <button
        role="combobox"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </PopoverTrigger>
  );
}

export interface MultiSelectValueProps {
  placeholder: string;
}

export function MultiSelectValue({ placeholder }: MultiSelectValueProps) {
  const multiSelect = React.useContext(MultiSelectContext);
  if (!multiSelect) throw new Error("MultiSelectValue must be used within MultiSelect");

  const { value } = multiSelect;
  const selected = MultiSelectContextProvider.getSelectedItems(value);

  return (
    <div className="flex gap-1 flex-wrap">
      {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
      {selected.map((selectedItem) => (
        <Badge variant="secondary" key={selectedItem.value} className="mr-1">
          {selectedItem.label}
          <button
            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                multiSelect.onValueChange(value.filter((item) => item !== selectedItem.value));
              }
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={() => multiSelect.onValueChange(value.filter((item) => item !== selectedItem.value))}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}

export interface MultiSelectContentProps {
  children: React.ReactNode;
}

export function MultiSelectContent({ children }: MultiSelectContentProps) {
  return (
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandEmpty>No items found.</CommandEmpty>
        <CommandGroup className="max-h-64 overflow-auto">
          {children}
        </CommandGroup>
      </Command>
    </PopoverContent>
  );
}

export interface MultiSelectItemProps {
  value: string;
  children: React.ReactNode;
}

export function MultiSelectItem({ value, children }: MultiSelectItemProps) {
  const multiSelect = React.useContext(MultiSelectContext);
  if (!multiSelect) throw new Error("MultiSelectItem must be used within MultiSelect");

  const isSelected = multiSelect.value.includes(value);

  return (
    <CommandItem
      onSelect={() => {
        if (isSelected) {
          multiSelect.onValueChange(multiSelect.value.filter((item) => item !== value));
        } else {
          multiSelect.onValueChange([...multiSelect.value, value]);
        }
      }}
    >
      <div
        className={cn(
          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "opacity-50 [&_svg]:invisible"
        )}
      >
        <span className={cn("h-2 w-2 bg-current", isSelected ? "block" : "hidden")} />
      </div>
      <span>{children}</span>
    </CommandItem>
  );
}

const MultiSelectContext = React.createContext<{
  value: string[];
  onValueChange: (value: string[]) => void;
  items: { value: string; label: string }[];
} | null>(null);

class MultiSelectContextProvider {
  static items: { value: string; label: string }[] = [];

  static getSelectedItems(value: string[]): { value: string; label: string }[] {
    return value.map(v => this.items.find(item => item.value === v) || { value: v, label: v });
  }

  static registerItem(value: string, label: string): void {
    const existingItem = this.items.find(item => item.value === value);
    if (!existingItem) {
      this.items.push({ value, label });
    }
  }
}

// Set up MultiSelect context provider
MultiSelect.displayName = "MultiSelect";
MultiSelectTrigger.displayName = "MultiSelectTrigger";
MultiSelectValue.displayName = "MultiSelectValue";
MultiSelectContent.displayName = "MultiSelectContent";
MultiSelectItem.displayName = "MultiSelectItem";
