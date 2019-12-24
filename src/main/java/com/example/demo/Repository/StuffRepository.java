package com.example.demo.Repository;


import com.example.demo.Model.Stuff;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StuffRepository extends JpaRepository<Stuff, Long> {

    Stuff findStuffById(Long id);
    @Query("SELECT s FROM Stuff s where s.Position = :pos")
    List<Stuff> findStuffByPosition(@Param("pos") String pos);

}