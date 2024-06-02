// src/app/update/page.js

/**
 * page mimics /add/page.js.
 * tailored for update functionality
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

/**
 *
 * @param {number} id
 * @returns
 */
async function getMenuById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}/`);

  if (!res.ok) throw new Error(`failed to get menu by ID ${id}`);

  return res.json();
}

/**
 *
 * @param {number} id
 * @param {Object} data
 * @returns
 */
const updateMenu = async (id, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}/`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("failed to update menu data");

  return res.json();
};

export default function Page({ params }) {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const { menuId } = params;

  /**
   *
   * @param {Event} evt form submission event (evt for short).
   */
  const doFinishUpdate = (evt) => {
    evt.preventDefault();
    setLoading(true);

    updateMenu(menuId, formData)
      .then(() => {
        router.push("/?action=update");
      })
      .catch(() => {
        setError("Error occurred. Try again");
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => setLoading(false);
  });

  // populate state on component mount/load
  useEffect(() => {
    const fetchData = async () => {
      if (params && menuId) {
        try {
          const data = await getMenuById(menuId);
          setFormData({ name: data.name, price: data.price });
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [params]);

  return (
    // <div>
    //   Page
    //   <br />
    //   {JSON.stringify(params, null, 2)}
    //   <br />
    //   {JSON.stringify(formData, null, 2)}
    // </div>

    <form className="w-1/2" onSubmit={doFinishUpdate}>
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
