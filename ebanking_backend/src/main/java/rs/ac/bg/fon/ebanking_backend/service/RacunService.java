package rs.ac.bg.fon.ebanking_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.ebanking_backend.domain.Racun;
import rs.ac.bg.fon.ebanking_backend.domain.Role;
import rs.ac.bg.fon.ebanking_backend.domain.Trezor;
import rs.ac.bg.fon.ebanking_backend.repository.RacunRepository;
import rs.ac.bg.fon.ebanking_backend.repository.TrezorRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RacunService {

    private final RacunRepository racunRepository;
    private final KorisnikService korisnikService;
    private final TrezorRepository trezorRepository;

    public List<Racun> getAll() {
        if (korisnikService.getTrenutnoUlogovanuRolu().equals(Role.KORISNIK)) {
            throw new AccessDeniedException("Nije dozvoljen pristup svim racunima obicnom korisniku");
        }
        return racunRepository.findAll();
    }

    public Racun getById(Long id) {
        Racun racun = racunRepository.findById(id).orElseThrow(NoSuchElementException::new);
        if (korisnikService.getTrenutnoUlogovanuRolu().equals(Role.KORISNIK) && (!racun.getVlasnik().equals(korisnikService.getTrenutnoUlogovaniKorisnik()))) {
            throw new AccessDeniedException("Ne mozete pristupiti tudjem racunu");
        }
        return racun;
    }

    public Racun getByKorisnik(Long korisnikId) {
        return racunRepository.findByKorisnikId(korisnikId).orElseThrow(NoSuchElementException::new);
    }

    public Trezor getTrezor() {
        return trezorRepository.findAll().get(0);
    }
}
