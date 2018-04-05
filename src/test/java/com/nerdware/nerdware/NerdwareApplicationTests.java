package com.nerdware.nerdware;

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
