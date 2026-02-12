package com.insurance.system.dto;

import com.insurance.system.entity.enums.PolicyStatus;
import com.insurance.system.entity.enums.PolicyType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PolicyDTO {
    private Long id;
    private String policyNumber;
    private PolicyType type;
    private PolicyStatus status;
    private BigDecimal price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long clientId;
    private Long carId;
    private Long agentId;
    
    // Additional view fields
    private String clientName;
    private String carInfo;
}
