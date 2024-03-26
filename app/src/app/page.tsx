"use client";

import useAuth from "@/hooks/useAuth";
import { LoginButton } from "@telegram-auth/react";

export default function Home() {
  const { setAuthData, isAuth } = useAuth();

  return (
    <div className="flex items-center justify-center flex-1 text-sm font-semibold text-[#404749]/[0.5]">
      {!isAuth ? (
        <LoginButton
          botUsername="stacker_ai_support_bot"
          onAuthCallback={(data) => {
            setAuthData(data);
            console.log(data);
          }}
        />
      ) : (
        "Please select a chat"
      )}
    </div>
  );
}
