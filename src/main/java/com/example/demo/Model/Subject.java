package com.example.demo.Model;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity
@Data
@Getter
@Setter
public class Subject implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String Subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prof_id", nullable =false)
    @JsonBackReference(value="profref")
    private Prof prof;




    public Subject(){};


}
