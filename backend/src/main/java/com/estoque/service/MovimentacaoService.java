package com.estoque.service;

import com.estoque.model.Movimentacao;
import com.estoque.repository.MovimentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MovimentacaoService {

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    // Método para listar todas as movimentações
    public List<Movimentacao> listarMovimentacoes() {
        return movimentacaoRepository.findAll();
    }

    // Método para salvar uma nova movimentação
    public Movimentacao salvarMovimentacao(Movimentacao movimentacao) {
        return movimentacaoRepository.save(movimentacao);
    }

    // Método para listar movimentações por período
    public List<Movimentacao> listarMovimentacoesPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        return movimentacaoRepository.findMovimentacoesPorPeriodo(dataInicio.atStartOfDay(), dataFim.atTime(23, 59, 59));
    }
}
