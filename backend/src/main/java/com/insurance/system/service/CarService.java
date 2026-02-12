package com.insurance.system.service;

import com.insurance.system.dto.CarDTO;
import com.insurance.system.entity.Car;
import com.insurance.system.entity.Client;
import com.insurance.system.repository.CarRepository;
import com.insurance.system.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ClientRepository clientRepository;

    public CarDTO createCar(CarDTO carDTO, Long userId) {
        Client client = clientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Car car = Car.builder()
                .brand(carDTO.getBrand())
                .model(carDTO.getModel())
                .year(carDTO.getYear())
                .plateNumber(carDTO.getPlateNumber())
                .vin(carDTO.getVin())
                .imageUrl(carDTO.getImageUrl())
                .client(client)
                .build();

        Car savedCar = carRepository.save(car);
        return mapToDTO(savedCar);
    }

    public List<CarDTO> getCarsByClient(Long userId) {
        Client client = clientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        
        return carRepository.findByClientId(client.getId()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CarDTO updateCar(Long id, CarDTO carDTO) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        
        car.setBrand(carDTO.getBrand());
        car.setModel(carDTO.getModel());
        car.setYear(carDTO.getYear());
        car.setPlateNumber(carDTO.getPlateNumber());
        car.setVin(carDTO.getVin());
        car.setImageUrl(carDTO.getImageUrl());
        
        return mapToDTO(carRepository.save(car));
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
    
    // Add missing delete method for ClientController if needed via user ID (not common logic, usually ID is enough)
    // But keeping it simple.

    private CarDTO mapToDTO(Car car) {
        CarDTO dto = new CarDTO();
        dto.setId(car.getId());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setYear(car.getYear());
        dto.setPlateNumber(car.getPlateNumber());
        dto.setImageUrl(car.getImageUrl());
        dto.setVin(car.getVin());
        dto.setClientId(car.getClient().getId());
        return dto;
    }
}
