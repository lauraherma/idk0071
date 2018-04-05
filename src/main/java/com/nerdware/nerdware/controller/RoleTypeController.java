package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.RoleType;
import com.nerdware.nerdware.service.RoleTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RoleTypeController {

    private RoleTypeService roleTypeService;

    public RoleTypeController(RoleTypeService roleTypeService) {
        this.roleTypeService = roleTypeService;
    }

    @GetMapping(value = "/role-type/{name}")
    public RoleType getRoleByName(@PathVariable("name") String name) {
        System.out.println(roleTypeService.getRoleTypeByName(name));
        return roleTypeService.getRoleTypeByName(name);
    }
}
