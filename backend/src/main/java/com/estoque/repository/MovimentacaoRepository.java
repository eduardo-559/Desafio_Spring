package com.estoque.repository;

import com.estoque.model.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    @Query("SELECT m FROM Movimentacao m WHERE m.dataMovimentacao BETWEEN :dataInicio AND :dataFim")
    List<Movimentacao> findMovimentacoesPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim);
}
