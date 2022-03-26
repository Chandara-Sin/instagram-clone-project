import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { IStoryProps, IUserProfile } from '../interfaces/feed'

function Story(props: IStoryProps) {
  const { img, username } = props
  return (
    <div>
      <img
        className="mx-[6px] h-16 w-16 transform cursor-pointer rounded-full border-2 border-red-500 object-contain p-[2px] transition duration-200 ease-out hover:scale-110"
        src={img}
        alt="profile picture"
      />
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
    <div className="mt-6 flex space-x-2 overflow-x-scroll rounded-md border border-gray-200 bg-white p-4 scrollbar-hide">
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
