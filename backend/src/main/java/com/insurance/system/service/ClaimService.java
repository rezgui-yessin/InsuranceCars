package com.insurance.system.service;

import com.insurance.system.dto.ClaimDTO;
import com.insurance.system.entity.Claim;
import com.insurance.system.entity.Client;
import com.insurance.system.entity.InsurancePolicy;
import com.insurance.system.entity.enums.ClaimStatus;
import com.insurance.system.repository.ClaimRepository;
import com.insurance.system.repository.ClientRepository;
import com.insurance.system.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private ClientRepository clientRepository;

    public ClaimDTO createClaim(ClaimDTO dto) {
        InsurancePolicy policy = policyRepository.findById(dto.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        Claim claim = Claim.builder()
                .claimNumber(dto.getClaimNumber())
                .description(dto.getDescription())
                .date(LocalDate.now())
                .status(ClaimStatus.PENDING)
                .policy(policy)
                .documentUrl(dto.getDocumentUrl())
                .build();

        return mapToDTO(claimRepository.save(claim));
    }

    public List<ClaimDTO> getAllClaims() {
        return claimRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<ClaimDTO> getClaimsByClientUser(Long userId) {
        Client client = clientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return claimRepository.findByClientId(client.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ClaimDTO updateStatus(Long id, ClaimStatus status) {
        Claim claim = claimRepository.findById(id).orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus(status);
        return mapToDTO(claimRepository.save(claim));
    }

    private ClaimDTO mapToDTO(Claim claim) {
        ClaimDTO dto = new ClaimDTO();
        dto.setId(claim.getId());
        dto.setClaimNumber(claim.getClaimNumber());
        dto.setDescription(claim.getDescription());
        dto.setDate(claim.getDate());
        dto.setStatus(claim.getStatus());
        dto.setDocumentUrl(claim.getDocumentUrl());
        dto.setPolicyId(claim.getPolicy().getId());
        dto.setPolicyNumber(claim.getPolicy().getPolicyNumber());
        return dto;
    }
}
