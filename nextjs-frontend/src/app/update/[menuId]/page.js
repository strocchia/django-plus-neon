// src/app/update/page.js

/**
 * page mimics /add/page.js.
 * tailored for update functionality
 */

"use client";

import CommonForm from "@/components/CommonForm";
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
        setError("Error occurred. Try again.");
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

    <CommonForm
      doFinish={doFinishUpdate}
      goBack={() => router.push("/")}
      formData={formData}
      setFormData={setFormData}
      error={error}
      isLoading={loading}
    />
  );
}
