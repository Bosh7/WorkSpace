package com.example.clinic.service.impl;

import com.example.clinic.mapper.UserMapper;
import com.example.clinic.model.dto.UserDTO;
import com.example.clinic.model.entity.User;
import com.example.clinic.repository.UserRepository;
import com.example.clinic.service.UserService;
import com.example.clinic.util.Hash;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // 檢查帳號是否已存在
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new RuntimeException("帳號已存在");
        }

        // 正確順序：先產生 salt，再用來加密密碼
        String salt = Hash.getSalt();
        String hashedPassword = Hash.getHash(userDTO.getPassword(), salt);

        User user = UserMapper.toEntity(userDTO);
        user.setPassword(hashedPassword); // 加密後密碼
        user.setSalt(salt);               // 對應的鹽值

        userRepository.save(user);
        return UserMapper.toDTO(user);
    }
}
