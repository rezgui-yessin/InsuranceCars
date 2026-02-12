package com.insurance.system.entity;

import com.insurance.system.entity.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String claimNumber;

    private String description;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private String documentUrl;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private InsurancePolicy policy;
}
