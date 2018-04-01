package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    @Query("select r from Role r where r.person.firstName = :firstName and r.person.lastName = :lastName " +
            "and r.roleType = 2")
    Role findClientByName(String firstName, String lastName);

}
