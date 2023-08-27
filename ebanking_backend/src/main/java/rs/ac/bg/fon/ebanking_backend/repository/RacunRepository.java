package rs.ac.bg.fon.ebanking_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.ebanking_backend.domain.Racun;

import java.util.Optional;

@Repository
public interface RacunRepository extends JpaRepository<Racun, Long> {
    Optional<Racun> findByVlasnikId(Long id);
}
