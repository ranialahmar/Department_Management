package com.example.demo.Controller;

import com.example.demo.Model.Group;
import com.example.demo.Model.Prof;
import com.example.demo.Model.Subject;
import com.example.demo.Repository.ProfRepository;
import com.example.demo.Repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(path="/")
public class ProfController {
    @Autowired
    private ProfRepository profRepository;

    @Autowired
    private SubjectRepository subjectRepository;


    @GetMapping(path="/profs")
    public @ResponseBody List<Prof> getAllProfs() {
        return profRepository.findAll();
    }

    @GetMapping(path="/oneprof/{prof_id}")
    public @ResponseBody
    Prof getOneProf (@PathVariable Long prof_id) {
        return profRepository.findProfById(prof_id);
    }

    @GetMapping(path="/prof/{firstname}")
    public @ResponseBody
    Long getProf (@PathVariable String firstname) {
        return profRepository.getProfByFirstName(firstname);
    }

    @GetMapping(path="/profsbysbj/{sbj}")
    public @ResponseBody Prof getProfsbySbj(@PathVariable Long sbj) {
        return subjectRepository.findProfsBySubject(sbj);
    }



    @RequestMapping(value = "/profadd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String AddProf(@RequestBody Prof newprof
                                            //, @PathVariable  Long subj_id
    ) {
       /* Subject sbj = subjectRepository.findSubjectById(subj_id);
        sbj.setProf(newprof);
        subjectRepository.save(sbj);*/
        profRepository.save(newprof);
        return newprof.getFirstName();

    }

    @DeleteMapping("/profdel/{prof_id}")
    public @ResponseBody List<Prof> deleteProf(@PathVariable Long prof_id){
        Prof prof = profRepository.findProfById(prof_id);
        profRepository.delete(prof);
        return profRepository.findAll();
    }

    @DeleteMapping("/profdell/{prof_id}")
    public @ResponseBody List<Prof> deleteProff(@PathVariable Long prof_id){
        Prof prof1 = profRepository.findProfById(prof_id);
        List<Subject> subjprof = subjectRepository.findSubjectsbyProf(prof_id);
        for (Iterator i = subjprof.iterator(); i.hasNext();) {
            Prof prof = new Prof();
            prof.setId(-1);
            Subject sbj = (Subject) i.next();
            sbj.setProf(prof);
            subjectRepository.save(sbj);
        }
        profRepository.delete(prof1);
        return profRepository.findAll();
    }

    @RequestMapping(value = "/profUpd/{prof_id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public  @ResponseBody Prof updateProf( @PathVariable Long prof_id, @RequestBody Prof newProf) {

        Prof prof = profRepository.findProfById(prof_id);
        prof.setAddress(newProf.getAddress());
        prof.setBirthD(newProf.getBirthD());
        prof.setCin(newProf.getCin());
        prof.setFirstName(newProf.getFirstName());
        prof.setLastName(newProf.getLastName());
        prof.setPhone(newProf.getPhone());

        profRepository.save(prof);
        return profRepository.findProfById(prof_id);
    }
}