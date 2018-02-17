package com.nerdware.nerdware.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class PersonController {

    @GetMapping("/")
    public List<String> personList() {
        return Arrays.asList("Triinu", "Laura");
    }
}
