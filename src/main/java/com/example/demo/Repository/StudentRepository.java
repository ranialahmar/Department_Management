package com.example.demo.Repository;



import com.example.demo.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository  extends JpaRepository<Student, Long>{
    Student findStudentById(Long id);
    @Query("SELECT s FROM Student s where s.group.id = :grp")
    List<Student> findStudentByGroup(@Param("grp") Long grp);
}
