package com.example.demo.Model;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.*;


import javax.persistence.*;
import java.io.Serializable;
import java.util.*;


@Entity
@Data
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Prof implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long Cin;
    private String FirstName;
    private String LastName;
    private Long Phone;
    private String Address;
    private Date BirthD;



    @OneToMany(fetch = FetchType.LAZY,mappedBy = "prof", cascade = CascadeType.ALL)
    @JsonManagedReference(value="profref")
    private List<Subject> subject=new ArrayList<>();

    public Prof(){};

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCin() {
        return Cin;
    }

    public void setCin(long cin) {
        Cin = cin;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getAdress() {
        return Address;
    }

    public void setAdress(String adress) {
        Address = adress;
    }

    public long getPhone() {
        return Phone;
    }

    public void setPhone(long phone) {
        Phone = phone;
    }

    public Date getBirthD() {
        return BirthD;
    }

    public void setBirthD(Date birthD) {
        BirthD = birthD;
    }

    public List<Subject> getSubject() {
        return subject;
    }

    public void setSubject(List<Subject> subject) {
        this.subject = subject;
    }
}
