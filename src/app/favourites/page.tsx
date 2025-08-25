"use client";
import CloudinaryImage from "../components/cloudinary-image";
import { get_favourites } from "../components/Get_data";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { Themecontext } from "../components/Slider";

export default function Favourites() {
  const [res, setres] = useState([]);
  const [loading, setloading] = useState(false);
  const theme = useContext(Themecontext);
  async function handleRefresh(
    public_id: string,
    albumName: string,
    img_delete: boolean = false
  ) {
    if (!img_delete) {
      const new_res: any = res.map((val: any) => {
        if (val.public_id === public_id) {
          let new_public_id = public_id.split("/");
          let orig_id = new_public_id.pop();
          return { ...val, public_id: `${albumName}/${orig_id}` };
        }
        return val;
      });
      setres(new_res);
    } else {
      const new_res: any = res.filter(
        (val: any) => val.public_id !== public_id
      );
      setres(new_res);
    }
  }

  async function rmv_img(public_id: string) {
    setres(res.filter((val: any) => val.public_id !== public_id));
  }

  useEffect(() => {
    async function setdata() {
      try {
        setloading(true);
        const response = await get_favourites();
        setres(response);
      } finally {
        setloading(false);
      }
    }
    setdata();
  }, []);

  const MAX_COLUMN = 4;
  function get_columns(colIndex: number) {
    return res.filter((val, idx) => idx % MAX_COLUMN === colIndex);
  }

  return (
    <>
      <div
        className={`${
          theme.dark_theme ? "text-white" : "text-black"
        } my-5 mx-6 relative h-full `}
      >
        <h1 className="text-4xl font-bold">Favourites</h1>

        <div className=" mt-10 h-full grid md:grid-cols-4 grid-cols-2 gap-3 ">
          {!loading &&
            res.length != 0 &&
            [
              get_columns(0),
              get_columns(1),
              get_columns(2),
              get_columns(3),
            ].map((val, idx) => {
              return (
                <div key={idx} className="flex flex-col gap-3">
                  {val.map((data: any) => {
                    return (
                      <CloudinaryImage
                        handleRefresh={handleRefresh}
                        key={data.public_id}
                        rmv_img={rmv_img}
                        props={data}
                        path="/favourites"
                      />
                    );
                  })}
                </div>
              );
            })}
          {!loading && res.length === 0 && (
            <div className="bg-transparent translate-x-[-50%] translate-y-[-50%] absolute top-[40%] left-[50%] w-full text-center sm:text-4xl text-3xl font-bold ">
              No favourites!
            </div>
          )}
        </div>

        {loading && (
          <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
            {loading && (
              <PulseLoader
                color={`${theme.dark_theme ? "#fff" : "#000"}`}
                margin={5}
                size={20}
                speedMultiplier={1.5}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
