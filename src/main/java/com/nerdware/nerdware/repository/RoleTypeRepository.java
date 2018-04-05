package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.RoleType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleTypeRepository extends CrudRepository<RoleType, Long> {

    RoleType findRoleTypeByName(String name);
}
