import logo from '../assets/logo.png'
const NavBar = () => {
  return (
    <div>
      <nav className='bg-white flex items-center justify-between h-16 overflow-hidden'>
        <div className="overflow-hidden">
         <img src={logo} alt="" width={160}/>
        </div>
        
      </nav>
    </div>
  )
}

export default NavBar
