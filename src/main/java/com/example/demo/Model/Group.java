package com.example.demo.Model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@Getter
@Setter
public class Group implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    private String NameG;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "group", cascade = CascadeType.ALL)
    @JsonManagedReference(value="groupref")
    private List<Student> student=new ArrayList<>();

    public Group(){}
    public Group(String name){
        this.NameG=name;
    }

   public  String getNameG(){
        return NameG;
   }

}
