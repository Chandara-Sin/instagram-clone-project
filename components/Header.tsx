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

function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex max-w-6xl justify-between lg:mx-auto">
        {/* Left */}
        <div className="relative hidden w-24 cursor-pointer lg:inline-grid">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Middle - Search Input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-10 focus:border-cyan-300 focus:ring-cyan-300 sm:text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="nav-btn" />
          <MenuIcon className="h-10 cursor-pointer md:hidden" />
          <div className="nav-btn relative">
            <PaperAirplaneIcon className="nav-btn rotate-45" />
            <div
              className="absolute -top-2 -right-1 flex h-5 w-5 
            animate-pulse items-center justify-center rounded-full 
            bg-red-500 text-xs text-white"
            >
              3
            </div>
          </div>
          <PlusCircleIcon className="nav-btn" />
          <UserGroupIcon className="nav-btn" />
          <HeartIcon className="nav-btn" />
          <div className="relative h-10 w-10 hover:cursor-pointer">
            <Image
              src={require('../public/assets/images/portfolio.jpg')}
              alt="profile pic"
              className="rounded-full"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        {/* End of Right */}
      </div>
    </div>
  )
}

export default Header
