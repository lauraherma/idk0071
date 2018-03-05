package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private PersonRepository personRepository;
    private Long id = 2L;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person addPerson(Person person) {
        // siia kõik setterid person.set..

        /*person.setId(id++);
        person.setFirstName(person.getFirstName());
        person.setLastName(person.getLastName());
        person.setDateOfBirth(person.getDateOfBirth());
        person.setEmail(person.getEmail());
        person.setPhone(person.getPhone());*/

        return personRepository.save(person);
    }

    public List<Person> getAllPersons() {
       return personRepository.findAll();
    }

    public Person getPersonById(long id) {
        return personRepository.findOne(id);
    }
}
