package com.example.demo.Model;


import com.example.demo.Model.Sub_GrpId;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Sub_Grp implements Serializable{
    @EmbeddedId
    private Sub_GrpId Sub_GrpId;

    public Sub_Grp(){}
    public Sub_Grp(Sub_GrpId id){
        this.setSub_GrpId(id);
    }

    public Sub_GrpId getSub_GrpId() {
        return Sub_GrpId;
    }

    public void setSub_GrpId(Sub_GrpId sub_GrpId) {
        Sub_GrpId = sub_GrpId;
    }
}