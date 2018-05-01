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
        /*
        restUserMockMvc.perform(post("/person")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managedUserVM)))
            .andExpect(status().isCreated());*/

        // Validate the User in the database
        List<Person> userList = personRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate + 1);
        Person testUser = userList.get(userList.size() - 1);
        assertThat(testUser.getFirstName()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testUser.getLastName()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
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
        /*
        restUserMockMvc.perform(post("/api/users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managedUserVM)))
            .andExpect(status().isBadRequest());*/

        List<Person> userList = personRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUsers() throws Exception {
        // Initialize the database
        personRepository.save(person);
        // Get all the users
        restUserMockMvc.perform(get("/api/person?sort=id,desc")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRSTNAME)))
                .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LASTNAME)))
                .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    public void getUser() throws Exception {
        // Initialize the database
        personRepository.save(person);
        // Get the user
        restUserMockMvc.perform(get("/person/{id}", person.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRSTNAME))
                .andExpect(jsonPath("$.lastName").value(DEFAULT_LASTNAME))
                .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
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
