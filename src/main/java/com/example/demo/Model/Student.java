package com.example.demo.Model;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;


@Entity
@Data
@Getter
@Setter
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long Cin;
    private String FirstName;
    private String LastName;
    private Long Phone;
    private String Address;
    private Date BirthD;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable =false)
    @JsonBackReference(value="groupref")
    //@JsonIgnore
    private Group group;




    public Student(){}
    public Student(Long id,String firstName,String lastName,String address ,Date birthD,Long cin , Long phone ,Long groupid){
        this.id=id;
        this.FirstName=firstName;
        this.LastName=lastName;
        this.Address=address;
        this.BirthD=birthD;
        this.Cin=cin;
        this.Phone=phone;

    }
    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }



}
