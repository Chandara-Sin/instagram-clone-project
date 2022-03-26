import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'

function Feed() {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      {/* Left Section */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      {/* End of Left Section */}

      {/* Right Section */}
      <section className="relative hidden md:col-span-1 xl:inline-grid">
        {/* Mini Profile */}
        <div className="top-[3.2rem fixed">
          <MiniProfile />
        </div>
        {/* Suggestions */}
      </section>
      {/* End of Right Section */}
    </main>
  )
}

export default Feed
