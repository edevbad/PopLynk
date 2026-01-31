import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-auto text-gray-300 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} PopLynk. All rights reserved.
        </p>
      </footer>
  )
}

export default Footer
