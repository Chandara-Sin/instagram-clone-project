import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { IStoryProps, IUserProfile } from '../interfaces/feed'

function Story(props: IStoryProps) {
  const { img, username } = props
  return (
    <div>
      <div className="relative mx-[6px] h-16 w-16 transform rounded-full bg-gradient-to-tr from-[#f5832c] via-[#d84d7b] to-[#962fbf] p-[2px] transition duration-200 ease-out hover:scale-110">
        <div className="relative bg-white rounded-full">
          <img
            className="cursor-pointer rounded-full object-contain p-[2px]"
            src={img}
            alt="profile picture"
          />
        </div>
      </div>
      <p className="mx-[6px] w-16 truncate text-center text-xs">{username}</p>
    </div>
  )
}

function Stories() {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([])
  useEffect(() => {
    const fakeUsers = [...Array(20)].map((item, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }))
    setUserProfiles(fakeUsers)
  }, [])

  return (
    <div className="flex p-4 mt-6 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-md scrollbar-hide">
      {userProfiles.map((profile, index) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  )
}

export default Stories
