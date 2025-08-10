import NavBar from './NavBar'
import UrlShortner from './UrlShortner'
import Footer from './Footer'


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
