import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movimentacoes({ triggerUpdate }) {
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Função para buscar movimentações da API
  const fetchMovimentacoes = () => {
    axios.get('http://localhost:8080/api/movimentacoes')
      .then(response => setMovimentacoes(response.data))
      .catch(error => console.error('Erro ao buscar movimentações:', error));
  };

  useEffect(() => {
    fetchMovimentacoes();
  }, [triggerUpdate]);

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Movimentações de Estoque</h1>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#0056b3', color: 'white' }}>
              <tr className="text-center">
                <th scope="col">Produto</th>
                <th scope="col">Tipo</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Data</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">Nenhuma movimentação realizada</td>
                </tr>
              )}
              {movimentacoes.map(mov => (
                <tr key={mov.id}>
                  <td>{mov.produto.nome}</td>
                  <td>{mov.tipo}</td>
                  <td>{mov.quantidade}</td>
                  <td>{new Date(mov.dataMovimentacao).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Movimentacoes;
