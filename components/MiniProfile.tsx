import Image from 'next/image'
function MiniProfile() {
  return (
    <div className="mt-10 ml-10 flex w-full items-center justify-between">
      <div className="relative h-16 w-16">
        <Image
          src={require('../public/assets/images/portfolio.jpg')}
          alt="profile pic"
          objectFit="cover"
          layout="fill"
          className="cursor-pointer rounded-full"
        />
      </div>
      <div className="mx-4 flex-1">
        <h2 className="cursor-pointer font-bold">sx.dara_</h2>
        <h3 className="text-sm text-gray-400">Chandara Sin</h3>
      </div>
      <button className="cursor-pointer text-sm font-semibold text-blue-400">
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
