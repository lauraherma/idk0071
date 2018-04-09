package com.nerdware.nerdware;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.entity.RoleType;
import com.nerdware.nerdware.service.RoleService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
		DirtiesContextTestExecutionListener.class,
		TransactionalTestExecutionListener.class })
public class NerdwareApplicationTests {

	private RoleService roleService;
	private Role role;
	private Person person;
	private RoleType roleType;

	@Before
	public void setup() {
		roleService = new RoleService();
		role = new Role();
		person = new Person();
		roleType = new RoleType();

		role.setPerson(person);
		role.setRoleType(roleType);
		}

	@Test
	public void testPersonDoesNotExist() {
		role.getPerson().setId(null);
		Long id = role.getPerson().getId();

		Assert.assertEquals(!roleService.personNotExists(id), null);
	}

	@Test
	public void contextLoads() {
	}

	@Test
	public void testFindClientByName() {

	}

	@Test
	public void editHairdresserData() {
	}

	@Test
	public void addHairdresserToCalendarView() {
	}

	@Test
	public void deleteHairdresserFromDatabase() {
	}

	@Test
	public void addClientToDatabase() {
	}

	@Test
	public void editClientData() {
	}

	@Test
	public void addClientToCalendarView() {
	}

	@Test
	public void deleteClientFromDatabase() {
	}

	@Test
	public void addAppointmentToDatabase() {
	}

	@Test
	public void editAppointmentData() {
	}

	@Test
	public void addAppointmentToCalendarView() {
	}

	@Test
	public void deleteAppointmentFromDatabase() {
	}

	@Test
	public void addNotificationToClientViaEmail() {
	}

	@Test
	public void viewCalendarView() {
	}

}
