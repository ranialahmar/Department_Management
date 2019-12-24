package com.example.demo.Repository;

import com.example.demo.Model.Prof;
import com.example.demo.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfRepository extends JpaRepository<Prof, Long> {
    Prof findProfById(Long id);

    @Query("SELECT p.id FROM Prof p where p.FirstName = :firstname")
    Long getProfByFirstName(@Param("firstname")String firstname);


}
