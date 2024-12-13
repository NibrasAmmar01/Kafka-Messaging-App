package com.messaging_app.messaging_app.controller;
import com.messaging_app.messaging_app.entity.User;
import com.messaging_app.messaging_app.components.JwtUtils;
import com.messaging_app.messaging_app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtil;

    public AuthController(UserService userService, JwtUtils jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user.getUsername(), user.getPassword());
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User authenticatedUser = userService.authenticate(user.getUsername(), user.getPassword());
        String token = jwtUtil.generateToken(authenticatedUser);
        return ResponseEntity.ok(token);
    }
}
