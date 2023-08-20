package rs.ac.bg.fon.ebanking_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Trezor {

    @Id
    @GeneratedValue
    private Long id;

    private Integer stanje;

    public void uplati(Integer provizija) {
        if(provizija <= 0) {
            throw new IllegalArgumentException("Provizija ne sme biti negativna");
        }
        stanje += provizija;
    }

}
