"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button onClick={() => {
        signIn("github");
      }}>
        Continue with github
      </button>
    </div>
  )
}