import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PostDialog from '../components/PostDialog'
import { useRouter } from 'next/router'
import SwitchProfileDialog from '../components/SwitchProfileDialog'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    session === null && router.push('/auth/signin')
  }, [session])

  return (
    <div className="">
      <Head>
        <title>Instagram-clone-project</title>
        <link
          type="image/png"
          sizes="16x16"
          rel="icon"
          href="/icons8-instagram-16.png"
        />
        <link
          type="image/png"
          sizes="32x32"
          rel="icon"
          href="/icons8-instagram-32.png"
        />
        <link
          type="image/png"
          sizes="96x96"
          rel="icon"
          href="/icons8-instagram-96.png"
        />
        <link
          type="image/png"
          sizes="120x120"
          rel="icon"
          href="/icons8-instagram-120.png"
        />
      </Head>

      <Header />
      <Feed />
      <PostDialog />
      <SwitchProfileDialog />
    </div>
  )
}

export default Home
