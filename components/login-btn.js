import { data } from "autoprefixer";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login_Component() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  if (session) {
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
