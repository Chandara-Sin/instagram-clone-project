import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { IPostProps } from '../interfaces/post'

function Post(props: IPostProps) {
  const { id, username, profilePic, postImg, caption } = props
  return (
    <div className="my-7 rounded-md border bg-white">
      {/* Profile Header */}
      <div className="flex items-center p-4">
        <img
          src={profilePic}
          alt="profile pic"
          className="mr-3 h-[3.2rem] w-[3.2rem] cursor-pointer rounded-full border-2 border-red-500 object-cover p-[2px]"
        />
        <p className="flex-1 cursor-pointer text-sm font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      {/* Post Image */}
      <img src={postImg} alt="post img" className="w-full object-cover" />

      {/* Like Comment Buttons */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center space-x-4">
          <HeartIcon className="post-btn" />
          <ChatIcon className="post-btn" />
          <PaperAirplaneIcon className="post-btn rotate-45" />
        </div>
        <BookmarkIcon className="post-btn" />
      </div>

      {/* Caption */}
      <div>
        <p className="truncate p-5">
          <span className="mr-1 cursor-pointer font-bold">{username}</span>
          {caption}
        </p>
      </div>

      {/* Comments */}

      {/* Comment Input */}
      <div className="border-t">
        <form className="flex items-center px-4 py-2">
          <EmojiHappyIcon className="h-7 w-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      </div>
    </div>
  )
}

function Posts() {
  const dummyData = [
    {
      id: 123,
      username: 'Diana__',
      profilePic:
        'https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?t=st=1648291234~exp=1648291834~hmac=5cf1db2e4afc5035258c25030f431fe6fb8a402924dc120803b79c0171446a0b&w=2000',
      postImg:
        'https://img.freepik.com/free-photo/influencer-posting-social-media_23-2149194122.jpg?t=st=1648291067~exp=1648291667~hmac=0c9c1f6538bf3b41faf04c62bad7a395de8e676900237f0a8baae59824f4ee1e&w=2000',
      caption: 'This is dope',
    },
    {
      id: 123,
      username: 'Sophea_*',
      profilePic:
        'https://img.freepik.com/free-photo/young-asian-woman-taking-happy-selfie-traveling-singapore-skyline-wanderlust-life-style-concept-with-millenial-girl-having-fun-by-urban-city-surrounds-vivid-bright-filter-with-focus-face_101731-1209.jpg?w=2000',
      postImg:
        'https://img.freepik.com/free-photo/woman-owner-startup-company-selling-products-online-online-store-platform-sending-goods-through-courier-company-business-planning-online-selling-online-shopping-concepts_528263-2244.jpg?w=2000',
      caption: 'This is me',
    },
  ]
  return (
    <div>
      {dummyData.map((profile, index) => (
        <Post
          key={index}
          id={profile.id}
          username={profile.username}
          profilePic={profile.profilePic}
          postImg={profile.postImg}
          caption={profile.caption}
        />
      ))}
    </div>
  )
}

export default Posts
