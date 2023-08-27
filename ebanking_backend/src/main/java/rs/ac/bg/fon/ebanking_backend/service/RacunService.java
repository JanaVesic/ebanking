package rs.ac.bg.fon.ebanking_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.ebanking_backend.domain.Korisnik;
import rs.ac.bg.fon.ebanking_backend.domain.Racun;
import rs.ac.bg.fon.ebanking_backend.domain.Role;
import rs.ac.bg.fon.ebanking_backend.repository.RacunRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RacunService {

    private final RacunRepository racunRepository;
    private final KorisnikService korisnikService;

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
        return racunRepository.findByVlasnikId(korisnikId).orElseThrow(NoSuchElementException::new);
    }

    public Racun getTrezor() {
        Korisnik admin = korisnikService.getAdministrator();
        return racunRepository.findByVlasnikId(admin.getId()).orElseThrow(NoSuchElementException::new);
    }

    public Racun napraviRacun(Racun racun) {
        Korisnik korisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        racun.setVlasnik(korisnik);
        return racunRepository.save(racun);
    }

    public Racun getTrenutnoUlogovani() {
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        return racunRepository.findByVlasnikId(trenutnoUlogovaniKorisnik.getId()).orElseThrow(NoSuchElementException::new);
    }
}
