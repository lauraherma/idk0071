package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.repository.PersonRepository;
import com.nerdware.nerdware.repository.RoleRepository;
import com.nerdware.nerdware.repository.RoleTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        if (role.getPerson().getId() == null) {
            role.setPerson(personRepository.save(role.getPerson()));
        }

        role.setRoleType(roleTypeRepository.findOne(role.getRoleType().getId()));

        return roleRepository.save(role);
    }


    public List<Role> getAllHairdressers() {
        return roleRepository.findAllHairdressers();
    }

    public List<Role> getClientsByPartialName(String name) {
        return roleRepository.findClientsByPartialName(name);
    }
}
