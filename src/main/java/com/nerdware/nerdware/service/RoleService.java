package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role getClientByName(String firstName, String lastname) {
        return roleRepository.findClientByName(firstName, lastname);
    }

    public List<Role> getClientsByPartialName(String name) {
        return roleRepository.findClientsByPartialName(name);
    }
}
