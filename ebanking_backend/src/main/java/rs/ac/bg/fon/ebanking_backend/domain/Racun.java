package rs.ac.bg.fon.ebanking_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Racun {


    @Id
    @GeneratedValue
    private Long id;

    private Integer stanje;

    @OneToOne
    private Korisnik vlasnik;

    public void uplati(Integer uplata) {
        if(uplata <= 0) {
            throw new IllegalArgumentException("Uplata mora biti pozitivna");
        }
        stanje += uplata;
    }

    public void isplati(Integer isplata) {
        if(isplata <= 0) {
            throw new IllegalArgumentException("Isplata mora biti pozit");
        }
        stanje -= isplata;
    }

}
