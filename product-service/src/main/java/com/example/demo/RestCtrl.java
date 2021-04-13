package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class RestCtrl {

    @GetMapping("/api/products/{id}")
    public ResponseEntity<String> getProduct(@PathVariable String id) {
        return ResponseEntity.ok().body(String.format("Requested Product %s", id));
    }

    @GetMapping("/api/products")
    public void getProducts() {

    }

    @GetMapping("/api/products/search")
    public void searchProduct() {

    }
}
