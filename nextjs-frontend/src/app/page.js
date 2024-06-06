"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MenuItem from "@/components/MenuItem";
import { TypesEnum } from "@/utils/menuFuncs";

/**
 * fetch menu data
 */
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/`);

  if (!res.ok) throw new Error("failed to fetch menu data");

  return res.json();
}

export default function Home() {
  const [menuItems, setMenuItems] = useState(null);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: TypesEnum.BLANK,
  });

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log(data);
      setMenuItems(data);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (params && params.get("action")) {
      setDisplaySuccessMessage({
        show: true,
        type: params.get("action"),
      });
    }
  }, [params, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({
          show: false,
          type: Types.BLANK,
        });
        router.push("/");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [displaySuccessMessage]);

  async function doDelete(id) {
    console.log("deleting..." + id);
    setMenuItems((items) => items.filter((it) => it.id !== id));
  }

  if (!menuItems) return <p>Loading...</p>;

  return (
    <div>
      <button
        className="bg-[#008000] text-[#fff] p-3 m-3"
        onClick={() => router.push("/add")}
      >
        Add
      </button>
      {displaySuccessMessage.show && (
        // {/* // <p className="text-[#008000]"> */}
        <p className="ml-5 mt-2 mb-5 font-semibold text-[rgb(0,128,0)]">
          {displaySuccessMessage.type === TypesEnum.ADD
            ? "Added a "
            : "Modified a "}
          menu item.
        </p>
      )}
      {menuItems?.map((item, index) => (
        <MenuItem
          key={item.id || index}
          id={item.id}
          name={item.name}
          price={item.price}
          doEdit={() => {
            router.push(`/update/${item.id}`);
          }}
          doDelete={(id) => doDelete(id)}
        />
      ))}
    </div>
  );
}
