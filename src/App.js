import React, { useState } from "react"
import "./bootstrap.min.css"
import "./App.css"
import Nav from "./componentes/Nav"
import Formulario from "./componentes/Formulario"
import Footer from "./componentes/Footer"

const App = () => {
  const [tipoVeiculo, setTipoVeiculo] = useState("")
  return (
    <>
      <Nav tipoVeiculo={setTipoVeiculo} />
      <Formulario tpVeiculo={tipoVeiculo} />
      <Footer />
    </>
  )
}

export default App
