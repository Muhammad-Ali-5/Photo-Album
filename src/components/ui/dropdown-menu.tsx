"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => setOpen(!open),
          });
        }
        if (child.type === DropdownMenuContent) {
          return open
            ? React.cloneElement(child as React.ReactElement<any>, {
                onClose: () => setOpen(false),
              })
            : null;
        }
        return child;
      })}
    </div>
  );
}

function DropdownMenuTrigger({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  return (
    <button
      className={cn("outline-none cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  className,
  children,
  onClose,
  ...props
}: React.ComponentProps<"div"> & { onClose?: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className={cn(
          "absolute right-0 top-full mt-2 z-50 min-w-44 rounded-2xl glass-panel bg-[#0f0c1d] border-purple-500/30 p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-white space-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

function DropdownMenuGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

function DropdownMenuItem({
  className,
  children,
  asChild,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
};
