import Head from "next/head";
import { api } from "@/utils/api";
import Header from "@/components/Header";
import { toast } from "react-hot-toast";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
import DateTimeNice from "@/components/DateTimeNice";

type Indicator = {
  id: string;
  desc: string;
}

const coverIndicators : Indicator[] = [
  {
    id: "-",
    desc: "Stood down"
  },
  {
    id: "1",
    desc: "Courtside"
  },
  {
    id: "2",
    desc: "Chair Umpire discretion to STOP or SUSPEND play (don't cover the court)"
  },
  {
    id: "3",
    desc: "Chair Umpire discretion to SUSPEND play (and cover the court)"
  },
  {
    id: "4",
    desc: "Cover ASAP (end of point)"
  },
  {
    id: "5",
    desc: "Inflate covers"
  },
  {
    id: "6",
    desc: "Deflate covers"
  },
  {
    id: "7",
    desc: "Uncover"
  },
  {
    id: "8",
    desc: "Dress the court"
  }
]


export default function Home() {
  const notify = api.notify.notify.useMutation({
    onSuccess: () => {
      toast.success("Notification sent");
      void lastest.refetch();
    }
  });
  const lastest = api.notify.getStatus.useQuery();

  const maybeSendNotification = (id: string) => {
    const indicator = coverIndicators.find((indicator) => indicator.id === id);
    if (indicator) {
      setCoverIndicator(indicator);
      setOpen(true);
    }
  }

  const confirmSendNotification = () => {
    setOpen(false);
    notify.mutate({
      id: coverIndicator.id,
      text: coverIndicator.desc
    });
  }

  const [open, setOpen] = useState(false)
  const [coverIndicator, setCoverIndicator] = useState<Indicator>({
    id: "",
    desc: ""
  })

  const cancelButtonRef = useRef(null)

  return (
    <>
      <Head>
        <title>Wimbledon Courts Notifier</title>
        <meta name="description" content="Notify court attendees of court status" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center pb-24">
        <Header />
        <div className="px-6 max-w-2xl w-full">
          <div>
            <div className="my-6">
              <h1 className="text-4xl font-semibold text-purple-wb">Current Status:
                {lastest.data && (
                  <span className="text-green-wb font-bold text-4xl"> {lastest.data[0]?.number}</span>
                )}
              </h1>
              <p className="text-green-wb font-light text-sm">LAST UPDATE:
              {lastest.data && (
                <DateTimeNice dateIn={lastest.data[0]?.createdAt} />
                )}
              </p>
            </div>
            <div>
              <p className="mb-2 text-gray-600 font-light">
                To send a notification to court attendees, click on the appropriate indicator below.
              </p>
            </div>
            <div className="flex flex-col border-t border-purple-wb">
              {coverIndicators.map((indicator) => (
                <button key={indicator.id} className="flex border-b border-purple-wb  p-6 items-center text-left"
                  onClick={() => maybeSendNotification(indicator.id)}
                >
                  <h1 className="w-6 font-bold text-2xl text-green-wb">{indicator.id}</h1>
                  <p className="ml-4 text-lg font-light">{indicator.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <MegaphoneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Confirm Notification: {coverIndicator.id}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to send this notification? All users will be notified immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => confirmSendNotification()}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
}