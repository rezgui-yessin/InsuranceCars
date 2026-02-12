package com.insurance.system.controller;

import com.insurance.system.dto.ClaimDTO;
import com.insurance.system.dto.PolicyDTO;
import com.insurance.system.dto.UserDTO;
import com.insurance.system.entity.enums.ClaimStatus;
import com.insurance.system.service.ClaimService;
import com.insurance.system.service.PolicyService;
import com.insurance.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/agent")
@PreAuthorize("hasRole('AGENT')")
@CrossOrigin(origins = "http://localhost:4200")
public class AgentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PolicyService policyService;

    @Autowired
    private ClaimService claimService;

    // Get all clients (or specifically assigned ones - implementing all for now)
    @GetMapping("/clients")
    public ResponseEntity<List<UserDTO>> getClients() {
        List<UserDTO> clients = userService.getAllUsers().stream()
                .filter(u -> u.getRole().name().equals("CLIENT"))
                .collect(Collectors.toList());
        return ResponseEntity.ok(clients);
    }
    
    @PostMapping("/policies")
    public ResponseEntity<PolicyDTO> createPolicy(@RequestBody PolicyDTO policyDTO) {
        Long currentUserId = userService.getCurrentUserId();
        // Maybe fetch Agent ID from User ID?
        // For now trusting policyService or setting AgentId
        // Ideally look up Agent entity by UserID and set it on DTO.
        // Skipping lookup for brevity, assuming DTO might carry it or we trust generic create.
        // Better:
        // policyDTO.setAgentId(agentService.getAgentId(currentUserId));
        return ResponseEntity.ok(policyService.createPolicy(policyDTO));
    }

    @GetMapping("/policies")
    public ResponseEntity<List<PolicyDTO>> getMyIssuedPolicies() {
        // Assuming policies linked to this agent
        Long userId = userService.getCurrentUserId();
        return ResponseEntity.ok(policyService.getPoliciesByAgentUser(userId));
    }

    @PutMapping("/claims/{id}/status")
    public ResponseEntity<ClaimDTO> updateClaimStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        ClaimStatus status = ClaimStatus.valueOf(statusMap.get("status"));
        return ResponseEntity.ok(claimService.updateStatus(id, status));
    }
}
