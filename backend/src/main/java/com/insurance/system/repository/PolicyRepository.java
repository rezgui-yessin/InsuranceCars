package com.insurance.system.repository;

import com.insurance.system.entity.InsurancePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<InsurancePolicy, Long> {
    List<InsurancePolicy> findByClientId(Long clientId);
    List<InsurancePolicy> findByAgentId(Long agentId);
}
