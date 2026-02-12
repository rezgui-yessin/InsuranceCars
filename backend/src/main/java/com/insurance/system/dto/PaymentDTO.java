package com.insurance.system.dto;

import com.insurance.system.entity.enums.PaymentMethod;
import com.insurance.system.entity.enums.PaymentStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PaymentDTO {
    private Long id;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private PaymentMethod method;
    private PaymentStatus status;
    private Long policyId;
}
