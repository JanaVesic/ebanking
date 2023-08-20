package rs.ac.bg.fon.ebanking_backend.auth;

import lombok.*;
import rs.ac.bg.fon.ebanking_backend.domain.Role;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class AuthenticationResponse {

  private String token;
  private Role role;
}
