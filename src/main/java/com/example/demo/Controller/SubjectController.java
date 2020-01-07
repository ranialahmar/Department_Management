package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Model.Prof;
import com.example.demo.Model.Subject;
import com.example.demo.Repository.ProfRepository;
import com.example.demo.Repository.SubjectRepository;
import java.util.List;
import java.util.Iterator;

@RestController
@RequestMapping(path="/")
@CrossOrigin(value = {"*"},allowCredentials="true",allowedHeaders = {"*"},exposedHeaders = {"Content-Disposition"})
public class SubjectController {

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ProfRepository profRepository;


    @GetMapping(path="/subjects")
    public @ResponseBody List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @GetMapping(path="/subjectsNoProf")
    public @ResponseBody List<Subject> getSubjectsNoProf () {
        return subjectRepository.findSubjectsNoProf();
    }

    @GetMapping(path="/subject/{prof_id}")
    public @ResponseBody List<Subject> getSubjectsbyprof (@PathVariable Long prof_id) {
        return subjectRepository.findSubjectsbyProf(prof_id);
    }

    @GetMapping(path="/subjectProf/{sbj_id}")
    public @ResponseBody Prof getSubjuctProf (@PathVariable Long sbj_id) {
        return subjectRepository.findProfsBySubject(sbj_id);
    }
    @GetMapping(path="/subjectidbyname/{name}")
    public @ResponseBody Long getSubjectsbyname (@PathVariable String name) {
        return subjectRepository.findSubjectIdByName(name);
    }
    @GetMapping(path="/subjectbyid/{id}")
    public @ResponseBody Subject getSubjectbyidd (@PathVariable Long id) {
        return subjectRepository.findSubjectById(id);
    }





    @RequestMapping(value = "/subjectadd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Subject> AddSubject(@RequestBody Subject newsubject) {
        Prof prof = new Prof();
        prof.setId(-1);
        newsubject.setProf(prof);

        subjectRepository.save(newsubject);

        return subjectRepository.findAll();

    }



    @DeleteMapping("/subjectdel/{subj_id}")
    public @ResponseBody List<Subject> deleteSubject(@PathVariable Long sbj_id){
        Subject sbj = subjectRepository.findSubjectById(sbj_id);
        subjectRepository.delete(sbj);
        return subjectRepository.findAll();
    }





    @RequestMapping(value = "/subjectUpd/{sbj_id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)

    public  @ResponseBody Subject updateSubject( @PathVariable Long sbj_id, @RequestBody Subject newSbj) {

        Subject sbj = subjectRepository.findSubjectById(sbj_id);
        sbj.setSubject(newSbj.getSubject());
        sbj.setProf(newSbj.getProf());

        subjectRepository.save(sbj);
        return subjectRepository.findSubjectById(sbj_id);
    }

    @PutMapping(path = "/subjectUpdProf/{sbj_id}/{firstName}")
    public  @ResponseBody Subject updateSubjectProf( @PathVariable Long sbj_id, @PathVariable String firstName) {

        Subject sbj = subjectRepository.findSubjectById(sbj_id);
        Long ii=profRepository.getProfByFirstName(firstName);
        System.out.println(ii);
        Prof prof= profRepository.findProfById(ii);
        sbj.setSubject(sbj.getSubject());
        sbj.setProf(prof);

        subjectRepository.save(sbj);
        return subjectRepository.findSubjectById(sbj_id);
    }

    @PutMapping(path="/subjectUpdProfNo/{sbj_id}")
    public  @ResponseBody List<Prof> updateSubjectProfNo( @PathVariable Long sbj_id) {

        Prof prof = new Prof();
        prof.setId(-1);
        Subject sbj = subjectRepository.findSubjectById(sbj_id);
        sbj.setProf(prof);

        subjectRepository.save(sbj);
        return profRepository.findAll();
    }

     /*@RequestMapping(value = "/subjecUpd/{sbj_id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public  @ResponseBody Subject updateSubj( @PathVariable Long sbj_id, @RequestBody Prof prof) {

        Subject sbj = subjectRepository.findSubjectById(sbj_id);
        sbj.setId(sbj_id);
        sbj.setProf(prof.getId());


        subjectRepository.save(sbj);
        return subjectRepository.findSubjectById(sbj_id);
    }

    @RequestMapping(value = "/subjectUpd/{sbj_id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public  @ResponseBody Subject updateSubject( @PathVariable Long sbj_id, @RequestBody Subject newSbj) {

        Subject sbj = subjectRepository.findSubjectById(sbj_id);
        sbj.setSubject(newSbj.getSubject());
        sbj.setProf(newSbj.getProf());

        subjectRepository.save(sbj);
        return subjectRepository.findSubjectById(sbj_id);
    }*/

}