package rs.ac.bg.fon.ebanking_backend.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class LoginRequest {
  @NotBlank(message = "Username ne sme biti prazno")
  private String username;
  @NotBlank(message = "Password ne sme biti prazno")
  private String password;
}
