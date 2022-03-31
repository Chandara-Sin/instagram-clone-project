import { useEffect, useState } from 'react'
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
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)

function Post(props: IPostProps) {
  const { id, username, profilePic, postImg, caption } = props
  const { data: session } = useSession()
  const [inputComment, setInputComment] = useState('')
  const [getComments, setGetComments] = useState<Array<QueryDocumentSnapshot>>(
    []
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setGetComments(snapshot.docs)
        }
      ),
    [db]
  )

  const handleUploadComment = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    try {
      await addDoc(collection(db, 'posts', id, 'comments'), {
        comment: inputComment,
        username: session?.user?.username,
        profilePic: session?.user?.image,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      throw err
    }
    setInputComment('')
  }

  return (
    <div className="bg-white border rounded-md my-7">
      {/* Profile Header */}
      <div className="flex items-center p-4">
        <img
          src={profilePic}
          alt="profile pic"
          className="mr-3 h-[3.2rem] w-[3.2rem] cursor-pointer rounded-full border-2 border-red-500 object-cover p-[2px]"
        />
        <p className="flex-1 text-sm font-bold cursor-pointer">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      {/* Post Image */}
      <img
        src={postImg}
        alt="post img"
        className="h-[614px] w-full object-cover"
      />

      {/* Like Comment Buttons */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center space-x-4">
          <HeartIcon className="post-btn" />
          <ChatIcon className="post-btn" />
          <PaperAirplaneIcon className="rotate-45 post-btn" />
        </div>
        <BookmarkIcon className="post-btn" />
      </div>

      {/* Caption */}
      <div>
        <p className="p-5 truncate">
          <span className="mr-1 font-bold cursor-pointer">{username}</span>
          {caption}
        </p>
      </div>

      {/* Comments */}
      {!!getComments.length && (
        <div className="my-1 ml-10 overflow-y-scroll max-h-20">
          {getComments.map((item, index) => (
            <div className="flex items-center mb-3 space-x-2" key={item.id}>
              <img
                src={item.data().profilePic}
                className="rounded-full h-7"
                alt="profile pic"
              />
              <p className="flex-1 text-sm">
                <span className="font-semibold">{item.data().username}</span>{' '}
                {item.data().comment}
              </p>
              <p className="pr-5 text-xs">
                {item.data().timestamp &&
                  dayjs(item.data().timestamp.toDate()).fromNow()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Input */}
      <div className="border-t">
        <form className="flex items-center px-4 py-2">
          <EmojiHappyIcon className="cursor-pointer h-7 w-7" />
          <input
            type="text"
            value={inputComment}
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
            onChange={(event) => setInputComment(event.target.value)}
          />
          <button
            type="submit"
            disabled={!inputComment.trim()}
            className={`font-semibold ${
              !!inputComment.trim() ? 'text-blue-400' : 'text-gray-500'
            }`}
            onClick={handleUploadComment}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

function Posts() {
  const [getPosts, setGetPosts] = useState<Array<QueryDocumentSnapshot>>([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setGetPosts(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    <div>
      {!!getPosts.length &&
        getPosts.map((profile, index) => (
          <Post
            key={index}
            id={profile.id}
            username={profile.data().username}
            profilePic={profile.data().profilePic}
            postImg={profile.data().postImg}
            caption={profile.data().caption}
          />
        ))}
    </div>
  )
}

export default Posts
