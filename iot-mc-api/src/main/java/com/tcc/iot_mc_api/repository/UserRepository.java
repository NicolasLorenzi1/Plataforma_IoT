package com.tcc.iot_mc_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.iot_mc_api.model.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
