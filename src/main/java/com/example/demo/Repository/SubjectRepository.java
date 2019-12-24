package com.example.demo.Repository;

import com.example.demo.Model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Subject;
import com.example.demo.Model.Prof;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject findSubjectById(Long id);
    //Subject findSubjectBySubject(String Subject);

    @Query("SELECT s.prof FROM Subject s where s.id = :sbj" )
    Prof findProfsBySubject(@Param("sbj") Long sbj);

    @Query("SELECT s FROM Subject s where s.prof.id = -1" )
    List<Subject> findSubjectsNoProf();

    @Query("SELECT s FROM Subject s where s.prof.id = :id" )
    List<Subject> findSubjectsbyProf(@Param("id") Long id);

    @Query("SELECT s.id FROM Subject s where s.Subject = :name")
    Long findSubjectIdByName(@Param("name") String name);

}