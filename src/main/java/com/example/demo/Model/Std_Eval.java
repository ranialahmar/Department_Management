package com.example.demo.Model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


import java.io.Serializable;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class Std_Eval implements Serializable {

    private Long id;
    //private Long idSub;
    private String firstName;
    private String lastName;
    private long NbAbs;
    private float NoteDS;
    private float NoteExam;
    private float Moy;

    public Std_Eval(Long id,String firstName, String lastName,long NbAbs,float NoteDS,float NoteExam,float Moy){
        this.id=id;
        //this.idSub=idSub;
        this.firstName=firstName;
        this.lastName=lastName;
        this.NbAbs=NbAbs;
        this.NoteDS=NoteDS;
        this.NoteExam=NoteExam;
        this.Moy=Moy;
    }
}
