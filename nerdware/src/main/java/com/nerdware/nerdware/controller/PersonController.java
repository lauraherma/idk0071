package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @GetMapping("/")
    public List<String> personList() {
        return Arrays.asList("Triinu", "Laura");
    }

    @RequestMapping(value="/create/{name}", method= RequestMethod.GET)
    @ResponseBody
    public void createNewPerson(@PathVariable String firstName, @PathVariable String lastName, @PathVariable String phone,
                                  @PathVariable String email, @PathVariable LocalDate dateOfBirth) {
        Person person = new Person();
        person.setFirstName(firstName);
        person.setLastName(lastName);
        person.setDateOfBirth(dateOfBirth);
        person.setEmail(email);
        person.setPhone(phone);
        person = personRepository.save(person);
    }

    public void assignRoleToPerson(Long personId, Long roleId) {
        Person person = personRepository.findOne(personId);
        Role role = new Role();
        role.setPerson(person);
        //role.setRoleType(roleId);
    }

    public List<Person> findAllHairdressers() {
        return personRepository.findPersonByRole(1L);
    }

}
