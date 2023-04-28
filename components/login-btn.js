import { useSession, signIn, signOut } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUser(session) {
  await prisma.user.create({
    data: {
      name: session.user.name,
    },
  });
}

export default function Login_Component() {
  const { data: session } = useSession();
  if (session) {
    addUser(session);
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
