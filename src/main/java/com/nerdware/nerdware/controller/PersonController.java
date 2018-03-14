package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.service.PersonService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class PersonController {

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping(value = "/person/add", consumes = "application/json")
    public Person addPerson(@RequestBody Person person) {
        return personService.addPerson(person);
    }

    @GetMapping(value = "/person/{id}")
    public Person getPersonById(@PathVariable("id") long userId) {
        return personService.getPersonById(userId);
    }

    @GetMapping(value = "/persons/hairdressers")
    public List<Person> findAllHairdressers() {
        return personService.getAllHairdressers();
    }

    @GetMapping(value = "/persons/clients")
    public List<Person> findAllClients() {
        return personService.getAllClients();
    }


}
