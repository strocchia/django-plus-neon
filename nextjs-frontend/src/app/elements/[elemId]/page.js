"use client";

import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start">
      <span>{JSON.stringify(params, null, 2)}</span>
      <button onClick={() => router.push("/elements")}>{"<--"}</button>
    </div>
  );
}
