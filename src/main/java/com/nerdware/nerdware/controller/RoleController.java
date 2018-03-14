package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService=roleService;
    }

    @GetMapping(value = "/roles/client/{firstName}/{lastName}")
    public Role findClientByName(@PathVariable("firstName") String firstName,
                                       @PathVariable("lastName") String lastName) {
        return roleService.getClientByName(firstName, lastName);
    }

    @GetMapping(value = "/roles/clients/{name}")
    public List<Role> findAllClientsByName(@PathVariable("name") String name) {
        return roleService.getClientsByPartialName(name);
    }
}
