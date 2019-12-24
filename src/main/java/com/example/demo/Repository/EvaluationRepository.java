package com.example.demo.Repository;



import com.example.demo.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Model.EvaluationId;
import com.example.demo.Model.Evaluation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, EvaluationId> {

    @Query("SELECT e FROM Evaluation e where e.EvaluationId.subject.id = :sbj_id and e.EvaluationId.student.group.id = :grp_id")
    List<Evaluation> findbySub_grp(@Param("grp_id") Long grp_id, @Param("sbj_id") Long sbj_id);

    @Query("SELECT e.EvaluationId.student FROM Evaluation e where e.EvaluationId.subject.id = :sbj_id and e.EvaluationId.student.group.id = :grp_id")
    List<Student> findbySub_grpStds(@Param("grp_id") Long grp_id, @Param("sbj_id") Long sbj_id);

    @Query("SELECT e FROM Evaluation e where e.EvaluationId.subject.id = :sbj_id and e.EvaluationId.student.id = :std_id")
    Evaluation findEvaluationByIds(@Param("std_id") Long std_id, @Param("sbj_id") Long sbj_id);

    @Query("SELECT e.EvaluationId.student.id FROM Evaluation e where e.EvaluationId.subject.id = :sbj_id and e.EvaluationId.student.group.id = :grp_id")
    Long findbySub_grpStd(@Param("grp_id") Long grp_id, @Param("sbj_id") Long sbj_id);




}