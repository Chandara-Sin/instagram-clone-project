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
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
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
  const [getLikes, setGetLikes] = useState<Array<QueryDocumentSnapshot>>([])
  const [hasLiked, setHasLiked] = useState(false)

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
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setGetLikes(snapshot.docs)
      }),
    [db, id]
  )

  useEffect(() => {
    const checkHasLiked = getLikes.findIndex(
      (item) => item.id === session?.user?.uid
    )
    setHasLiked(checkHasLiked !== -1)
  }, [getLikes])

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

  const handleLikedPost = async () => {
    try {
      if (hasLiked) {
        await deleteDoc(
          doc(db, 'posts', id, 'likes', session?.user?.uid as string)
        )
      } else {
        await setDoc(
          doc(db, 'posts', id, 'likes', session?.user?.uid as string),
          {
            username: session?.user?.username,
          }
        )
      }
    } catch (err) {
      throw err
    }
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
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          {hasLiked ? (
            <HeartIconFilled
              className="text-red-500 post-btn hover:text-red-500"
              onClick={handleLikedPost}
            />
          ) : (
            <HeartIcon className="post-btn" onClick={handleLikedPost} />
          )}
          <ChatIcon className="post-btn" />
          <PaperAirplaneIcon className="rotate-45 post-btn" />
        </div>
        <BookmarkIcon className="post-btn" />
      </div>

      {/* Count Like */}
      {!!getLikes.length && (
        <div className="px-5 pb-3">
          {getLikes.length === 1 ? (
            <p>
              Liked by{' '}
              <span className="font-semibold cursor-pointer">
                {getLikes[0].data().username}
              </span>
            </p>
          ) : getLikes.length <= 10 ? (
            <p>
              Liked by{' '}
              <span className="font-semibold cursor-pointer">
                {getLikes[0].data().username}
              </span>{' '}
              and <span className="font-semibold cursor-pointer"> others</span>
            </p>
          ) : (
            <p>{`${getLikes.length} likes`}</p>
          )}
        </div>
      )}

      {/* Caption */}
      <div>
        <p className="px-5 pb-4 truncate">
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
