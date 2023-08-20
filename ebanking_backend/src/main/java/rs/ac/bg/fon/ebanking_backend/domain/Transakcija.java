package rs.ac.bg.fon.ebanking_backend.domain;

import jakarta.persistence.*;
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
public class Transakcija {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDateTime vreme;

    private Integer iznos;

    @Enumerated(EnumType.STRING)
    private TipTransakcije tipTransakcije;

    @ManyToOne
    private Racun posiljalac;

    @ManyToOne
    private Racun primalac;

}
