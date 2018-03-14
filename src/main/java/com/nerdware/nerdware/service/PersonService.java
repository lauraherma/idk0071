package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }


    public Person addPerson(Person person) {
        return personRepository.save(person);
    }

    public List<Person> getAllPersons() {
       return personRepository.findAll();
    }

    public List<Person> getAllHairdressers() { return personRepository.findAllHairdressers(); }

    public List<Person> getAllClients() { return personRepository.findAllClients(); }

    public Person getPersonById(long id) {
        return personRepository.findOne(id);
    }
}
