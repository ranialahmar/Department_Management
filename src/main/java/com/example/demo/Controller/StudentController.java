package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import java.util.List;

import com.example.demo.Repository.GroupRepository;
import com.example.demo.Repository.StudentRepository;
import com.example.demo.Repository.Sub_GrpRepository;
import com.example.demo.Repository.EvaluationRepository;
import com.example.demo.Model.Student;
import com.example.demo.Model.Group;
import com.example.demo.Model.*;


import java.util.Iterator;

@RestController
@RequestMapping(path="/")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private Sub_GrpRepository sub_grpRepository;
    @Autowired
    private EvaluationRepository evaluationRepository;


    @GetMapping(path="/students")
    public @ResponseBody List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping(path="/onestudent/{student_id}")
    public @ResponseBody
    Student getOneStudent(@PathVariable Long student_id) {
        return studentRepository.findStudentById(student_id);
    }


    @GetMapping(path="/studentsbygrp/{grp}")
    public @ResponseBody List<Student> getStudentsbyGrp(@PathVariable Long grp) {
        return studentRepository.findStudentByGroup(grp);
    }



   /* @RequestMapping(value = "/studentadd/{group_id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Student> AddStudent( @RequestBody Student newstudent , @PathVariable  Long group_id) {
        Group grp=groupRepository.getGroupById(group_id);
        newstudent.setGroup(grp);
            studentRepository.save(newstudent);
            return studentRepository.findAll();


    }*/
    @RequestMapping(value = "/studentadd/{group_id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Student> AddStudent( @RequestBody Student newstudent , @PathVariable  Long group_id) {
        Group grp=groupRepository.getGroupById(group_id);
        newstudent.setGroup(grp);
        studentRepository.save(newstudent);
        Long id = newstudent.getId();


        List<Subject> subjgrp = sub_grpRepository.findSubjByGroup(group_id);
        for (Subject std:subjgrp
        ) {
            EvaluationId idd = new EvaluationId(newstudent,std);
            Evaluation eval = new Evaluation(idd);
            eval.setMoy(0);
            eval.setNoteExam(0);
            eval.setNbAbs(0);
            eval.setNoteDS(0);
            evaluationRepository.save(eval);
        }
        List<Student> stdlist=studentRepository.findStudentByGroup(group_id);

        return stdlist;


    }

    @DeleteMapping("/studentdel/{student_id}")
    public @ResponseBody List<Student> deleteStudent(@PathVariable Long student_id){
        Student student = studentRepository.findStudentById(student_id);
        studentRepository.delete(student);
        return studentRepository.findAll();
    }

    @RequestMapping(value = "/studentUpd/{student_id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public  @ResponseBody Student updateStudent( @PathVariable Long student_id, @RequestBody Student newStudent) {

        Student student = studentRepository.findStudentById(student_id);
        student.setAddress(newStudent.getAddress());
        student.setBirthD(newStudent.getBirthD());
        student.setCin(newStudent.getCin());
        student.setFirstName(newStudent.getFirstName());
        student.setLastName(newStudent.getLastName());
        student.setPhone(newStudent.getPhone());

        Group grp = groupRepository.getGroupById(newStudent.getGroup().getId());
        if ( grp != null) {
            student.setGroup(newStudent.getGroup());
        }
        else return null;
        studentRepository.save(student);
        return studentRepository.findStudentById(student_id);
    }
}
