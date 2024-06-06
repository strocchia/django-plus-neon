// src/app/add/page.js

"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonForm from "@/components/CommonForm";
import { createMenu } from "@/utils/menuFuncs";

export default function Page() {
  return (
    <div>
      <CommonForm />
    </div>
  );
}
