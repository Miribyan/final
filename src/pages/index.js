import { Inter } from "next/font/google";

import PostPreviewComponent from "@/components/preview";

const inter = Inter({ subsets: ["latin"] });
import { useTranslation } from "next-i18next";

// export const getServerSideProps = async (props) => {
//   const user = await prisma.user.findMany();
//   return {
//     props: {
//       works: works.map((work) => ({
//         ...work,
//         createdAt: work.createdAt.toISOString(),
//       })),
//     },
//   };
// };

export default function Home(props, providers, csrfToken) {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p></p>
      <PostPreviewComponent />
    </main>
  );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PrismaClient } from "@prisma/client";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "main"])),
    },
  };
}
