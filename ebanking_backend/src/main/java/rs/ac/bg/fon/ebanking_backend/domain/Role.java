package rs.ac.bg.fon.ebanking_backend.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    KORISNIK,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
