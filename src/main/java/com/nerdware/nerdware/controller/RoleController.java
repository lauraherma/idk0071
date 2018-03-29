package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class RoleController {

    private RoleService roleService;

    public RoleController(RoleService roleService) {this.roleService=roleService;}

    @GetMapping(value = "/roles/client/{firstName}&{lastName}", consumes = "application/json")
    public Role findClientByName(@PathVariable("firstName") String firstName,
                                       @PathVariable("lastName") String lastName) {
        return roleService.getClientByName(firstName, lastName);
    }
}
