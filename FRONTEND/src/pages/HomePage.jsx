import React from 'react'
import NavBar from '../components/NavBar'
import UrlShortner from '../components/UrlShortner'
import Footer from '../components/Footer'


const HomePage = () => {
  return (
    <>
      <div className='bg-[#213448] flex flex-col justify-between h-screen'>
      <NavBar/>
     <UrlShortner/>
     <Footer/>
     </div>
    </>
  )
}

export default HomePage
