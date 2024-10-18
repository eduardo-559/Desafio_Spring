import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProdutosMaisVendidos({ triggerUpdate }) {
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);

  // Função para buscar os produtos mais vendidos da API
  const fetchProdutosMaisVendidos = () => {
    axios.get('http://localhost:8080/api/produtos/mais-vendidos')
      .then(response => setProdutosMaisVendidos(response.data))
      .catch(error => console.error('Erro ao buscar produtos mais vendidos:', error));
  };

  useEffect(() => {
    fetchProdutosMaisVendidos();
  }, [triggerUpdate]);

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Produtos Mais Vendidos</h1>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#0056b3', color: 'white' }}>
              <tr className="text-center">
                <th scope="col">Nome do Produto</th>
                <th scope="col">Total Vendido</th>
              </tr>
            </thead>
            <tbody>
              {produtosMaisVendidos.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted">Nenhum produto vendido</td>
                </tr>
              )}
              {produtosMaisVendidos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto[0]}</td>
                  <td>{produto[1]} unidades</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProdutosMaisVendidos;
