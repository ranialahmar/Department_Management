package com.example.demo.Controller;


import com.example.demo.Model.*;
import com.example.demo.Repository.EvaluationRepository;
import com.example.demo.Repository.StudentRepository;
import com.example.demo.Repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/")
public class EvaluationController {
    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping(path="/Evaluations")
    public @ResponseBody List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    @GetMapping(path="/Evaluation/{grp_id}/{sbj_id}")
    public @ResponseBody List<Evaluation> getEvaluationBySub_Grp(@PathVariable long grp_id, @PathVariable long sbj_id) {

        return evaluationRepository.findbySub_grp(grp_id, sbj_id);
    }

    @GetMapping(path="/EvaluationStd/{std_id}/{sbj_id}")
    public @ResponseBody Evaluation getEvaluationByStd(@PathVariable long std_id, @PathVariable long sbj_id) {

        return evaluationRepository.findEvaluationByIds(std_id, sbj_id);
    }

    @GetMapping(path="/EvaluationStudent/{grp_id}/{sbj_id}")
    public @ResponseBody List<Student> getEvaluationBySub_GrpStudent(@PathVariable long grp_id, @PathVariable long sbj_id) {
        return evaluationRepository.findbySub_grpStds(grp_id, sbj_id);
    }

    @RequestMapping(value = "/evalUpdDsExam/{std_id}/{id_sbj}/{ds}/{exam}", method = RequestMethod.PUT)

    public  @ResponseBody float updateEvalnotes( @PathVariable long std_id, @PathVariable long id_sbj,@PathVariable float ds, @PathVariable float exam ) {

        Evaluation eval = evaluationRepository.findEvaluationByIds(std_id,id_sbj);
        eval.setNoteDS(ds);
        eval.setNoteExam(exam);

        evaluationRepository.save(eval);
        eval.setMoy((eval.getNoteDS()+eval.getNoteExam()*2)/3);
        evaluationRepository.save(eval);
        return eval.getMoy();
    }

    @RequestMapping(value = "/evalUpdMoy/{std_id}/id_sbj}", method = RequestMethod.PUT)

    public  @ResponseBody Evaluation updateEvalMoy( @PathVariable long std_id, @PathVariable long id_sbj,@RequestParam float moy ) {

        Evaluation eval = evaluationRepository.findEvaluationByIds(std_id,id_sbj);
        eval.setMoy(moy);

        evaluationRepository.save(eval);
        return evaluationRepository.findEvaluationByIds(std_id,id_sbj);
    }

    @RequestMapping(value = "/evalUpdAbs/{std_id}/{id_sbj}", method = RequestMethod.PUT)

    public  @ResponseBody long updateEvalAbs( @PathVariable long std_id, @PathVariable long id_sbj ) {

        Evaluation eval = evaluationRepository.findEvaluationByIds(std_id,id_sbj);
        eval.setNbAbs(eval.getNbAbs()+1);

        evaluationRepository.save(eval);
        return eval.getNbAbs();
    }


    @GetMapping(value="/eval/{grp_id}/{sbj_id}")
    public List<Std_Eval> getEval(@PathVariable Long grp_id, @PathVariable Long sbj_id){
        long id;
        String firstName;
         String lastName;
         long NbAbs;
        float NoteDS;
        float NoteExam;
        float Moy;
        List listfinal= new ArrayList();
        List<Student> listSTD=evaluationRepository.findbySub_grpStds(grp_id,sbj_id);
        for (Student std:listSTD
        ) {
            long ids=std.getId();
            Evaluation e=evaluationRepository.findEvaluationByIds(ids, sbj_id);
            id=ids;
            firstName=std.getFirstName();
            lastName=std.getLastName();
            NbAbs=e.getNbAbs();
            NoteDS=e.getNoteDS();
            NoteExam=e.getNoteExam();
            Moy=e.getMoy();
            System.out.print(Moy);
            System.out.print(firstName);
            System.out.print(lastName);
            System.out.print(NbAbs);
            System.out.print(NoteDS);
                System.out.print(NoteExam);
            Std_Eval cons=new Std_Eval(id,firstName,lastName,NbAbs,NoteDS,NoteExam,Moy);
            listfinal.add(cons);

        }
        return listfinal;

    }


    // we don't need this, because when you add a student it adds automatically
    @RequestMapping(value = "/evaladd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Evaluation> AddEval(@RequestParam Long subj_id, @RequestParam Long std_id) {
        Subject sbj = subjectRepository.findSubjectById(subj_id);
        Student std = studentRepository.findStudentById(std_id);
        EvaluationId id = new EvaluationId(std,sbj);
        Evaluation eval = new Evaluation(id);
        evaluationRepository.save(eval);
        return evaluationRepository.findAll();
    }





}