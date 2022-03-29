import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import ModalDialog from '../components/ModalDialog'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Instagram-personal-project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
      <ModalDialog />
    </div>
  )
}

export default Home
