package com.insurance.system.repository;

import com.insurance.system.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByPolicyId(Long policyId);

    @Query("SELECT p FROM Payment p JOIN p.policy Pol WHERE Pol.client.id = :clientId")
    List<Payment> findByClientId(Long clientId);
}
