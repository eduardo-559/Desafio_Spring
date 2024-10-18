package com.estoque.service;

import com.estoque.model.Produto;
import com.estoque.model.Categoria;
import com.estoque.model.Movimentacao;
import com.estoque.repository.ProdutoRepository;
import com.estoque.repository.CategoriaRepository;
import com.estoque.repository.MovimentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    // Método para listar todos os produtos
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    // Método para salvar um novo produto e registrar a entrada de estoque
    public Produto salvarProduto(Produto produto, Integer categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
            .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        produto.setCategoria(categoria);

        // Definir status baseado na quantidade de estoque (ativo se quantidade > 0)
        produto.setStatus(produto.getQuantidadeEstoque() > 0);

        Produto novoProduto = produtoRepository.save(produto);

        // Registrar movimentação de entrada ao adicionar um produto
        if (produto.getQuantidadeEstoque() > 0) {
            Movimentacao movimentacaoEntrada = new Movimentacao();
            movimentacaoEntrada.setProduto(novoProduto);
            movimentacaoEntrada.setTipo("entrada");
            movimentacaoEntrada.setQuantidade(novoProduto.getQuantidadeEstoque());
            movimentacaoEntrada.setDataMovimentacao(LocalDateTime.now());

            movimentacaoRepository.save(movimentacaoEntrada);
        }

        return novoProduto;
    }

    // Método para excluir um produto e registrar a movimentação de saída
    public void excluirProduto(Integer id) {
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        // Registrar movimentação de saída
        if (produto.getQuantidadeEstoque() > 0) {
            Movimentacao movimentacaoSaida = new Movimentacao();
            movimentacaoSaida.setProduto(produto);
            movimentacaoSaida.setTipo("saida");
            movimentacaoSaida.setQuantidade(produto.getQuantidadeEstoque());
            movimentacaoSaida.setDataMovimentacao(LocalDateTime.now());

            movimentacaoRepository.save(movimentacaoSaida);
        }

        produtoRepository.delete(produto);
    }

    // Método para listar produtos com estoque baixo
    public List<Produto> listarProdutosComEstoqueBaixo() {
        return produtoRepository.findProdutosComEstoqueBaixo();
    }

    // Método para comprar um produto e ajustar o status
    public void comprarProduto(Integer id, int quantidade) {
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        if (produto.getQuantidadeEstoque() >= quantidade) {
            produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);

            // Ajustar status (ativo se quantidade > 0)
            produto.setStatus(produto.getQuantidadeEstoque() > 0);

            produtoRepository.save(produto);

            // Registrar a movimentação de saída
            Movimentacao movimentacaoSaida = new Movimentacao();
            movimentacaoSaida.setProduto(produto);
            movimentacaoSaida.setTipo("saida");
            movimentacaoSaida.setQuantidade(quantidade);
            movimentacaoSaida.setDataMovimentacao(LocalDateTime.now());

            movimentacaoRepository.save(movimentacaoSaida);
        } else {
            throw new IllegalArgumentException("Quantidade solicitada maior que o estoque disponível");
        }
    }

    // Método para listar os produtos mais vendidos
    public List<Object[]> listarProdutosMaisVendidos() {
        return produtoRepository.findProdutosMaisVendidos();
    }

    // Método para verificar se um produto já existe pelo nome
    public boolean existeProdutoPorNome(String nome) {
        return produtoRepository.existsByNome(nome);
    }
}
