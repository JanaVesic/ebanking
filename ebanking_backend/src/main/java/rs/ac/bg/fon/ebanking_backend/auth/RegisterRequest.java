package rs.ac.bg.fon.ebanking_backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import rs.ac.bg.fon.ebanking_backend.domain.Role;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class RegisterRequest {
  @NotBlank(message = "Ime ne sme biti prazno")
  private String ime;
  @NotBlank(message = "Prezime ne sme biti prazno")
  private String prezime;
  @NotBlank(message = "Email ne sme biti prazno")
  @Email(message = "email adresa nije validna")
  private String email;
  @NotBlank(message = "Username ne sme biti prazno")
  private String username;
  @NotBlank(message = "Password ne sme biti prazno")
  private String password;
  @NotNull(message = "Rola ne sme biti prazno")
  private Role role;
}
