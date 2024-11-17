"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn, signOut } from "next-auth/react";

export function GoogleSignInButton() {
    const handleClick = () => {
        signIn("google");
    };
    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
            <span className="ml-4">Continue with Google</span>
        </button>
    );
}

export function GoogleSignOutButton() {
    const handleClick = () => {
        signOut();
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-red-500 text-white rounded-lg focus:shadow-outline hover:bg-red-600"
        >
            <span>Sign Out</span>
        </button>
    );
}


