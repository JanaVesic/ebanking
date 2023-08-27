package rs.ac.bg.fon.ebanking_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.ebanking_backend.domain.Racun;
import rs.ac.bg.fon.ebanking_backend.domain.Trezor;
import rs.ac.bg.fon.ebanking_backend.service.RacunService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/racuni")
@CrossOrigin
@RequiredArgsConstructor
public class RacunController {

    private final RacunService racunService;

    @GetMapping
    public List<Racun> getAll() {
        return racunService.getAll();
    }

    @GetMapping("{id}")
    public Racun getById(@PathVariable Long id) {
        return racunService.getById(id);
    }

    @GetMapping("/trezor")
    public Trezor getTrezor() {
        return racunService.getTrezor();
    }

    @PostMapping
    public Racun napraviRacun(@RequestBody Racun racun){
        return racunService.napraviRacun(racun);
    }

    @GetMapping("/trenutnoUlogovaniRacun")
    public Racun getTrenutnoUlogovaniRacun() { return racunService.getTrenutnoUlogovani(); }
}
