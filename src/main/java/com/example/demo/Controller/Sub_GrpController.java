package com.example.demo.Controller;

import com.example.demo.Model.*;
import com.example.demo.Repository.GroupRepository;
import com.example.demo.Repository.StuffRepository;
import com.example.demo.Repository.Sub_GrpRepository;
import com.example.demo.Repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/")
public class Sub_GrpController {

    @Autowired
    private Sub_GrpRepository sub_GrpRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private GroupRepository groupRepository;

    @RequestMapping(value = "/sub_grpadd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sub_Grp> AddSub_Grp(@RequestParam Long subj_id, @RequestParam Long grp_id) {
        Subject sbj = subjectRepository.findSubjectById(subj_id);
        Group grp = groupRepository.getGroupById(grp_id);
        Sub_GrpId id = new Sub_GrpId(grp,sbj);
        Sub_Grp sg = new Sub_Grp(id);
        sub_GrpRepository.save(sg);
        return sub_GrpRepository.findAll();
    }

    @GetMapping(path="/sub_grps")
    public @ResponseBody List<Sub_Grp> getAllSub_grps() {
        return sub_GrpRepository.findAll();
    }

    @GetMapping(path="/sub_grp/{id_grp}")
    public @ResponseBody List<Subject> getSubjectsByGroup(@PathVariable Long id_grp) {
        return sub_GrpRepository.findSubjByGroup(id_grp);
    }



}