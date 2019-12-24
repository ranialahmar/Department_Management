package com.example.demo.Repository;


import com.example.demo.Model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Model.Sub_Grp;
import com.example.demo.Model.Sub_GrpId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Sub_GrpRepository extends JpaRepository<Sub_Grp, Sub_GrpId> {

    @Query("SELECT s.Sub_GrpId.subject FROM Sub_Grp s where s.Sub_GrpId.group.id = :id_grp")
    List<Subject> findSubjByGroup(@Param("id_grp") Long id_grp);


}