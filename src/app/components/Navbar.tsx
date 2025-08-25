"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Navbar({
  dialog,
  setdialog,
  dark_theme,
  setdark,
}: any) {
  return (
    <div
      className={`${
        dark_theme ? "" : "bg-gray-100 text-black"
      } h-14 w-[100vw] border border-b-gray-200 flex justify-between px-7 items-center`}
    >
      {dark_theme && (
        <div className="fixed right-24">
          <Button
            onClick={() => {
              setdark(false);
            }}
            variant="ghost"
            className="rounded-full p-0 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </Button>
        </div>
      )}
      {!dark_theme && (
        <div className="fixed right-24">
          <Button
            onClick={() => {
              setdark(true);
            }}
            variant="ghost"
            className="rounded-full p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </Button>
        </div>
      )}

      <div className="hidden sm:inline text-lg font-bold">My-Photo-Album</div>

      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-bold text-base sm:hidden">My Photo Album</p>
      </div>

      <div className="sm:hidden">
        <Button
          onClick={() => {
            setdialog(!dialog);
          }}
          variant="ghost"
          className={`${dark_theme ? "bg-gray-900" : "bg-gray-100"} `}
        >
          {!dialog && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
          {dialog && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}
