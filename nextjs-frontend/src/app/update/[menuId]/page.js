// src/app/update/page.js

/**
 * page mimics /add/page.js.
 * tailored for update functionality
 */

"use client";

import CommonForm from "@/components/CommonForm";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Page({ params }) {
  const { menuId } = params;

  return (
    // <div>
    //   Page
    //   <br />
    //   {JSON.stringify(params, null, 2)}
    //   <br />
    //   {JSON.stringify(formData, null, 2)}
    // </div>

    <CommonForm />
  );
}
