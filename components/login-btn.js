import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login_Component() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  useEffect(async () => {
    const response = await fetch("/api/prisma/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session }),
    });
    const data = await response.json();
    setMessage(data.message);
    console.log(data.message);
  }),
    [session];
  if (session) {
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
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
