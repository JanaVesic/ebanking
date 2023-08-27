package rs.ac.bg.fon.ebanking_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.ebanking_backend.domain.Korisnik;
import rs.ac.bg.fon.ebanking_backend.domain.Role;

import java.util.List;
import java.util.Optional;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {
    Korisnik findByRole(Role role);
    List<Korisnik> findByUsernameContainsIgnoreCase(String username);
    Optional<Korisnik> findByUsername(String username);
}
