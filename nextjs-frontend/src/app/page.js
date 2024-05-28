"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MenuItem from "@/components/MenuItem";

/**
 * fetch menu data
 */
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/`);

  if (!res.ok) throw new Error("failed to fetch menu data");

  return res.json();
}

async function doDelete(id) {
  console.log("deleting..." + id);
}

export default function Home() {
  const [menuItems, setMenuItems] = useState(null);

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

  return (
    <div>
      {menuItems?.map((item) => (
        <MenuItem
          id={item.id}
          name={item.name}
          price={item.price}
          doEdit={() => {}}
          doDelete={(id) => doDelete(id)}
        />
      ))}
    </div>
  );
}
