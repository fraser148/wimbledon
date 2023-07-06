import Head from 'next/head'
import Header from '@/components/Header'
import { api } from '@/utils/api'
import DateTimeNice from '@/components/DateTimeNice';
import Footer from '@/components/Footer';

export default function History() {
  const statuses = api.notify.getAllStatus.useQuery();

  return (
    <>
      <Head>
        <title>History | Wimbledon Courts Notifier</title>
        <meta name="description" content="History of notification statuses." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <Header />
        <div className="px-6 max-w-2xl w-full">
          <div>
            <div className="my-6">
              <h1 className="text-4xl font-semibold text-purple-wb">History</h1>
            </div>
            {(statuses.isLoading || !statuses.data) ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-wb"></div>
                </div>
                ): (
                <div className="flex flex-col border-t border-purple-wb">
                  {statuses.data.map((s) => (
                    <div key={s.id} className="flex border-b border-purple-wb  p-6 items-center text-left"
                    >
                      <h1 className="w-6 font-bold text-2xl text-green-wb">{s.number}</h1>
                      <div className='ml-4'>
                        <p className="text-lg font-light">
                          <DateTimeNice dateIn={s.createdAt} />
                        </p>
                        <p className='text-sm text-gray-600'>{s.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}