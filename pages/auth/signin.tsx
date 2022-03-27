import Image from 'next/image'
import { Provider } from 'next-auth/providers'
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'

// Browser...
export default function signIn({ providers }: { providers: Provider }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center py-5 bg-white border border-gray-300 rounded-md w-96">
        <img
          src="https://links.papareact.com/ocw"
          className="w-64 mb-5 cursor-pointer"
        />
        <form className="flex flex-col gap-2 w-80">
          <input
            type="text"
            className="w-full p-2 text-xs border border-gray-200 rounded-md bg-gray-50 focus:border-gray-200 focus:ring-gray-200"
            placeholder="Phone number, user or email"
          />
          <input
            type="password"
            className="w-full p-2 text-xs border border-gray-200 rounded-md bg-gray-50 focus:border-gray-200 focus:ring-gray-200"
            placeholder="Password"
          />
          <input
            type="button"
            value="Log in"
            className="w-full py-1 mt-2 font-semibold text-center text-white bg-blue-400 rounded-md cursor-pointer"
          />
        </form>
        <div className="flex items-center mt-3 space-x-2 w-80">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="p-2 text-sm font-semibold text-gray-400 uppercase">
            or
          </span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex items-center justify-center">
            <div className="relative w-8 h-8 mr-2">
              <Image
                src={require('../../public/assets/images/google-icon.png')}
              />
            </div>
            <button
              onClick={() =>
                SignIntoProvider(provider.id, { callbackUrl: '/' })
              }
              className="font-semibold text-yellow-500"
            >
              Log in with {provider.name}
            </button>
          </div>
        ))}
        <button className="mt-3 ml-3 text-xs font-semibold text-blue-900">
          Forget password?
        </button>
      </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mt-5">
          <button
            onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
            className="px-3 py-2 font-semibold text-white bg-blue-500 rounded-md"
          >
            Log in with {provider.name}
          </button>
        </div>
      ))}
      <h3 className="mt-4 italic font-semibold text-gray-800">
        * This is for my personal portfolio
      </h3>
    </div>
  )
}

// Server Side Render
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
