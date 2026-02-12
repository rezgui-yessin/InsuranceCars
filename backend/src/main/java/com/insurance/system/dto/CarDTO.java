package com.insurance.system.dto;

import lombok.Data;

@Data
public class CarDTO {
    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private String plateNumber;
    private String vin;
    private String imageUrl;
    private Long clientId;
}
