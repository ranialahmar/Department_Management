import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './../welcome/welcome.css';


export default class Evaluation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            firstName: '',
            lastName: '',
            subj: '',
            editM:null,
            sub:[],
            ids:'',
            noteDS:'',
            noteExam:'',
            moy:'',
            group:'group',
            listEval:[],
            apiEval:[],
            editIndex: null,
            editP: null,
            redirect: false,
            students:[],
            sub_id:null,
            divsub: false,
            divTab:false,
            nb:null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubj = this.handleSubj.bind(this);
        this.updateDS = this.updateDS.bind(this)
        this.updateExam = this.updateExam.bind(this)



    }

    async componentDidMount() {
        try {
            axios.get('/evaluations').then((rep)=>{
                this.setState({apiEval:rep.data._embedded.evaluations})
                console.log(rep.data._embedded.evaluations)
            })


        } catch (error) {
            console.log(error);
        }
    }
    editStuff(index,id,noteDS,noteExam,moy){
       this.setState({noteDS : noteDS,noteExam:noteExam})
        this.setState(
            {
                editIndex : index,
                editM:index
            }
        )
    }

    updateNotes(index,id){
        const edI = this.state.editIndex;
        this.state.students[edI].noteDS=this.state.noteDS;
        this.state.students[edI].noteExam=this.state.noteExam;
        //this.state.students[edI].moy=this.state.moy;
        const ds=this.state.noteDS;
        console.log(ds);
        const exam=this.state.noteExam;
        axios.put('/evalUpdDsExam/'+id+'/'+this.state.sub_id+'/'+ds+'/'+exam
           )
            .then((response)=>{
                this.setState({
                    moy : response.data
                });
                this.state.students[edI].moy=response.data;
                this.setState({
                    editM:null,
                    editIndex : null
                });

            })

    }

    updateDS(e){

        if( e.target.value !== this.state.noteDS){
            this.setState({
                noteDS : e.target.value
            })}
    }
    /*updateDS(e){

        if( e.target.value !== this.state.Moy){
            this.setState({
                moy : e.target.value
            })}
    }*/
    updateExam(e){
        if( e.target.value !== this.state.noteExam){
            this.setState({
                noteExam : e.target.value
            })}
    }

    handleChange(e){
       console.log(e.target.value)
        axios.get('/group/'+ e.target.value)
            .then((re)=>{
                console.log(re.data);
                this.setState({idg:re.data});
                axios.get('/sub_grp/'+ re.data)
                    .then((rep)=>{
                        this.setState({sub:rep.data});
                        this.setState({divsub:true});


                    })
            })
    }
    handleSubj(e){
        //const sub_id=rep.data;
        axios.get('/subjectidbyname/'+ e.target.value).then((r)=>{
            console.log(r.data);
            const sub_id=r.data;
            this.setState({sub_id:r.data})
            const grp_id=this.state.idg;
            axios.get('/eval/'+grp_id+'/'+sub_id)
                .then((response)=>{
                    console.log(response.data);
                    this.setState({students:response.data});
                            this.setState({divTab:true});
                        })
                })
       


    }
    incrementer(index,id,NbAbs){
        console.log(this.state.sub_id)
        axios.put('/evalUpdAbs/'+id+'/'+this.state.sub_id).then((res)=>{
            console.log(res.data);
            this.setState({nb:res.data,editP:index});

        })


    }
    canceleditEval(){
        this.setState({
            editIndex : null,
            editM:null
        })
    }

    render(){
        const styles = {
            tab2: {
                cursor: 'pointer',
                color:'black',
                height:'100%'
            }

        }
        const { divsub,sub ,divTab,students}=this.state

        return(
            <div>
                <div>
                    <form>
                        <h1>Choose the Group</h1>
                        <select  className="button4" onChange={this.handleChange}>
                            <option disabled>Groups</option>
                            {this.props.groups.map((x,index)=>
                                <option key={x.id}>{x.nameG}</option>
                            )}
                        </select>
                        { divsub==true &&
                            <div>
                        <h1>Choose the Subject</h1>
                        <select value={"Subjects"} className="button5" onChange={this.handleSubj}>
                            <option disabled>Subjects</option>
                            {sub.map((x,index)=>
                                <option key={x.id}>{x.subject}</option>
                            )}
                        </select>
                            </div>}
                    </form>
                    
                </div>
                {
                    divTab ==true &&
                <Table responsive striped bordered hover size="sm">
                    <thead style={styles.tab2}>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DS mark</th>
                        <th>Exam Mark</th>
                        <th>average</th>
                        <th>number of absences</th>
                        <th>Absence</th>
                        <th>Edit</th>

                    </tr>
                    </thead>
                    <tbody>
                    {students.map((value,index)=> {
                            return ( this.state.editIndex !== index ?
                                <tr key={value.id}>
                                    <th scope="row">{index+1}</th>
                                    <td id={index+2}>{value.firstName}</td>
                                    <td id={index+3}>{value.lastName}</td>
                                    <td id={index+4}>{value.noteDS}</td>
                                    <td id={index+5}>{value.noteExam}</td>
                                    { this.state.editM !==index ?
                                    <td id={index+6}>{value.moy}</td>:
                                        <td id={index+6}>{this.state.moy}</td>}
                                    { this.state.editP !==index ?
                                    <td id={index+7}>{value.nbAbs}</td> :
                                        <td id={index+8} >{this.state.nb}</td> }
                                    <td id={index+9} className="centerAll" >
                                        <Fab width="5%" color="primary" aria-label="add">
                                            <AddIcon onClick={()=>{
                                                this.incrementer(index,value.id,value.nbAbs)
                                            }} />
                                        </Fab>
                                       </td>
                                    <td  id={index+10}className="centerAll" ><button onClick={()=>{
                                        this.editStuff(index,value.id,value.noteDS,value.noteExam,value.moy)
                                    }} className="btn btn-primary">Edit</button></td>

                                </tr>
                             :<tr>
                                        <th scope="row" id={index+1}>{index+1}</th>
                                        <td id={index+2+'edit'}>{value.firstName}</td>
                                        <td id={index+3+'edit'}>{value.lastName}</td>
                                <td className="centerAll" id={index+4+'edit'}><input type="text" defaultValue={value.noteDS} onChange={this.updateDS} /></td>
                                <td className="centerAll" id={index+5+'edit'}><input type="text" defaultValue={value.noteExam} onChange={this.updateExam} /></td>
                                        <td id={index+6+'edit'}>{value.moy}</td>
                                        { this.state.editP !==index ?
                                            <td id={index+7+'edit'}>{value.nbAbs}</td> :
                                            <td id={index+8+'edit'} >{this.state.nb}</td> }
                                            <td id={index+9+'edit'} className="centerAll" ><button onClick={()=>{
                                            this.incrementer(index,value.id,value.nbAbs)
                                        }} className="btn btn-danger">absent</button></td>

                                        <td className="centerAll" id={index+10+'edit'}><button onClick={()=>{
                                            this.canceleditEval()
                                        }} className="btn btn-primary">Cancel</button></td>
                                        <td className="centerAll" id={index+11+'edit'}><button onClick={()=>{
                                            this.updateNotes(index,value.id,value.noteDS,value.noteExam)
                                        }} className="btn btn-info">Update</button></td>

                             </tr>
                                    )})}





                    </tbody>
                </Table>}
            </div>
        )
    }
}
