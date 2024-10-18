import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RelatorioMovimentacoes({ triggerUpdate }) {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  // Função para buscar movimentações por período
  const fetchMovimentacoesPorPeriodo = () => {
    if (dataInicial && dataFinal) {
      const dataInicioObj = new Date(dataInicial);
      const dataFimObj = new Date(dataFinal);

      // Verificar se a data final é menor que a data inicial
      if (dataFimObj < dataInicioObj) {
        setErrorMessage('A data final não pode ser menor que a data inicial.');
        // Limpar os campos do formulário em caso de erro
        setDataInicial('');
        setDataFinal('');
        return;
      }

      setErrorMessage('');

      // Log para verificar o formato da data
      console.log(`Data Inicial: ${dataInicial}, Data Final: ${dataFinal}`);

      // Enviar requisição ao backend
      axios.get(`http://localhost:8080/api/movimentacoes/periodo?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
        .then(response => {
          console.log("Dados recebidos:", response.data); // Log para verificar os dados recebidos
          setMovimentacoes(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar movimentações:', error.response ? error.response.data : error.message);
        });
    }
  };

  useEffect(() => {
    fetchMovimentacoesPorPeriodo();
  }, [triggerUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovimentacoesPorPeriodo();
  };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Relatório de Movimentações</h1>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Data Inicial:</label>
              <input 
                type="date" 
                className="form-control" 
                value={dataInicial} 
                onChange={(e) => setDataInicial(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Data Final:</label>
              <input 
                type="date" 
                className="form-control" 
                value={dataFinal} 
                onChange={(e) => setDataFinal(e.target.value)} 
                required
              />
            </div>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary">Buscar Movimentações</button>
          </form>
        </div>
      </div>

      <div className="row mt-5">
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
                  <td colSpan="4" className="text-center text-muted">Nenhuma movimentação encontrada</td>
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

export default RelatorioMovimentacoes;
