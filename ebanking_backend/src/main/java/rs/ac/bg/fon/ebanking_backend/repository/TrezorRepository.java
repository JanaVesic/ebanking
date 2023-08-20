package rs.ac.bg.fon.ebanking_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.ebanking_backend.domain.Trezor;

@Repository
public interface TrezorRepository extends JpaRepository<Trezor, Long> {
}
