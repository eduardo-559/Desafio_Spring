package com.estoque.controller;

import com.estoque.model.Produto;
import com.estoque.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // Endpoint para listar todos os produtos
    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoService.listarProdutos();
    }

    // Endpoint para criar um novo produto
    @PostMapping
    public Produto criarProduto(@RequestBody Produto produto, @RequestParam Integer categoriaId) {
        return produtoService.salvarProduto(produto, categoriaId);
    }

    // Novo endpoint para listar produtos com estoque baixo
    @GetMapping("/estoque-baixo")
    public List<Produto> listarProdutosComEstoqueBaixo() {
        return produtoService.listarProdutosComEstoqueBaixo();
    }

    // Novo endpoint para comprar um produto
    @PostMapping("/{id}/comprar")
    public void comprarProduto(@PathVariable Integer id, @RequestBody Map<String, Integer> body) {
        int quantidade = body.get("quantidade");
        produtoService.comprarProduto(id, quantidade);
    }

    // Novo endpoint para listar os produtos mais vendidos
    @GetMapping("/mais-vendidos")
    public List<Object[]> listarProdutosMaisVendidos() {
        return produtoService.listarProdutosMaisVendidos();
    }

    // Endpoint para verificar se o produto já existe pelo nome
    @GetMapping("/existe")
    public boolean existeProdutoPorNome(@RequestParam String nome) {
        return produtoService.existeProdutoPorNome(nome);
    }
}
