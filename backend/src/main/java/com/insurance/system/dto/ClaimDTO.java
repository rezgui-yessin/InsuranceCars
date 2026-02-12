package com.insurance.system.dto;

import com.insurance.system.entity.enums.ClaimStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ClaimDTO {
    private Long id;
    private String claimNumber;
    private String description;
    private LocalDate date;
    private ClaimStatus status;
    private String documentUrl;
    private Long policyId;
    private String policyNumber;
}
