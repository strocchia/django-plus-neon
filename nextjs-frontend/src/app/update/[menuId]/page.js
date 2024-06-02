// src/app/update/page.js

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Page({ params }) {
  const router = useRouter();

  return (
    <div>
      Page
      <br />
      {JSON.stringify(params, null, 2)}
    </div>
  );
}
