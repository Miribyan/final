import Image from "next/image";
import { Inter } from "next/font/google";
import Login_Component from "../../components/login-btn";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Posts List</p>
      <Login_Component />
    </main>
  );
}
