package rs.ac.bg.fon.ebanking_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.ebanking_backend.domain.Korisnik;
import rs.ac.bg.fon.ebanking_backend.domain.Racun;
import rs.ac.bg.fon.ebanking_backend.domain.Role;
import rs.ac.bg.fon.ebanking_backend.domain.Transakcija;
import rs.ac.bg.fon.ebanking_backend.repository.RacunRepository;
import rs.ac.bg.fon.ebanking_backend.repository.TransakcijaRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TransakcijaService {

    private static final Double PROCENAT_PROVIZIJE = 0.05;

    private final TransakcijaRepository transakcijaRepository;
    private final KorisnikService korisnikService;
    private final RacunService racunService;
    private final RacunRepository racunRepository;

    public Page<Transakcija> getAll(Pageable pageable) {
        Role trenutnoUlogovanaRola = korisnikService.getTrenutnoUlogovanuRolu();
        if (trenutnoUlogovanaRola.equals(Role.ADMIN)) {
            return transakcijaRepository.findAll(pageable);
        }

        Racun trenutnoUlogovaniRacun = racunService.getTrenutnoUlogovani();

        return transakcijaRepository.findByPosiljalacIdOrPrimalacId(trenutnoUlogovaniRacun.getId(), trenutnoUlogovaniRacun.getId(), pageable);
    }

    public Transakcija getById(Long id) {
        Role trenutnoUlogovanaRola = korisnikService.getTrenutnoUlogovanuRolu();
        Transakcija transakcija = transakcijaRepository.findById(id).orElseThrow(NoSuchElementException::new);
        if (trenutnoUlogovanaRola.equals(Role.ADMIN)) {
            return transakcija;
        }

        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovaniKorisnik();
        if (!transakcija.getPosiljalac().equals(trenutnoUlogovaniKorisnik) && !transakcija.getPrimalac().equals(trenutnoUlogovaniKorisnik)) {
            throw new AccessDeniedException("Nije moguce pristupiti transakciji u kojoj niste ucestvovali");
        }
        return transakcija;
    }

    public Transakcija izvrsiTransakciju(Transakcija transakcija) {
        return switch (transakcija.getTipTransakcije()) {
            case PRENOS_NA_DRUGI_RACUN -> prenosNaDrugiRacun(transakcija);
            case UPLATA_NA_RACUN -> uplataNaRacun(transakcija);
            case ISPLATA_SA_RACUNA -> isplataSaRacuna(transakcija);
        };
    }

    private Transakcija isplataSaRacuna(Transakcija transakcija) {
        transakcija.setVreme(LocalDateTime.now());

        Racun racun = racunService.getTrenutnoUlogovani();
        Integer provizija = Math.toIntExact(Math.round(transakcija.getIznos() * PROCENAT_PROVIZIJE));
        if (transakcija.getIznos() + provizija > racun.getStanje()) {
            throw new IllegalStateException("Nedovoljno novca na racunu");
        }
        racun.isplati(transakcija.getIznos());
        racun.isplati(provizija);

        Korisnik admin = korisnikService.getAdministrator();
        Racun trezor = racunRepository.findByVlasnikId(admin.getId()).orElseThrow(NoSuchElementException::new);
        trezor.uplati(provizija);

        racunRepository.save(trezor);
        racunRepository.save(racun);
        return transakcijaRepository.save(transakcija);
    }

    private Transakcija uplataNaRacun(Transakcija transakcija) {
        transakcija.setVreme(LocalDateTime.now());

        Racun racun = racunService.getTrenutnoUlogovani();
        racun.uplati(transakcija.getIznos());
        racunRepository.save(racun);
        return transakcijaRepository.save(transakcija);
    }

    private Transakcija prenosNaDrugiRacun(Transakcija transakcija) {
        Korisnik posiljalac = korisnikService.getTrenutnoUlogovaniKorisnik();
        Racun racunPosiljaoca = racunService.getByKorisnik(posiljalac.getId());

        Korisnik primalac = korisnikService.getById(transakcija.getPrimalac().getId());
        Racun racunPrimaoca = racunService.getByKorisnik(primalac.getId());

        Integer provizija = Math.toIntExact(Math.round(transakcija.getIznos() * PROCENAT_PROVIZIJE));

        if (transakcija.getIznos() + provizija > racunPosiljaoca.getStanje()) {
            throw new IllegalStateException("Nedovoljno novca na racunu");
        }

        racunPrimaoca.uplati(transakcija.getIznos());
        racunPosiljaoca.isplati(transakcija.getIznos());
        racunPosiljaoca.isplati(provizija);

        Korisnik admin = korisnikService.getAdministrator();
        Racun trezor = racunRepository.findByVlasnikId(admin.getId()).orElseThrow(NoSuchElementException::new);

        trezor.uplati(provizija);

        transakcija.setPrimalac(racunPrimaoca);
        transakcija.setPosiljalac(racunPosiljaoca);

        racunRepository.save(trezor);

        racunRepository.save(racunPosiljaoca);
        racunRepository.save(racunPrimaoca);

        return transakcijaRepository.save(transakcija);
    }
}
