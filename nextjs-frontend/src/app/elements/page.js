"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * fetch element data
 */
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/element/`);

  if (!res.ok) throw new Error("failed to fetch element data");

  return res.json();
}

export default function Home() {
  const [elements, setElements] = useState(null);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: "",
  });

  const router = useRouter();
  //   const params = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setElements(data);
    };

    fetchData().catch(console.error);
  }, []);

  //   useEffect(() => {
  //     if (params && params.get("action")) {
  //       setDisplaySuccessMessage({
  //         show: true,
  //         type: params.get("action"),
  //       });
  //     }
  //   }, [params, router]);

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
    setElements((items) => items.filter((it) => it.id !== id));
  }

  if (!elements) return <p>Loading...</p>;

  return (
    <div>
      <button
        className="bg-[#008000] text-[#fff] p-3 m-3 mb-10"
        onClick={() => router.push("/add")}
      >
        Add
      </button>
      {displaySuccessMessage.show && (
        <p className="ml-5 mt-2 mb-5 font-semibold text-[rgb(0,128,0)]">
          {displaySuccessMessage.type === TypesEnum.ADD
            ? "Added a "
            : "Modified a "}
          menu item.
        </p>
      )}
      {elements?.map((item, index) => (
        <div
          key={item.id || index}
          className="flex flex-row items-center gap-10"
        >
          <h2 className="text-lg text-neutral-100">#: {index}</h2>
          <h3>Id: {item.id}</h3>
          <p
            className="hover:cursor-pointer hover:bg-white hover:px-2"
            onClick={() => router.push(`/elements/${item.id}`)}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
