package rs.ac.bg.fon.ebanking_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.ebanking_backend.domain.Podrska;

@Repository
public interface PodrskaRepository extends JpaRepository<Podrska, Long> {
    Page<Podrska> findByRazresenoAndPodnosilac_Id(Boolean razreseno, Long id, Pageable pageable);
    Page<Podrska> findByRazreseno(Boolean razreseno, Pageable pageable);
    Page<Podrska> findByPodnosilac_Id(Long id, Pageable pageable);
}
