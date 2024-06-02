// src/app/add/page.js

"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonForm from "@/components/CommonForm";

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
        setError("Error occurred. Try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => setLoading(false);
  });

  return (
    <div>
      <CommonForm
        doFinish={doFinishAdd}
        goBack={() => router.push("/")}
        formData={formData}
        setFormData={setFormData}
        error={error}
        isLoading={loading}
      />
    </div>
  );
}
