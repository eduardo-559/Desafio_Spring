package com.estoque.controller;

import com.estoque.model.Movimentacao;
import com.estoque.service.MovimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;

    // Endpoint para listar todas as movimentações
    @GetMapping
    public List<Movimentacao> listarMovimentacoes() {
        return movimentacaoService.listarMovimentacoes();
    }

    // Endpoint para registrar uma nova movimentação
    @PostMapping
    public Movimentacao registrarMovimentacao(@RequestBody Movimentacao movimentacao) {
        return movimentacaoService.salvarMovimentacao(movimentacao);
    }

    // Endpoint para listar movimentações por período
    @GetMapping("/periodo")
    public List<Movimentacao> listarMovimentacoesPorPeriodo(
            @RequestParam("dataInicial") String dataInicial,
            @RequestParam("dataFinal") String dataFinal) {

        LocalDate inicio = LocalDate.parse(dataInicial);
        LocalDate fim = LocalDate.parse(dataFinal);

        return movimentacaoService.listarMovimentacoesPorPeriodo(inicio, fim);
    }
}
