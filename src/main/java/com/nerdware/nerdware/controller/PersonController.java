package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.repository.PersonRepository;
import com.nerdware.nerdware.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
public class PersonController {

    /*@Autowired
    PersonRepository personRepository;*/

    private PersonService personService;


    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(value = "/persons/add", method = RequestMethod.POST, consumes = "application/json")
    public Person addHairdresser(@RequestBody Person person) {
        return personService.addPerson(person);
    }

    @RequestMapping(value = "/persons/{id}", method=RequestMethod.GET)
    public Person getHairdresser(@PathVariable("id") long userId) {
        return personService.getPersonById(userId);
    }

    @RequestMapping(value = "/persons", method = RequestMethod.GET)
    public List<Person> findAllHairdressers() {
        return personService.getAllPersons();
    }

    /*@GetMapping("/")
    public List<String> personList() {
        return Arrays.asList("Triinu", "Laura");
    }*/

    /*
    @RequestMapping(value="/create/{name}", method= RequestMethod.GET)
    @ResponseBody
    public void createNewPerson(@PathVariable String firstName, @PathVariable String lastName, @PathVariable String phone,
                                @PathVariable String email, @PathVariable LocalDate dateOfBirth) {
        /*Person person = new Person();
        person.setFirstName(firstName);
        person.setLastName(lastName);
        person.setDateOfBirth(dateOfBirth);
        person.setEmail(email);
        person.setPhone(phone);
        person = personRepository.save(person);
    }*/

    /*
    public void assignRoleToPerson(Long personId, Long roleId) {
        Person person = personRepository.findOne(personId);
        Role role = new Role();
        role.setPerson(person);
        //role.setRoleType(roleId);
    }*/
}
