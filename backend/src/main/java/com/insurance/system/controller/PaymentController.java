package com.insurance.system.controller;

import com.insurance.system.dto.PaymentDTO;
import com.insurance.system.service.PaymentService;
import com.insurance.system.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentDTO paymentDTO) throws StripeException {
        PaymentIntent paymentIntent = stripeService.createPaymentIntent(paymentDTO.getAmount().doubleValue(), "usd");

        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirm")
    public ResponseEntity<PaymentDTO> savePayment(@RequestBody PaymentDTO paymentDTO) {
        return ResponseEntity.ok(paymentService.createPayment(paymentDTO));
    }

    @GetMapping("/client/{userId}")
    public ResponseEntity<List<PaymentDTO>> getMyPayments(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentService.getPaymentsByClientUser(userId));
    }
    
    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
