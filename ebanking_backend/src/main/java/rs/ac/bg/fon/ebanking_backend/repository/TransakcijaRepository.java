package rs.ac.bg.fon.ebanking_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.ebanking_backend.domain.Transakcija;

@Repository
public interface TransakcijaRepository extends JpaRepository<Transakcija, Long> {
    Page<Transakcija> findByPosiljalacIdOrPrimalacId(Long id, Long id1, Pageable pageable);
}
