package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.service.PersonService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class PersonController {

    /*@Autowired
    PersonRepository personRepository;*/

    private PersonService personService;


    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping(value = "/persons/add", consumes = "application/json")
    public Person addHairdresser(@RequestBody Person person) {
        return personService.addPerson(person);
    }

    @GetMapping(value = "/persons/{id}")
    public Person getHairdresser(@PathVariable("id") long userId) {
        return personService.getPersonById(userId);
    }

    @GetMapping(value = "/persons")
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
