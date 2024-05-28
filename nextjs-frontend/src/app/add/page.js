// src/app/add/page.js

"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const doFinish = (evt) => {
    evt.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    return () => setLoading(false);
  });

  return (
    <form onSubmit={doFinish}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(evt) =>
            setFormData({ ...formData, name: evt.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={(evt) =>
            setFormData({ ...formData, price: evt.target.value })
          }
          required
        />
      </div>
      {error && <p>{error}</p>}
      <div>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  );
}
