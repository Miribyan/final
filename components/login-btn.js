import { useSession, signIn, signOut } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUser(session) {
  try {
    await prisma.user.create({
      data: {
        name: session.user.name,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default async function Login_Component() {
  const { data: session } = useSession();
  if (session) {
    await addUser(session); // добавлено ключевое слово await
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