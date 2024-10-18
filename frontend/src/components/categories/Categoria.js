import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Categoria({ triggerUpdate, setTriggerUpdate }) {
  const [novaCategoria, setNovaCategoria] = useState({
    nome: '',
    descricao: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaCategoria({ ...novaCategoria, [name]: value });
  };

  // Submeter a nova categoria
  const handleSubmitCategoria = (e) => {
    e.preventDefault();

    // Validação simples para verificar se os campos foram preenchidos
    if (!novaCategoria.nome || !novaCategoria.descricao) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setErrorMessage('');

    // Realizar a requisição para cadastrar a categoria
    fetch('http://localhost:8080/api/categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaCategoria),
    })
      .then((response) => {
        if (response.ok) {
          setTriggerUpdate(!triggerUpdate);
          // Limpar os campos do formulário
          setNovaCategoria({
            nome: '',
            descricao: ''
          });
        } else {
          throw new Error('Erro ao cadastrar categoria');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="row mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center">Cadastrar Nova Categoria</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmitCategoria}>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Nome:</label>
            <div className="col-sm-9">
              <input 
                type="text" 
                name="nome" 
                className="form-control" 
                value={novaCategoria.nome} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Descrição:</label>
            <div className="col-sm-9">
              <input 
                type="text" 
                name="descricao" 
                className="form-control" 
                value={novaCategoria.descricao} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Cadastrar Categoria</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Categoria;
