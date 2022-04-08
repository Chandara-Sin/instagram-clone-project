import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { switchProfileDialogState } from '../app/store'
import { useRecoilState } from 'recoil'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'

function SwitchProfileDialog() {
  const { data: session } = useSession()
  const [openDialog, setOpenDialog] = useRecoilState(switchProfileDialogState)
  const focusButtonRef = useRef(null)
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
            <div className="inline-block max-w-md overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:align-middle">
              <div>
                <div className="pt-3">
                  <Dialog.Title>
                    <p className="text-lg font-medium text-center text-gray-900">
                      Swich Accounts
                    </p>
                  </Dialog.Title>
                  <div className="flex items-center w-full mt-2">
                    <span className="flex-1 h-px bg-gray-300"></span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between h-64">
                  <div className="flex items-center w-full p-4">
                    <img
                      src={
                        session
                          ? session?.user?.image
                          : require('../public/assets/images/portfolio.jpg')
                      }
                      alt="profile pic"
                      className="mr-3 h-[3.2rem] w-[3.2rem] cursor-pointer rounded-full object-cover p-[2px]"
                    />
                    <p className="flex-1 text-sm font-bold cursor-pointer">
                      {session?.user?.username}
                    </p>
                    <CheckCircleIcon className="w-8 h-8 text-blue-400 cursor-pointer" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center w-full">
                      <span className="flex-1 h-px bg-gray-300"></span>
                    </div>
                    <p className="py-3 font-medium text-center text-blue-500 cursor-pointer text-md">
                      Log into an Existing Account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SwitchProfileDialog
