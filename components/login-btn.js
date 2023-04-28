import { useSession, signIn, signOut } from "next-auth/react";





const { data: session } = useSession();
const [message, setMessage] = useState("");

const handleAddUser = async () => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session }),
  });
  const data = await response.json();
  setMessage(data.message);
};

export default function Login_Component() {
  const { data: session } = useSession();
const [message, setMessage] = useState("");


  if (session) {
     async () => {
      const response = await fetch("/api/prisma/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session }),
      });
      const data = await response.json();
      setMessage(data.message);
    };
    return (
      <>
        Signed in as {session.user.name} <br />
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
