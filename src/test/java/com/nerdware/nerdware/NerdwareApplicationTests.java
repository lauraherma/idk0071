package com.nerdware.nerdware;

import com.nerdware.nerdware.controller.RoleController;
import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.entity.RoleType;
import com.nerdware.nerdware.entity.Work;
import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.repository.*;
import com.nerdware.nerdware.service.AppointmentService;
import com.nerdware.nerdware.service.RoleService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertEquals;
import static org.hamcrest.Matchers.contains;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
		DirtiesContextTestExecutionListener.class,
		TransactionalTestExecutionListener.class })
public class NerdwareApplicationTests {

	private AppointmentRepository appointmentRepository;
	private AppointmentService appointmentService;
	private Appointment appointment;
	private Work work;
	private WorkType workType;
	private RoleService roleService;
	private Role role;
	private Person person;
	private RoleType roleType;


	@Before
	public void setup() {
		roleService = new RoleService();
		appointmentService = new AppointmentService(appointmentRepository);

		role = new Role();
		person = new Person();
		roleType = new RoleType();

		role.setPerson(person);
		role.setRoleType(roleType);

		appointment = new Appointment();
		work = new Work();
		workType = new WorkType();

		work.setWorkTypes(new ArrayList<>(Collections.singletonList(workType)));
		appointment.setWork(work);
	}

	@Test
	public void testPersonDoesNotExist() {
		role.getPerson().setId(null);
		Long id = role.getPerson().getId();

		assertEquals(false, !roleService.personNotExists(id));
	}

	@Test
	public void testPersonDoesExist() {
		role.getPerson().setId(234L);
		Long id = role.getPerson().getId();

		assertEquals(true, !roleService.personNotExists(id));
	}

	@Test
	public void testWorkTypeDoesNotExist() {
		appointment.getWork().getWorkTypes().get(0).setId(null);
		Long id = appointment.getWork().getWorkTypes().get(0).getId();

		assertEquals(false, !appointmentService.appointmentNotExists(id));
	}

	@Test
	public void testWorkTypeDoesExist() {
		appointment.getWork().getWorkTypes().get(0).setId(11L);
		Long id = appointment.getWork().getWorkTypes().get(0).getId();

		assertEquals(true, !appointmentService.appointmentNotExists(id));
	}

}
