package rs.ac.bg.fon.ebanking_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.ebanking_backend.domain.Podrska;
import rs.ac.bg.fon.ebanking_backend.service.PodrskaService;

@RestController
@RequestMapping("/api/v1/podrska")
@CrossOrigin
@RequiredArgsConstructor
public class PodrskaController {

    private final PodrskaService podrskaService;

    @GetMapping
    public Page<Podrska> getAll(Pageable pageable) {
        return podrskaService.getAll(pageable);
    }

    @GetMapping("{id}")
    public Podrska getById(@PathVariable Long id) {
        return podrskaService.getById(id);
    }

    @GetMapping("/razresene")
    public Page<Podrska> getRazresene(Pageable pageable) {
        return podrskaService.getRazresene(pageable);
    }


    @GetMapping("/nerazresene")
    public Page<Podrska> getNerazresene(Pageable pageable) {
        return podrskaService.getNerazresene(pageable);
    }

    @PostMapping
    public Podrska postaviPitanje(@RequestBody Podrska podrska) {
        return podrskaService.postaviPitanje(podrska);
    }

    @PostMapping("/{id}/razresi")
    public Podrska razresiPodrsku(@RequestBody Podrska podrska) {
        return podrskaService.razresiPodrsku(podrska);
    }


}
