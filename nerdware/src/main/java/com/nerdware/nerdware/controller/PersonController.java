package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Person;
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

    public Person createNewPerson() {
        return null;
    }
}
