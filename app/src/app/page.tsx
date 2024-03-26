"use client";

import { LoginButton } from "@telegram-auth/react";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-1 text-sm font-semibold text-[#404749]/[0.5]">
      <LoginButton botUsername="SampleBot" />
      {/* Please select a chat */}
    </div>
  );
}
