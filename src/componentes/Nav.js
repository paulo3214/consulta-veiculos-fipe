import React from "react"

const Nav = ({ tipoVeiculo }) => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container'>
          <a href='#' className='navbar-brand'>
            Tabela FIPE
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarColor01'
            aria-controls='navbarColor01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item dropdown col-sm-6'>
                <a
                  className='nav-link dropdown-toggle'
                  data-bs-toggle='dropdown'
                  href='#'
                  role='button'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Tipo de Veículo
                </a>
                <div className='dropdown-menu'>
                  <a
                    className='dropdown-item'
                    href='#'
                    onClick={() => tipoVeiculo("carros")}
                  >
                    <i className='fa fa-car mr-3'></i>
                    Carro
                  </a>
                  <div className='dropdown-divider'></div>
                  <a
                    className='dropdown-item'
                    href='#'
                    onClick={() => tipoVeiculo("motos")}
                  >
                    <i className='fa fa-motorcycle mr-3'></i>
                    Moto
                  </a>
                  <div className='dropdown-divider'></div>
                  <a
                    className='dropdown-item'
                    href='#'
                    onClick={() => tipoVeiculo("caminhoes")}
                  >
                    <i className='fa fa-truck mr-3'></i>
                    Caminhão
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
