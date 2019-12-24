package com.example.demo.Repository;


import com.example.demo.Model.Subject;

import com.example.demo.Model.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Model.Group;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {

    Subject findSubjectById(Long id);

    @Query("SELECT s.prof FROM Subject s where s.id = :sbj" )
    Prof findProfsBySubject(@Param("sbj") Long sbj);

    @Query("SELECT s FROM Subject s where s.prof.id = -1" )
    List<Subject> findSubjectsNoProf();

    @Query("SELECT s FROM Subject s where s.prof.id = :id" )
    List<Subject> findSubjectsbyProf(@Param("id") Long id);

    @Query("SELECT s.id FROM Subject s where s.Subject = :name")
    Long findSubjectIdByName(@Param("name") String name);


    Group getGroupById(Long id);

    //Group getGroupsByNameG(String NameG);

    @Query("SELECT g.id FROM Group g where g.NameG = :name")
    Long getGroupByNameG(@Param("name") String name);

}
