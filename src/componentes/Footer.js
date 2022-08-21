import React from "react"

const Footer = () => {
  return (
    <>
      <footer className='py-3 my-4' style={{ height: "100vh" }}>
        <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
          <li className='nav-item'>
            <a href='#' className='nav-link px-2 text-muted'>
              Home
            </a>
          </li>

          <li className='nav-item'>
            <a href='#' className='nav-link px-2 text-muted'>
              Sobre
            </a>
          </li>
        </ul>
        <p className='text-center text-muted'>© 2022 Company, Inc</p>
      </footer>
    </>
  )
}

export default Footer
