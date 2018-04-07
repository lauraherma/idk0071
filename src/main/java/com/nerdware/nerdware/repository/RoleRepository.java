package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {


    @Query("select r from Role r where LOWER(CONCAT(r.person.firstName, ' ', r.person.lastName)) LIKE lower(concat('%', :fullName, '%'))")
    List<Role> findClientsByPartialName(@Param("fullName") String fullName);

    @Query("select r from Role r where r.roleType = 3")
    List<Role> findAllHairdressers();

    @Query("select r from Role r where r.roleType = 2")
    List<Role> findAllClients();

}
