import Stories from './Stories'

function Feed() {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      {/* Left Section */}

      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Post */}
      </section>
      {/* End of Left Section */}

      {/* Right Section */}
      {/* Mini Profile */}
      {/* Suggestions */}
      <section></section>
      {/* End of Right Section */}
    </main>
  )
}

export default Feed
