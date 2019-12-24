package com.example.demo.Model;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity
@Data
@Getter
@Setter
public class Stuff implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    private long Cin;
    private String FirstName;
    private String LastName;
    private String Address;
    private long Phone;
    private Date BirthD;
    private String Position;

    public Stuff(){}


}
