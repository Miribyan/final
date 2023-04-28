import { useSession, signIn, signOut } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";

const prisma = new PrismaClient();

export default function Login_Component() {
  const { data: session } = useSession();

  useEffect(() => {
    async function addUser() {
      if (session) {
        await prisma.user.create({
          data: {
            name: session.user.name,
          },
        });
      }
    }
    addUser();
  }, [session]);

  if (session) {
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
