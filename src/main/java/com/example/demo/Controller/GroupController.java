package com.example.demo.Controller;

import com.example.demo.Model.Group;
import com.example.demo.Model.Student;
import com.example.demo.Repository.GroupRepository;
import java.util.*;
import org.springframework.http.ResponseEntity;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/")
//@CrossOrigin(value = {"*"},allowCredentials="true",allowedHeaders = {"*"},exposedHeaders = {"Content-Disposition"})
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @GetMapping(path="/groups")
    public @ResponseBody List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @GetMapping(path="/groups/{name}")
    public ResponseEntity<Optional<Group>> getAllGroupsbyName( @PathVariable String name) {
        List<Group> g=groupRepository.findAll();
        Optional<Group> p = g.stream().filter(grp ->name.equals(grp.getNameG())).findAny();
       // Optional<Student> s = p.stream().filter(prod -> prod.getCategory().getId() == Cat_id).collect(Collectors.toList());
        return ResponseEntity.ok()
                .body(p);
    }


    @GetMapping(path="/group/{name}")
    public @ResponseBody Long getGroup(@PathVariable String name) {
        Long idg= groupRepository.getGroupByNameG(name);
        return idg;
    }


   /*@PostMapping(value = "/group")
    public void AddGroup(@RequestBody final Group group) {

            groupRepository.save(group);
           //return "group added successfully ";
    }*/

    @RequestMapping(value = "/groupadd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Group> AddGroup( @RequestParam String name) {

        Group group = new Group(name);
        //group.setNameG(name);

        groupRepository.save(group);
        return groupRepository.findAll();
    }


}