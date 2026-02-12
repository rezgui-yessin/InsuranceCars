package com.insurance.system.service;

import com.insurance.system.dto.PolicyDTO;
import com.insurance.system.entity.*;
import com.insurance.system.entity.enums.PolicyStatus;
import com.insurance.system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private CarRepository carRepository;

    public PolicyDTO createPolicy(PolicyDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        
        Car car = carRepository.findById(dto.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        Agent agent = null;
        if(dto.getAgentId() != null) {
            agent = agentRepository.findById(dto.getAgentId()).orElse(null);
        }

        InsurancePolicy policy = InsurancePolicy.builder()
                .policyNumber(dto.getPolicyNumber())
                .type(dto.getType())
                .status(PolicyStatus.ACTIVE)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .price(dto.getPrice())
                .client(client)
                .car(car)
                .agent(agent)
                .build();

        return mapToDTO(policyRepository.save(policy));
    }

    public List<PolicyDTO> getAllPolicies() {
        return policyRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<PolicyDTO> getPoliciesByClientUser(Long userId) {
        Client client = clientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Client profile not found"));
        return policyRepository.findByClientId(client.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }
    
    public List<PolicyDTO> getPoliciesByAgentUser(Long userId) {
        Agent agent = agentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Agent profile not found"));
        return policyRepository.findByAgentId(agent.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private PolicyDTO mapToDTO(InsurancePolicy policy) {
        PolicyDTO dto = new PolicyDTO();
        dto.setId(policy.getId());
        dto.setPolicyNumber(policy.getPolicyNumber());
        dto.setType(policy.getType());
        dto.setStatus(policy.getStatus());
        dto.setPrice(policy.getPrice());
        dto.setStartDate(policy.getStartDate());
        dto.setEndDate(policy.getEndDate());
        dto.setClientId(policy.getClient().getId());
        dto.setCarId(policy.getCar().getId());
        if (policy.getAgent() != null) dto.setAgentId(policy.getAgent().getId());
        
        dto.setClientName(policy.getClient().getUser().getFirstName() + " " + policy.getClient().getUser().getLastName());
        dto.setCarInfo(policy.getCar().getBrand() + " " + policy.getCar().getModel());
        
        return dto;
    }
}
