"use client";
import React, { createContext, useEffect } from "react";
import Navbar from "./Navbar";
import Side_Nav from "./Side_Nav";
import { useState } from "react";

export const Themecontext = createContext({ dark_theme: true });

export default function Slider({ children }: any) {
  const [dialog, setdialog] = useState(false);
  const [mob, setmob] = useState(false);
  const [hov, sethov] = useState(false);
  const [dark_theme, setdark] = useState(true);

  useEffect(() => {
    const stored_theme = localStorage.getItem("theme");

    if (stored_theme === null) {
      localStorage.setItem("theme", "true");
    } else {
      if (stored_theme === "false") {
        setdark(false);
      }
    }
    const ismobile = window.innerWidth < 640 ? true : false;
    setmob(ismobile);
    function setwidth() {
      setmob(window.screen.width < 640 ? true : false);
    }
    window.addEventListener("resize", setwidth);
    return () => {
      window.removeEventListener("resize", setwidth);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") !== null) {
      localStorage.setItem("theme", dark_theme.toString());
    }
  }, [dark_theme]);

  return (
    <Themecontext.Provider value={{ dark_theme }}>
      <div
        className={`${
          dark_theme ? "dark bg-gray-950" : "text-black"
        } h-full overflow-hidden text-white flex dark flex-col`}
      >
        <div className="h-14 z-50">
          <Navbar
            dark_theme={dark_theme}
            setdark={setdark}
            dialog={dialog}
            setdialog={setdialog}
          />
        </div>

        <div className="t-14 flex w-full h-full">
          <div
            className={`${
              hov
                ? "z-40"
                : mob
                ? dialog
                  ? "z-40"
                  : "z-10 delay-100"
                : "z-10 delay-100"
            } h-full fixed`}
          >
            <Side_Nav
              dark_theme={dark_theme}
              setdark={setdark}
              dialog={dialog}
              setdialog={setdialog}
              mob={mob}
              hov={hov}
              setmob={setmob}
              sethov={sethov}
            />
          </div>

          <div className="ml-0 overflow-y-scroll sm:ml-14 w-full flex-grow h-full">
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </Themecontext.Provider>
  );
}
