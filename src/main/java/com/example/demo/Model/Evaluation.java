package com.example.demo.Model;





import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

import com.example.demo.Model.EvaluationId;


@Entity
@Data
@Getter
@Setter
public class Evaluation implements Serializable {

    @EmbeddedId
    private EvaluationId EvaluationId;

    private long NbAbs;
    private float NoteDS;
    private float NoteExam;
    private float Moy;
    public Evaluation(){}

    public Evaluation(EvaluationId id){
        this.setEvaluationId(id);
    }
    public com.example.demo.Model.EvaluationId getEvaluationId() {
        return EvaluationId;
    }

    public void setEvaluationId(com.example.demo.Model.EvaluationId evaluationId) {
        EvaluationId = evaluationId;
    }
    /*public EvaluationId getEvaluationId() {
        return this.evaluation;
    }

    public void setEvaluationId(EvaluationId evaluationId) {
        this.evaluation = evaluationId;
    }*/

    public long getNbAbs() {
        return NbAbs;
    }

    public void setNbAbs(long nbAbs) {
        NbAbs = nbAbs;
    }

    public float getNoteDS() {
        return NoteDS;
    }

    public void setNoteDS(float noteDS) {
        NoteDS = noteDS;
    }

    public float getNoteExam() {
        return NoteExam;
    }

    public void setNoteExam(float noteExam) {
        NoteExam = noteExam;
    }

    public float getMoy() {
        return Moy;
    }

    public void setMoy(float moy) {
        Moy = moy;
    }
}