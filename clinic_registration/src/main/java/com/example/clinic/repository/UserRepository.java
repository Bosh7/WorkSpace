package com.example.clinic.repository;

import com.example.clinic.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.clinic.model.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
