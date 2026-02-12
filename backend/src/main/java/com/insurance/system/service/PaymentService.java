package com.insurance.system.service;

import com.insurance.system.dto.PaymentDTO;
import com.insurance.system.entity.Client;
import com.insurance.system.entity.InsurancePolicy;
import com.insurance.system.entity.Payment;
import com.insurance.system.entity.enums.PaymentStatus;
import com.insurance.system.repository.ClientRepository;
import com.insurance.system.repository.PaymentRepository;
import com.insurance.system.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private ClientRepository clientRepository;

    public PaymentDTO createPayment(PaymentDTO dto) {
        InsurancePolicy policy = policyRepository.findById(dto.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        Payment payment = Payment.builder()
                .amount(dto.getAmount())
                .paymentDate(LocalDate.now())
                .method(dto.getMethod())
                .status(PaymentStatus.COMPLETED) // Assuming instant payment
                .policy(policy)
                .build();

        return mapToDTO(paymentRepository.save(payment));
    }

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }
    
    public List<PaymentDTO> getPaymentsByClientUser(Long userId) {
        Client client = clientRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Client not found"));
        return paymentRepository.findByClientId(client.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private PaymentDTO mapToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setMethod(payment.getMethod());
        dto.setStatus(payment.getStatus());
        dto.setPolicyId(payment.getPolicy().getId());
        return dto;
    }
}
