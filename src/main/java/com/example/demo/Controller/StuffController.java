package com.example.demo.Controller;


import com.example.demo.Repository.StuffRepository;
import com.example.demo.Model.Stuff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/")

public class StuffController {
    @Autowired
    private StuffRepository stuffRepository;

    @GetMapping(path = "/stuffs")
    public @ResponseBody
    List<Stuff> getAllStuff() {
        return stuffRepository.findAll();
    }

    @GetMapping(path = "/onestuff/{stuff_id}")
    public @ResponseBody
    Stuff getOneStuff(@PathVariable Long stuff_id) {
        return stuffRepository.findStuffById(stuff_id);
    }

    @GetMapping(path = "/stuffsPos/{stuff_pos}")
    public @ResponseBody
    List<Stuff> getStuffsbyPosition(@PathVariable String stuff_pos) {
        return stuffRepository.findStuffByPosition(stuff_pos);
    }

    @RequestMapping(value = "/stuffadd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Stuff> AddStuff(@RequestBody Stuff stuff) {

        stuffRepository.save(stuff);
        return stuffRepository.findAll();
    }

    @DeleteMapping("/stuff/{stuff_id}")
    public @ResponseBody
    List<Stuff> deleteStuff(@PathVariable Long stuff_id) {
        Stuff stuff = stuffRepository.findStuffById(stuff_id);
        stuffRepository.delete(stuff);
        return stuffRepository.findAll();
    }


    @RequestMapping(value = "/stuffUpd/{stuff_id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)

    public @ResponseBody
    Stuff updateStuff(@PathVariable Long stuff_id, @RequestBody Stuff newStuff) {

        Stuff stuff = stuffRepository.findStuffById(stuff_id);
        stuff.setAddress(newStuff.getAddress());
        stuff.setBirthD(newStuff.getBirthD());
        stuff.setCin(newStuff.getCin());
        stuff.setFirstName(newStuff.getFirstName());
        stuff.setLastName(newStuff.getLastName());
        stuff.setPhone(newStuff.getPhone());
        stuff.setPosition(newStuff.getPosition());
        stuffRepository.save(stuff);
        //return "index";
        return stuffRepository.findStuffById(stuff_id);
    }

}