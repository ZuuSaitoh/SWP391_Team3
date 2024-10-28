package com.devteria.hello_world_spring_boot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloWorldController {
    @GetMapping("/hello")
    String hello(){
        return "Hello spring boot 3 I'm good :)))";

        //hello phat
        //HELLO MANH dep trai
        
    }
}
