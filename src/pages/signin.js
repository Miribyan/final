import { signIn, getCsrfToken, getProviders } from "next-auth/react";

const Signin = ({ csrfToken, providers }) => {
  return (
    <div>
     
        <div>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name} style={{ marginBottom: 0 }}>
                <button onClick={() => signIn(provider.id)}>
                    {provider.id}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
