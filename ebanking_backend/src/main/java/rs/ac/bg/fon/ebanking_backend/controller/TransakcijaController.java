package rs.ac.bg.fon.ebanking_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.ebanking_backend.domain.Transakcija;
import rs.ac.bg.fon.ebanking_backend.service.TransakcijaService;

@RestController
@RequestMapping("/api/v1/transakcije")
@CrossOrigin
@RequiredArgsConstructor
public class TransakcijaController {

    private final TransakcijaService transakcijaService;

    @GetMapping
    public Page<Transakcija> getAll(Pageable pageable) {
        return transakcijaService.getAll(pageable);
    }

    @GetMapping("{id}")
    public Transakcija getById(@PathVariable Long id) {
        return transakcijaService.getById(id);
    }

    @PostMapping
    public Transakcija izvrsiTransakciju(@RequestBody Transakcija transakcija) {
        return transakcijaService.izvrsiTransakciju(transakcija);
    }

}
