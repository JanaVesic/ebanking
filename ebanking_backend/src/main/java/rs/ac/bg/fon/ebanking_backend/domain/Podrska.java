package rs.ac.bg.fon.ebanking_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Podrska {

    @Id
    @GeneratedValue
    private Long id;

    private String pitanje;

    private LocalDateTime vremePitanja;

    private String odgovor;

    private LocalDateTime vremeOdgovora;

    private Boolean razreseno;

    @ManyToOne
    private Korisnik podnosilac;

}
