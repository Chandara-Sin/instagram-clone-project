import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'
import { switchProfileDialogState } from '../app/store'

function MiniProfile() {
  const { data: session } = useSession()
  const setOpenDialog = useSetRecoilState(switchProfileDialogState)
  return (
    <div className="flex items-center justify-between w-full mt-10 ml-10">
      <div className="relative w-16 h-16">
        <Image
          src={
            session
              ? session?.user?.image
              : require('../public/assets/images/portfolio.jpg')
          }
          alt="profile pic"
          objectFit="cover"
          layout="fill"
          className="rounded-full cursor-pointer"
          priority
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-bold cursor-pointer">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Bio xxx</h3>
      </div>
      <button
        onClick={() => setOpenDialog(true)}
        className="px-3 py-2 text-sm font-semibold text-white transition duration-200 ease-out bg-blue-400 rounded-full cursor-pointer hover:scale-110"
      >
        Switch
      </button>
    </div>
  )
}

export default MiniProfile
