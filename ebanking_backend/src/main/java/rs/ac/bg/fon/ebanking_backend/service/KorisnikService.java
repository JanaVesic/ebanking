package rs.ac.bg.fon.ebanking_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.ebanking_backend.domain.Korisnik;
import rs.ac.bg.fon.ebanking_backend.domain.Role;
import rs.ac.bg.fon.ebanking_backend.repository.KorisnikRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class KorisnikService {

    private final KorisnikRepository korisnikRepository;

    public Korisnik getTrenutnoUlogovaniKorisnik() {
        return (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Role getTrenutnoUlogovanuRolu() {
        return getTrenutnoUlogovaniKorisnik().getRole();
    }

    public List<Korisnik> getAll() {
        return korisnikRepository.findAll()
                .stream()
                .filter(korisnik -> !korisnik.equals(getAdministrator()))
                .filter(korisnik -> !korisnik.equals(getTrenutnoUlogovaniKorisnik()))
                .toList();
    }

    public Korisnik getById(Long id) {
        return korisnikRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Korisnik getAdministrator() {
        return korisnikRepository.findByRole(Role.ADMIN);
    }
}
