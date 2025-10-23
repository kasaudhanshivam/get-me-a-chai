import React from 'react'

const page = () => {
  return (
        // make a about page using the same layout as the home page and the dashboard page
    <>
        <h1 className="h-1 bg-white opacity-10"></h1>
        <div className="flex flex-col justify-center items-center py-8 font-bold">
            <h2 className="text-white pb-8 text-2xl">About Us</h2>
            <p className='px-36 text-gray-400'>A small team of developers who are passionate about building web applications. We are always looking for new projects to work on and new people to collaborate with. If you have an idea for a project, feel free to reach out to us and we will be happy to help you bring your idea to life.</p>
            <iframe className="rounded-lg py-6" width="560" height="315" src="https://www.youtube.com/embed/WRfBYfjbAOA?si=dPULiU_0JneHsXkW" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    </>
  )
}

export default page


export const metadata = {
  title: "About - Get Me A Chai",
}