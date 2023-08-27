package rs.ac.bg.fon.ebanking_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.ebanking_backend.domain.Korisnik;
import rs.ac.bg.fon.ebanking_backend.service.KorisnikService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/korisnici")
@CrossOrigin
@RequiredArgsConstructor
public class KorisnikController {

    private final KorisnikService korisnikService;

    @GetMapping
    public List<Korisnik> getAll() {
        return korisnikService.getAll();
    }

    @GetMapping("{id}")
    public Korisnik getById(@PathVariable Long id) {
        return korisnikService.getById(id);
    }

    @GetMapping("/trenutnoUlogovaniKorisnik")
    public Korisnik getTrenutnoUlogovaniKorisnik() { return korisnikService.getTrenutnoUlogovaniKorisnik(); }
}
