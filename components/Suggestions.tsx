import faker from '@faker-js/faker'
import { useEffect, useState } from 'react'
import { IUserProfile } from '../interfaces/feed'

function Suggestions() {
  const [suggestedUsers, setSuggestedUsers] = useState<IUserProfile[]>([])
  useEffect(() => {
    const fakeUsers = [...Array(4)].map((item, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }))
    setSuggestedUsers(fakeUsers)
  }, [])

  return (
    <div className="mt-4 ml-10 w-full">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="font-bold text-gray-400">Suggestions For You</h3>
        <button className="text-grey-600 font-semibold">See all</button>
      </div>

      {suggestedUsers.map((profile, index) => (
        <div key={index} className="mt-3 flex items-center justify-between">
          <img
            src={profile.avatar}
            alt="profile avatar"
            className="h-10 w-10 cursor-pointer rounded-full border p-[2px]"
          />
          <div className="ml-4 flex-1">
            <h2 className="text-semibold cursor-pointer text-sm hover:underline">
              {profile.username}
            </h2>
            <h3 className="text-xs text-gray-400">
              Work at {profile.company.name}
            </h3>
          </div>
          <button className="text-xs font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
