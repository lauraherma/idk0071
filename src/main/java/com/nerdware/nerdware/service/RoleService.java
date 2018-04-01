package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    RoleRepository roleRepository;

    public Role getClientByName(String firstName, String lastname) {
        return roleRepository.findClientByName(firstName, lastname);
    }
}
