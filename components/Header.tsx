import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden w-24 cursor-pointer lg:inline-grid">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
            priority
            onClick={() => router.push('/')}
          />
        </div>
        <div className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            priority
            onClick={() => router.push('/')}
          />
        </div>

        {/* Middle - Search Input field */}
        <div className="max-w-xs">
          <div className="relative p-3 mt-1">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              className="block w-full pl-10 border-gray-300 rounded-lg bg-gray-50 focus:border-cyan-300 focus:ring-cyan-300 sm:text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="nav-btn" />
          <MenuIcon className="h-10 cursor-pointer md:hidden" />
          <div className="relative nav-btn">
            <PaperAirplaneIcon className="rotate-45 nav-btn" />
            <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-1 animate-pulse">
              3
            </div>
          </div>
          <PlusCircleIcon className="nav-btn" />
          <UserGroupIcon className="nav-btn" />
          <HeartIcon className="nav-btn" />
          <div className="relative w-10 h-10 hover:cursor-pointer">
            <Image
              src={
                session
                  ? session?.user?.image
                  : require('../public/assets/images/portfolio.jpg')
              }
              alt="profile pic"
              className="rounded-full"
              layout="fill"
              objectFit="cover"
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            />
          </div>
        </div>
        {/* End of Right */}
      </div>
    </div>
  )
}

export default Header
