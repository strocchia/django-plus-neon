"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setMenuItems(data);
    };

    fetchData().catch(console.error);
  }, []);

  return <div>{JSON.stringify(menuItems, null, 2)}</div>;
}
