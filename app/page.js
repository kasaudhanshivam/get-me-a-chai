import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (<>
    <div className="container text-white py-16 mx-auto text-center">
      <h1 className="flex items-center gap-2 justify-center text-5xl py-2">Buy Me A Chai<img className="invertImg" src="./tea.gif" width={80} alt="" /></h1>
      <p>A crowdfunding platform for developers. Get funded by you fans and followers.</p>
      <div className="py-4 flex gap-2 items-center justify-center">
        <Link href="/login">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start here!</button>
        </Link>
        <Link href="/about">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
        </Link>
      </div>
    </div>


    <h1 className="h-1 bg-white opacity-10"></h1>

    <div className="flex flex-col justify-center items-center py-10 font-bold text-2xl">
      <h2 className="text-white pb-8">Your fans can buy you a Chai</h2>


      <div className="flex justify-around items-center gap-28 py-4">

        <div className="flex flex-col text-center justify-center items-center">
          <div className="p-2 rounded-full bg-slate-400">
            <img src="/man.gif" alt="man" width={100} height={100} />
          </div>
          <h3 className="text-white">Fans want to help</h3>
          <p className="text-gray-400 text-sm">Your fans are available to support you</p>
        </div>

        <div className="flex flex-col text-center justify-center items-center">
          <div className="p-2 rounded-full bg-slate-400">
            <img src="/coin.gif" alt="coin" width={100} height={100} />
          </div>
          <h3 className="text-white">Fans want to contribute</h3>
          <p className="text-gray-400 text-sm">Your fans are willing to contribute financially</p>
        </div>

        <div className="flex flex-col text-center justify-center items-center">
          <div className="p-2 rounded-full bg-slate-400">
            <img src="/group.gif" alt="group" width={100} height={100} />
          </div>
          <h3 className="text-white">Fans want to collaborate</h3>
          <p className="text-gray-400 text-sm">Your fans are ready to collaborate with you</p>
        </div>

      </div>
    </div>



    <h1 className="h-1 bg-white opacity-10"></h1>


    <div className="flex flex-col justify-center items-center px-14 py-10 font-bold">
      <h2 className="text-white text-2xl pb-4">How it works :</h2>
      <p className="mx-auto text-center text-gray-400">
      If you are a developer, you can create a profile on our platform and share it with your fans. Your fans can then contribute to your profile by buying you a chai. You can then use the funds to buy a chai and share it with your fans. It's a win-win situation for both you and your fans.
      </p>
      <iframe className="rounded-lg py-6" width="560" height="315" src="https://www.youtube.com/embed/WRfBYfjbAOA?si=dPULiU_0JneHsXkW" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  </>
  );
}
