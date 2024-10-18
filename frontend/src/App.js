import React from 'react';
import './App.css';
import Produtos from './components/products/Produtos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Sistema de Controle de Estoque</h1>
      <Produtos />
    </div>
  );
}

export default App;
