import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary/50 mt-auto text-gray-300 py-2 text-center">
        <p>
          &copy; {new Date().getFullYear()} PopLynk. All rights reserved.
        </p>
      </footer>
  )
}

export default Footer
