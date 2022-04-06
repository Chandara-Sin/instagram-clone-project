import React, { ChangeEvent, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { FileUpload } from '../interfaces/postDialog'
import { modalDialogState } from '../atoms/modalAtom'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage'
import { db, storage } from '../firebase'

function PostDialog() {
  const { data: session } = useSession()
  const [openDialog, setOpenDialog] = useRecoilState(modalDialogState)
  const captionRef = useRef<HTMLInputElement | null>(null)
  const focusButtonRef = useRef(null)
  const [imgUploaded, setImgUploaded] = useState<FileUpload | null>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setImgUploaded({
        fileName: files[0].name,
        url: url,
        file: files[0],
      })
    }
  }

  const handleUploadPostDetail = async () => {
    let postID = ''
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        username: session?.user?.username,
        caption: captionRef?.current?.value,
        profilePic: session?.user?.image,
        timestamp: serverTimestamp(),
      })
      postID = docRef.id
    } catch (err) {
      throw err
    }
    return postID
  }

  const handleUploadPost = async () => {
    const postID = await handleUploadPostDetail()

    // Create a path in firebase store
    const imageRef = ref(storage, `posts/${postID}/image`)

    // Upload img to firebase store
    await uploadBytes(imageRef, imgUploaded?.file as Blob)
      .then(async (snapshot) => {
        const imgURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', postID), {
          postImg: imgURL,
        })
      })
      .catch((err) => {
        throw err
      })
    setOpenDialog(false)
    setImgUploaded(null)
  }
  return (
    <Transition.Root appear show={openDialog} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[60] overflow-y-auto"
        onClose={setOpenDialog}
        initialFocus={focusButtonRef}
      >
        <div className="flex min-h-[800px] items-end justify-center text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-80" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md sm:align-middle md:max-w-xl">
              <div>
                <div className="pt-3">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900"
                  >
                    Create a post
                  </Dialog.Title>
                  <div className="flex items-center w-full mt-2">
                    <span className="flex-1 h-px bg-gray-300"></span>
                  </div>
                </div>
                <div className="flex h-[35rem] flex-col items-center justify-center">
                  {!imgUploaded ? (
                    <>
                      <svg
                        aria-label="Icon to represent media such as images or videos"
                        color="#262626"
                        fill="#262626"
                        height="77"
                        role="img"
                        viewBox="0 0 97.6 77.3"
                        width="96"
                        className="mb-3"
                      >
                        <path
                          d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p className="pb-4 text-2xl font-normal">
                        Drag photos and videos here
                      </p>
                      <label className="px-5 py-2 text-white transition duration-150 ease-in-out bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">
                        <input
                          type="file"
                          multiple
                          accept="image/*,audio/*,video/*"
                          hidden
                          ref={focusButtonRef}
                          onChange={handleImageChange}
                        />
                        Select from computer
                      </label>
                    </>
                  ) : (
                    <>
                      <div className="w-full p-3">
                        <input
                          type="text"
                          className="w-full border-none focus:ring-0"
                          placeholder="What's on your mind...."
                          ref={captionRef}
                        />
                      </div>
                      <div className="relative h-[430px] w-[540px] rounded-md border border-gray-300 p-3">
                        <img
                          src={imgUploaded.url}
                          className="object-contain w-full h-full rounded-md cursor-pointer"
                        />
                      </div>
                      <div className="w-full p-5">
                        <button
                          ref={focusButtonRef}
                          onClick={handleUploadPost}
                          className="w-full py-1 text-lg font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                        >
                          Post
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PostDialog
