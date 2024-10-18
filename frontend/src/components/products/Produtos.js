import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movimentacoes from './../movements/Movimentacoes';
import CompraProdutos from './../purchases/CompraProdutos';
import ProdutosMaisVendidos from './../products/ProdutosMaisVendidos';
import RelatorioMovimentacoes from './../movements/RelatorioMovimentacoes';
import Categoria from './../categories/Categoria';
import 'bootstrap/dist/css/bootstrap.min.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtosEstoqueBaixo, setProdutosEstoqueBaixo] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    precoCusto: '',
    quantidadeEstoque: '',
    categoriaId: ''
  });
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para buscar produtos da API
  const fetchProdutos = () => {
    axios.get('http://localhost:8080/api/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  };

  // Função para buscar categorias da API
  const fetchCategorias = () => {
    axios.get('http://localhost:8080/api/categorias')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('Erro ao buscar categorias:', error));
  };

  // Função para buscar produtos com estoque baixo da API
  const fetchProdutosEstoqueBaixo = () => {
    axios.get('http://localhost:8080/api/produtos/estoque-baixo')
      .then(response => setProdutosEstoqueBaixo(response.data))
      .catch(error => console.error('Erro ao buscar produtos com estoque baixo:', error));
  };

  useEffect(() => {
    fetchProdutos();
    fetchProdutosEstoqueBaixo();
    fetchCategorias(); 
  }, [triggerUpdate]);

  // Atualizar o formulário de novo produto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  // Adicionar novo produto e validar campos
  const handleSubmitProduto = (e) => {
    e.preventDefault();

    // Validação simples para verificar se todos os campos foram preenchidos
    if (!novoProduto.nome || !novoProduto.precoCusto || !novoProduto.quantidadeEstoque || !novoProduto.categoriaId) {
      setErrorMessage('Por favor, preencha todos os campos.'); // Mostrar mensagem de erro
      return;
    }

    // Verificar se o nome do produto já existe no banco de dados
    axios.get(`http://localhost:8080/api/produtos/existe?nome=${novoProduto.nome}`)
      .then(response => {
        if (response.data) {
          // Se o produto com o mesmo nome já existir
          setErrorMessage('Produto com o mesmo nome já existe.');
        } else {
          // Se o produto não existir, prosseguir com o cadastro
          axios.post(`http://localhost:8080/api/produtos?categoriaId=${novoProduto.categoriaId}`, novoProduto)
            .then(() => {
              fetchProdutos();
              fetchProdutosEstoqueBaixo();
              setTriggerUpdate(!triggerUpdate);

              // Limpar os campos do formulário
              setNovoProduto({
                nome: '',
                precoCusto: '',
                quantidadeEstoque: '',
                categoriaId: ''
              });
              setErrorMessage(''); // Limpar mensagem de erro
            })
            .catch(error => {
              console.error('Erro ao cadastrar produto:', error);
              setErrorMessage('Erro ao cadastrar produto.'); // Exibir mensagem de erro no catch
            });
        }
      })
      .catch(error => {
        console.error('Erro ao verificar produto existente:', error);
        setErrorMessage('Erro ao verificar produto existente.');
      });
  };

  return (
    <div className="container mt-4">
      {/* Título centralizado */}
      <h1 className="text-center mb-4">Lista de Produtos</h1>

      {/* Tabela com Bootstrap e cabeçalho azul */}
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#0056b3', color: 'white' }}>
              <tr className="text-center">
                <th scope="col">Nome do Produto</th>
                <th scope="col">Preço de Custo</th> {/* Nova coluna para o preço */}
                <th scope="col">Quantidade em Estoque</th>
                <th scope="col">Categoria</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">Nenhum produto disponível</td>
                </tr>
              )}
              {produtos.map(produto => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.precoCusto}</td> {/* Exibindo o preço de custo */}
                  <td>{produto.quantidadeEstoque > 0 ? `${produto.quantidadeEstoque} unidades` : "0 unidades"}</td>
                  <td>{produto.categoria?.nome || 'Sem categoria'}</td>
                  <td>{produto.status ? 'Ativo' : 'Inativo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulário de Cadastro de Produto */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mt-4">Cadastrar Novo Produto</h2>
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Mostrar mensagem de erro vermelha */}
          <form onSubmit={handleSubmitProduto}>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Nome:</label>
              <div className="col-sm-9">
                <input 
                  type="text" 
                  name="nome" 
                  className="form-control"
                  value={novoProduto.nome} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Preço de Custo:</label>
              <div className="col-sm-9">
                <input 
                  type="number" 
                  name="precoCusto" 
                  className="form-control"
                  value={novoProduto.precoCusto} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Quantidade em Estoque:</label>
              <div className="col-sm-9">
                <input 
                  type="number" 
                  name="quantidadeEstoque" 
                  className="form-control"
                  value={novoProduto.quantidadeEstoque} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Categoria:</label>
              <div className="col-sm-9">
                <select 
                  name="categoriaId" 
                  className="form-select"
                  value={novoProduto.categoriaId} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Cadastrar Produto</button>
            </div>
          </form>
        </div>
      </div>

      {/* Seção de Compra de Produtos */}
      <div className="row">
        <div className="col-md-12">
          <CompraProdutos produtos={produtos} triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
        </div>
      </div>

      <h1 className="text-center mt-5 mb-4">Listar Categorias</h1>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#0056b3', color: 'white' }}>
              <tr className="text-center">
                <th scope="col">Nome da Categoria</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted">Nenhuma categoria disponível</td>
                </tr>
              )}
              {categorias.map(categoria => (
                <tr key={categoria.id}>
                  <td>{categoria.nome}</td>
                  <td>{categoria.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Categoria triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
      <Movimentacoes triggerUpdate={triggerUpdate} />

      <h1 className="text-center mt-5 mb-4">Produtos com Estoque Baixo</h1>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#0056b3', color: 'white' }}>
              <tr className="text-center">
                <th scope="col">Nome do Produto</th>
                <th scope="col">Quantidade em Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtosEstoqueBaixo.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted">Nenhum produto com estoque baixo</td>
                </tr>
              )}
              {produtosEstoqueBaixo.map(produto => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidadeEstoque} unidades restantes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProdutosMaisVendidos triggerUpdate={triggerUpdate} />
      <RelatorioMovimentacoes triggerUpdate={triggerUpdate} />
    </div>
  );
}

export default Produtos;
