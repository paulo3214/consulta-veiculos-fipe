import React, { useState, useEffect } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import Spinner from "./Spinner"

const Formulario = ({ tpVeiculo }) => {
  const [marcas, setMarcas] = useState([])
  const [modelos, setModelos] = useState([])
  const [ano, setAno] = useState([])
  const [dadosVeiculo, setDadosVeiculo] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadOptionsMarcas = async (search) => {
    setDadosVeiculo(null)
    const resposta = await fetch(
      `https://parallelum.com.br/fipe/api/v1/${tpVeiculo}/marcas`
    )
    const dados = await resposta.json()

    let dadosFormatados = dados.map((item) => {
      return {
        value: item.codigo,
        label: item.nome,
      }
    })

    if (search) {
      const searchLower = search.toLowerCase()
      dadosFormatados = dadosFormatados.filter((item) => {
        return item.label.toLowerCase().includes(searchLower)
      })
    }

    return {
      options: dadosFormatados,
    }
  }

  const loadOptionsModelos = async (search) => {
    const resposta = await fetch(
      `https://parallelum.com.br/fipe/api/v1/${tpVeiculo}/marcas/${marcas.value}/modelos`
    )
    const dados = await resposta.json()

    let dadosFormatados = dados.modelos.map((item) => {
      return {
        value: item.codigo,
        label: item.nome,
      }
    })

    if (search) {
      const searchLower = search.toLowerCase()
      dadosFormatados = dadosFormatados.filter((item) => {
        return item.label.toLowerCase().includes(searchLower)
      })
    }

    return {
      options: dadosFormatados,
    }
  }

  const loadOptionsAnos = async (search) => {
    const resposta = await fetch(
      `https://parallelum.com.br/fipe/api/v1/${tpVeiculo}/marcas/${marcas.value}/modelos/${modelos.value}/anos`
    )
    const dados = await resposta.json()

    let dadosFormatados = dados.map((item) => {
      return {
        value: item.codigo,
        label: item.nome,
      }
    })

    if (search) {
      const searchLower = search.toLowerCase()
      dadosFormatados = dadosFormatados.filter((item) => {
        return item.label.toLowerCase().includes(searchLower)
      })
    }

    return {
      options: dadosFormatados,
    }
  }
  const carregarMarcas = (e) => {
    setMarcas({ label: e.label, value: e.value })
    setModelos([])
    setAno([])
    setDadosVeiculo(null)
  }

  const carregarModelos = (e) => {
    setModelos({ label: e.label, value: e.value })
    setAno([])
    setDadosVeiculo(null)
  }

  const carregarDadosCarro = async (e) => {
    setLoading(true)
    setAno({ label: e.label, value: e.value })

    const resposta = await fetch(
      `https://parallelum.com.br/fipe/api/v1/${tpVeiculo}/marcas/${marcas.value}/modelos/${modelos.value}/anos/${e.value}`
    )
    const dados = await resposta.json()
    setDadosVeiculo({
      ano: dados.AnoModelo,
      codigoFipe: dados.CodigoFipe,
      combustivel: dados.Combustivel,
      marca: dados.Marca,
      mesReferencia: dados.MesReferencia,
      modelo: dados.Modelo,
      valor: dados.Valor,
    })
    setLoading(false)
  }

  const limparDados = () => {
    setMarcas([])
    setModelos([])
    setAno([])
    setDadosVeiculo(null)
  }
  useEffect(() => {
    if (tpVeiculo) limparDados()
  }, [tpVeiculo])

  return (
    <>
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-lg-12'>
            <div className='page-header'>
              <h1 id='forms'>
                {tpVeiculo &&
                  new String(tpVeiculo)[0].toUpperCase() +
                    new String(tpVeiculo).substring(1)}
              </h1>
            </div>
          </div>
        </div>
        {tpVeiculo && (
          <form data-bitwarden-watching='1'>
            <fieldset>
              <div className='form-group row'>
                <label htmlFor='marca' className='col-sm-2 col-form-label'>
                  Marca
                </label>
                <div className='col-sm-10'>
                  <AsyncPaginate
                    value={marcas}
                    loadOptions={loadOptionsMarcas}
                    onChange={carregarMarcas}
                    key={JSON.stringify(tpVeiculo)}
                    placeholder={"Selecione"}
                  />
                </div>
              </div>

              {marcas.value && (
                <div className='form-group row'>
                  <label htmlFor='modelo' className='col-sm-2 col-form-label'>
                    Modelos
                  </label>
                  <div className='col-sm-10'>
                    <AsyncPaginate
                      value={modelos}
                      loadOptions={loadOptionsModelos}
                      onChange={carregarModelos}
                      key={JSON.stringify(marcas)}
                      placeholder={"Selecione"}
                    />
                  </div>
                </div>
              )}
              {modelos.value && (
                <div className='form-group row mb-5'>
                  <label htmlFor='ano' className='col-sm-2 col-form-label'>
                    Ano
                  </label>
                  <div className='col-sm-10'>
                    <AsyncPaginate
                      value={ano}
                      loadOptions={loadOptionsAnos}
                      onChange={carregarDadosCarro}
                      key={JSON.stringify(modelos)}
                      placeholder={"Selecione"}
                    />
                  </div>
                </div>
              )}
              {loading ? (
                <Spinner />
              ) : (
                dadosVeiculo && (
                  <fieldset>
                    <legend>Dados do Veículo</legend>
                    <div className='form-group row'>
                      <label
                        htmlFor='staticModelo'
                        className='col-sm-2 col-form-label'
                      >
                        Marca
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticMarcaLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.marca}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />

                    <div className='form-group row'>
                      <label
                        htmlFor='staticModelo'
                        className='col-sm-2 col-form-label'
                      >
                        Modelo
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticModeloLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.modelo}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />

                    <div className='form-group row'>
                      <label
                        htmlFor='staticModelo'
                        className='col-sm-2 col-form-label'
                      >
                        Código Fipe
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticModeloLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.codigoFipe}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />

                    <div className='form-group row'>
                      <label
                        htmlFor='staticModelo'
                        className='col-sm-2 col-form-label'
                      >
                        Ano
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticAnoLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.ano}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />

                    <div className='form-group row'>
                      <label
                        htmlFor='staticValor'
                        className='col-sm-2 col-form-label'
                      >
                        Valor
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticValorLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.valor}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />

                    <div className='form-group row'>
                      <label
                        htmlFor='staticMesReferencia'
                        className='col-sm-2 col-form-label'
                      >
                        Mês referência
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticMesReferenciaLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.mesReferencia}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />

                    <div className='form-group row'>
                      <label
                        htmlFor='staticCombustivel'
                        className='col-sm-2 col-form-label'
                      >
                        Combustível
                      </label>
                      <div className='col-sm-10'>
                        <label
                          htmlFor='staticCombustivelLabel'
                          className='col-sm-10 col-form-label'
                        >
                          {dadosVeiculo.combustivel}
                        </label>
                      </div>
                    </div>
                    <hr class='bg-primary border-2 border-top border-primary' />
                  </fieldset>
                )
              )}
            </fieldset>
          </form>
        )}
      </div>
    </>
  )
}

export default Formulario
