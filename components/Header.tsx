import { Fragment, useState } from 'react'
import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  BookmarkIcon,
  SwitchHorizontalIcon,
  UserCircleIcon,
  LogoutIcon,
  CogIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalDialogState } from '../atoms/modalAtom'
import { Popover, Transition } from '@headlessui/react'

const profileDetails = [
  {
    name: 'Profile',
    href: '##',
    icon: UserCircleIcon,
  },
  {
    name: 'Saved',
    href: '##',
    icon: BookmarkIcon,
  },
  {
    name: 'Settings',
    href: '##',
    icon: CogIcon,
  },
  {
    name: 'Switch Accounts',
    href: '##',
    icon: SwitchHorizontalIcon,
  },
]

function ProfilePopover() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <div
              className={`${
                open ? 'border-2 border-blue-300' : ''
              } relative h-9 w-9 rounded-full hover:cursor-pointer`}
            >
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
                priority
              />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-50 mt-3 w-screen max-w-[18rem] -translate-x-[90%] transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative flex flex-col p-3 space-y-2 bg-white">
                  {profileDetails.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-black">
                        <item.icon aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-900 text-md">{item.name}</p>
                      </div>
                    </a>
                  ))}
                  <div className="flex items-center w-full mt-3 space-x-2">
                    <span className="flex-1 h-px bg-gray-300"></span>
                  </div>
                  <a
                    className="flex items-center p-2 transition duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  >
                    <div className="justify-center w-6 h-6 text-black">
                      <LogoutIcon aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 text-md">Log Out</p>
                    </div>
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

function Header() {
  const [openModalDialog, setOpenModalDialog] = useRecoilState(modalDialogState)
  const router = useRouter()
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
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
        <div className="relative max-w-sm p-3 ml- md:ml-28 md:w-72">
          <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="block w-full pl-10 border-gray-300 rounded-lg bg-gray-50 focus:border-cyan-300 focus:ring-cyan-300 sm:text-sm"
            type="text"
            placeholder="Search"
          />
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
          <PlusCircleIcon
            onClick={() => setOpenModalDialog(true)}
            className="nav-btn"
          />
          <UserGroupIcon className="nav-btn" />
          <HeartIcon className="nav-btn" />
          <ProfilePopover />
        </div>
        {/* End of Right */}
      </div>
    </div>
  )
}

export default Header
