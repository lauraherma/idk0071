package com.nerdware.nerdware;

import com.nerdware.nerdware.controller.PersonController;
import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.repository.PersonRepository;
import com.nerdware.nerdware.service.PersonService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserResource REST controller.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NerdwareApplication.class)
public class UserResourceIntTest {

    private static final String DEFAULT_EMAIL = "";
    private static final String UPDATED_EMAIL = "email@gmail.com";

    private static final String DEFAULT_FIRSTNAME = "";
    private static final String UPDATED_FIRSTNAME = "FirstName";

    private static final String DEFAULT_LASTNAME = "";
    private static final String UPDATED_LASTNAME = "LastName";

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonService personService;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private EntityManager em;

    private MockMvc restUserMockMvc;

    private Person person;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PersonController userResource = new PersonController(personService);
        this.restUserMockMvc = MockMvcBuilders.standaloneSetup(userResource)
                .setCustomArgumentResolvers(pageableArgumentResolver)
                .build();
    }

    public static Person createEntity(EntityManager em) {
        Person person = new Person();
        person.setFirstName(DEFAULT_FIRSTNAME);
        person.setLastName(DEFAULT_LASTNAME);
        person.setEmail(DEFAULT_EMAIL);
        return person;
    }

    @Test
    @Transactional
    public void createUser() {
        int databaseSizeBeforeCreate = personRepository.findAll().size();
        Person person = new Person();
        person.setFirstName("FirstName");
        person.setLastName("LastName");
        person.setEmail("email@gmail.com");

        List<Person> userList = personRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void createUserWithExistingId(){
        int databaseSizeBeforeCreate = personRepository.findAll().size();
        Person person = new Person();
        person.setId(1L);
        person.setFirstName("FirstName");
        person.setLastName("LastName");
        person.setEmail("email@gmail.com");

        List<Person> userList = personRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getNonExistingUser() throws Exception {
        restUserMockMvc.perform(get("/person"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUserFromId() {
        assertThat(personService.getPersonById(1).getId()).isEqualTo(1);
    }

}
