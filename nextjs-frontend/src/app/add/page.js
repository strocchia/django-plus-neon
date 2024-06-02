// src/app/add/page.js

"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 *
 * @param {Object} data
 * @returns
 */
async function createMenu(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create menu data");

  return res.json();
}

export default function Page() {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  /**
   *
   * @param {Event} evt form submission event (evt for short).
   */
  const doFinishAdd = (evt) => {
    evt.preventDefault();
    setLoading(true);

    createMenu(formData)
      .then(() => {
        router.push("/?action=add");
      })
      .catch(() => {
        setError("Error occurred. Try again");
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => setLoading(false);
  });

  return (
    <form className="w-1/2" onSubmit={doFinishAdd}>
      <div className="flex flex-col p-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="px-2 py-1 border-black rounded-sm max-h-10"
          value={formData.name}
          onChange={(evt) =>
            setFormData({ ...formData, name: evt.target.value })
          }
          required
        />
      </div>
      <div className="flex flex-col p-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          min={0}
          max={1000}
          className="px-2 py-1 border-black rounded-sm max-h-10"
          value={formData.price}
          onChange={(evt) =>
            setFormData({ ...formData, price: evt.target.value })
          }
          required
        />
      </div>
      {/* {error && <p className="text-[#f44336]">{error}</p>} */}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button
          type="submit"
          className="p-3 mx-3 rounded-sm cursor-pointer hover:border-[0.5px] hover:border-white"
          disabled={loading}
        >
          Submit
        </button>
        <button
          type="button"
          className="p-3 mx-10 rounded-sm cursor-pointer hover:border-[0.5px] hover:border-white"
          onClick={() => router.push("/")}
        >
          {"<--"} Back
        </button>
      </div>
    </form>
  );
}
