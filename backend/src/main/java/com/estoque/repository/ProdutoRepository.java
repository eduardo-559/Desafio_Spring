package com.estoque.repository;

import com.estoque.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    // Query para retornar os produtos que tem abaixo de 10 unidades no estoque
    @Query("SELECT p FROM Produto p WHERE p.quantidadeEstoque < 10")
    List<Produto> findProdutosComEstoqueBaixo();

    // Query para retornar os produtos mais vendidos
    @Query("SELECT p.nome, SUM(m.quantidade) AS totalVendido FROM Movimentacao m JOIN m.produto p WHERE m.tipo = 'saida' GROUP BY p.nome ORDER BY totalVendido DESC")
    List<Object[]> findProdutosMaisVendidos();
    
    boolean existsByNome(String nome);
}
