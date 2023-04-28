import { data } from "autoprefixer";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

async function addUser(session) {
  const response = await fetch("/api/prisma/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session }),
  });
  const data = await response.json();
  return await data;
}

export default function Login_Component() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  if (session) {
    addUser();
    setMessage(data);
    return (
      <>
        Signed in as {session.user.name} <br />
        <p>{message}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={async () => {
          signIn();
        }}
      >
        Sign in
      </button>
    </>
  );
}
