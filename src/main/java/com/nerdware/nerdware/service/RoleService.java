package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Person;
import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.entity.RoleType;
import com.nerdware.nerdware.repository.PersonRepository;
import com.nerdware.nerdware.repository.RoleRepository;
import com.nerdware.nerdware.repository.RoleTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private RoleTypeRepository roleTypeRepository;


    public Role addRole(Role role) {

        if (personNotExists(role.getPerson().getId())) {
            role.setPerson(personRepository.save(role.getPerson()));
        }

        Person person = role.getPerson();
        RoleType roleType = role.getRoleType();

        if (role.getId() != null) {
            role = roleRepository.findOne(role.getId());
            role.setRoleType(roleType);
            role.setPerson(person);
        }

        role.setRoleType(roleTypeRepository.findOne(role.getRoleType().getId()));

        return roleRepository.save(role);
    }

    public boolean personNotExists(Long id) {
        return id == null;
    }

    @Transactional
    public Integer removeRole(Long id) {
        return roleRepository.removeById(id);
    }



    public List<Role> getAllHairdressers() {
        return roleRepository.findAllHairdressers();
    }

    public List<Role> getAllClients() {
        return roleRepository.findAllClients();
    }

    public List<Role> getClientsByPartialName(String name) {
        return roleRepository.findClientsByPartialName(name);
    }
}
