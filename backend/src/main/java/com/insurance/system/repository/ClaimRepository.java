package com.insurance.system.repository;

import com.insurance.system.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByPolicyId(Long policyId);
    
    @Query("SELECT c FROM Claim c JOIN c.policy p WHERE p.client.id = :clientId")
    List<Claim> findByClientId(Long clientId);
}
