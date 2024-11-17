import { getServerSession } from "next-auth";
import { authConfig } from "./lib/auth";
import { GoogleSignInButton, GoogleSignOutButton } from "@/components/authButtons";
import Image from "next/image";
import TicTacToe from "@/components/gameTicTacToe";

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      <div className="flex flex-col items-center p-10 shadow-lg bg-gray-800 bg-opacity-80 rounded-xl">
        {session ? (
          <>
            <div className="relative mb-4">
              <Image
                src={session.user?.image || "/default-profile.png"}
                alt="User Profile"
                width={80}
                height={80}
                className="rounded-full border-4 border-purple-500 shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {session.user?.name || "User"}!</h1>
            <p className="text-sm text-gray-300 mb-4">{session.user?.email}</p>
            <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
            <TicTacToe userName={session.user?.name as string} />
            <GoogleSignOutButton />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">Sign In</h1>
            <GoogleSignInButton />
          </>
        )}
      </div>
    </div>
  );
}
