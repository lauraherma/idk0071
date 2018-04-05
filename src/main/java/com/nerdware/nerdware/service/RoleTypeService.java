package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.RoleType;
import com.nerdware.nerdware.repository.RoleTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleTypeService {

    private RoleTypeRepository roleTypeRepository;

    public RoleTypeService(RoleTypeRepository roleTypeRepository) {
        this.roleTypeRepository = roleTypeRepository;
    }

    public RoleType getRoleTypeByName(String name) {
        return roleTypeRepository.findRoleTypeByName(name);
    }
}
