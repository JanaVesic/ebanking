package rs.ac.bg.fon.ebanking_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.ebanking_backend.domain.Korisnik;
import rs.ac.bg.fon.ebanking_backend.domain.Podrska;
import rs.ac.bg.fon.ebanking_backend.domain.Role;
import rs.ac.bg.fon.ebanking_backend.repository.PodrskaRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class PodrskaService {

    private final PodrskaRepository podrskaRepository;
    private final KorisnikService korisnikService;


    public Page<Podrska> getAll(Pageable pageable) {
        Role trenutnoUlogovanaRola = korisnikService.getTrenutnoUlogovanuRolu();
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        if (trenutnoUlogovanaRola.equals(Role.ADMIN)) {
            return podrskaRepository.findAll(pageable);
        }
        return podrskaRepository.findByPodnosilacId(trenutnoUlogovaniKorisnik.getId(), pageable);
    }

    public Podrska getById(Long id) {
        Role trenutnoUlogovanaRola = korisnikService.getTrenutnoUlogovanuRolu();
        if (trenutnoUlogovanaRola.equals(Role.ADMIN)) {
            return podrskaRepository.findById(id).orElseThrow(NoSuchElementException::new);
        }
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        Podrska podrska = podrskaRepository.findById(id).orElseThrow(NoSuchElementException::new);
        if (!podrska.getPodnosilac().equals(trenutnoUlogovaniKorisnik)) {
            throw new AccessDeniedException("Nije moguc pristup podrsci drugog korisnika");
        }
        return podrska;
    }

    public Page<Podrska> getRazresene(Pageable pageable) {
        Role trenutnoUlogovanaRola = korisnikService.getTrenutnoUlogovanuRolu();
        if (trenutnoUlogovanaRola.equals(Role.ADMIN)) {
            return podrskaRepository.findByRazreseno(true, pageable);
        }
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        return podrskaRepository.findByRazresenoAndPodnosilac_Id(true, trenutnoUlogovaniKorisnik.getId(), pageable);
    }

    public Page<Podrska> getNerazresene(Pageable pageable) {
        Role trenutnoUlogovanaRola = korisnikService.getTrenutnoUlogovanuRolu();
        if (trenutnoUlogovanaRola.equals(Role.ADMIN)) {
            return podrskaRepository.findByRazreseno(false, pageable);
        }
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        return podrskaRepository.findByRazresenoAndPodnosilac_Id(false, trenutnoUlogovaniKorisnik.getId(), pageable);
    }

    public Podrska postaviPitanje(Podrska podrska) {
        podrska.setPodnosilac(korisnikService.getTrenutnoUlogovaniKorisnik());
        podrska.setVremePitanja(LocalDateTime.now());
        podrska.setRazreseno(false);
        return podrskaRepository.save(podrska);
    }

    public Podrska razresiPodrsku(Podrska podrska) {
        Podrska podrskaBazaPodataka = podrskaRepository.findById(podrska.getId()).orElseThrow(NoSuchElementException::new);
        podrskaBazaPodataka.setOdgovor(podrska.getOdgovor());
        podrskaBazaPodataka.setVremeOdgovora(LocalDateTime.now());
        podrskaBazaPodataka.setRazreseno(true);
        return podrskaRepository.save(podrskaBazaPodataka);
    }
}
