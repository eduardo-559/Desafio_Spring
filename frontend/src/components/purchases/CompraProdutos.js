import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CompraProdutos({ produtos, triggerUpdate, setTriggerUpdate }) {
  const [compra, setCompra] = useState({
    produtoId: '',
    quantidade: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompra({ ...compra, [name]: value });
  };

  // Submeter a compra
  const handleSubmitCompra = (e) => {
    e.preventDefault();

    // Validação simples para verificar se todos os campos foram preenchidos
    if (!compra.produtoId || !compra.quantidade) {
      setErrorMessage('Por favor, selecione um produto e insira a quantidade.');
      return;
    }

    // Verificação da quantidade para não permitir números negativos ou zero
    if (parseInt(compra.quantidade) < 1) {
      // Limpar os campos do formulário
      setCompra({
        produtoId: '',
        quantidade: ''
      });
      setErrorMessage('A quantidade deve ser maior ou igual a 1.');
      return;
    }

    setErrorMessage('');

    // Realizar a requisição de compra
    fetch(`http://localhost:8080/api/produtos/${compra.produtoId}/comprar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantidade: compra.quantidade }),
    })
      .then((response) => {
        if (response.ok) {
          setTriggerUpdate(!triggerUpdate);
          setErrorMessage(''); // Limpar mensagem de erro após sucesso

          // Limpar os campos do formulário após a compra
          setCompra({
            produtoId: '',
            quantidade: ''
          });
        } else {
          throw new Error('Erro ao realizar a compra');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Erro ao realizar a compra. Tente novamente.');
      });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center">Comprar Produto</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Exibe a mensagem de erro em vermelho */}
        <form onSubmit={handleSubmitCompra}>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Produto:</label>
            <div className="col-sm-9">
              <select 
                name="produtoId" 
                className="form-select" 
                value={compra.produtoId} 
                onChange={handleChange}
                required
              >
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Quantidade:</label>
            <div className="col-sm-9">
              <input 
                type="number" 
                name="quantidade" 
                className="form-control" 
                value={compra.quantidade} 
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Dar baixa em Estoque</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompraProdutos;
