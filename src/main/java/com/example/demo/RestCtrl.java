package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class RestCtrl {

    @GetMapping("/hello")
    public ResponseEntity<String> hello(@RequestParam(defaultValue = "User") String name) {
        return ResponseEntity.ok().body(String.format("Hallo %s", name));
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<String>> getUsers() {
        List<String> users = Arrays.asList("Max", "John");
        return ResponseEntity.ok().body(users);
    }
}
