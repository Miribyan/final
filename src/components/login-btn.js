import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

export default function Login_Component() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  if (session) {
    // console.log(session)
    return (
      <>
        <button onClick={() => signOut()}>  {t("common:logout")}</button>
      </>
    );
  }
  return (
    <>
      
      <button onClick={() => signIn()}>{t("common:login")}</button>
    </>
  );
}
