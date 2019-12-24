
import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './prof.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FormProf from "/home/rania/soa_app/src/components/Prof/FormProf.js";

export default class Stuff extends Component
{
    constructor(props){
        super(props);
        this.state={
            profList : [],
            apiListt : [],
            subjects:[],
            length:null,
            profs: [],
            subjectt:[],
            address:'',
            firstName:'',
            lastName:'',
            birthD:'',
            phone:null,
            cin:'',
            subj:'',
            ids:'',
            editIndex:null,
            editP:null,
            redirect:false,
            root:false
        }
        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateCIN = this.updateCIN.bind(this)
        this.updatePhone = this.updatePhone.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.updateSubject = this.updateSubject.bind(this)

    }

    async componentDidMount() {
        try {

            console.log(this.props.id);
            console.log(this.props.sub);
            if(this.props.sub && this.props.id) {
                axios.put('/subjectUpdProf/' + this.props.sub + '/' + this.props.id)
                    .then((rep) => {
                        const sub = rep.data;
                        console.log(sub);
                    })
                const response = await axios.get('/profs')
                const profs= await response.data;
                this.setState({ profs });
                this.setState({ profList: profs });
                this.setState({ length: profs.length });
                console.log(profs);
                console.log(profs.length);


                const res = await axios.get('/subjectsNoProf')
                const subjects = await res.data;
                this.setState({subjects:subjects})
            }
            const response = await axios.get('/profs')
            const profs= await response.data;
            this.setState({ profs });
            this.setState({ profList: profs });
            this.setState({ length: profs.length });
            console.log(profs);
            console.log(profs.length);


            const res = await axios.get('/subjectsNoProf')
            const subjects = await res.data;
            this.setState({subjects:subjects})


        } catch (error) {
            console.log(error);

    }}

    editProf(index,firstName, lastName, address,cin, birthD, phone,subject){
        console.log(subject);
        this.setState({firstName : firstName,lastName:lastName,address:address,cin:cin,phone:phone,birthD:birthD,subject:subject})
        this.setState(
            {
                editIndex : index
            }
        )
    }

    canceleditProf(){
        this.setState({
            editIndex : null
        })
    }

    deleteSubj(index,id,list){
        axios.put('/subjectUpdProfNo/'+id)
            .then(response => {
                console.log(response.data);
                const api =  response.data;
                console.log(api);
                console.log(list);
               const listp= list;
                listp.splice(index, 1);
                this.setState({
                    profs:api
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteProf(ind,id){
        axios.delete('/profdell/'+id)
            .then(response => {
                console.log(response.data);
                const api =  response.data;
                console.log(api);
                const listp= this.state.profList;
                listp.splice(ind, 1);
                this.setState({
                    listp
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

        updateProf(index,id){
            console.log(this.state.firstName);
            console.log(this.state.lastName);
            console.log(this.state.address);
            console.log(this.state.cin);
            const edI = this.state.editIndex
            this.state.profs[edI].firstName=this.state.firstName;
            this.state.profs[edI].lastName=this.state.lastName;
            this.state.profs[edI].address=this.state.address;
            this.state.profs[edI].cin=this.state.cin;
            this.state.profs[edI].birthD=this.state.birthD;
            this.state.profs[edI].phone=this.state.phone;
            //this.state.profs[edI].subject=this.state.subject;
            const firstName = this.state.firstName
            const lastName = this.state.lastName
            const cin = this.state.cin
            const address = this.state.address
            const phone = this.state.phone
            const birthD = this.state.birthD
            //const subject=this.state.subject
            const subj = this.state.subject
            const idsub=this.state.ids
            axios.put("/profUpd/"+id, {
              firstName, lastName, address,cin, birthD, phone
            })
                .then(response => {
                    console.log(response.data);
                    console.log(this.state.profs[edI].subject)
                    axios.put('/subjectUpdProf/' + idsub + '/' + id)
                        .then((rep) => {
                            const sub = rep.data;
                            console.log(sub);
                            axios.get('/subject/'+id).then((r)=>{
                                this.state.profs[edI].subject=r.data;
                                this.setState({ editIndex : null});
                            })



                        })
                })
                .catch(err => {
                    console.log(err);
                });

        }

        updateSubject(e){
        console.log(e.target.value);
            if( e.target.value !== this.state.subject){
                this.setState({
                        subj : e.target.value
                    }
                )}
            axios.get('/subjectidbyname/'+e.target.value)
                .then((re)=>{
                    this.setState({ids:re.data});
                })
        }

        updateFirstName(e){
            console.log(e.target.value);
            if( e.target.value !== this.state.firstName){
                this.setState({
                        firstName : e.target.value
                    }
                )}
        }

        updateLastName(e){
            console.log(e.target.value);
            if( e.target.value !== this.state.lastName){
                this.setState({
                        lastName : e.target.value
                    }
                )}
        }
        updateAddress(e){
            if( e.target.value !== this.state.address){
                this.setState({
                        address : e.target.value
                    }
                )}
        }

        updateCIN(e){
        console.log(e.target.value);
            if( e.target.value !== this.state.cin){
                this.setState({
                        cin : e.target.value
                    }
                )}
        }

        updatePhone(e){
            console.log(e.target.value);
            if( e.target.value !== this.state.phone){
                this.setState({
                        phone : e.target.value
                    }
                )}
        }
        updateBirthday(e){
            if( e.target.value !== this.state.birthD){
                this.setState({
                        birthD : e.target.value
                    }
                )}
        }


    addProf(){
        this.setState({redirect:true})
    }
    render(){

        const styles = {

            tab2: {
                cursor: 'pointer',
                color:'black',
                height:'100%'
            }

        }
        const { profs } = this.state

        const { redirect} = this.state

        const {subjects} =this.state

        if(redirect){
            return(
                <FormProf len={this.state.length}/>
            )
        }

        return (
            <div>
                <h1><b> list of the Professors </b></h1>
                <br/>
                <Table responsive striped bordered hover size="sm">
                    <thead style={styles.tab2}>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>CIN</th>
                        <th>Address</th>
                        <th>Birthday Date</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {profs.map((value, index)=>{
                            return(  this.state.editIndex !== index ?
                                    <tr key={value.id}>
                                        <th scope="row">{index+1}</th>
                                        <td id={index+2}>{value.firstName}</td>
                                        <td id={index+3}>{value.lastName}</td>
                                        <td id={index+4}>{value.cin}</td>
                                        <td id={index+5}>{value.address}</td>
                                        <td id={index+6}>{new Date(value.birthD).toISOString().slice(0, 19).replace('T', ' ')}</td>
                                        <td id={index+7}>{value.phone}</td>
                                        <td id={index+8}>{value.subject.map((val,ind)=>{
                                            return(  <ul>
                                                    <li> {val.subject}
                                                        <IconButton  aria-label="delete" onClick={()=>{
                                                            this.deleteSubj(ind,val.id,value.subject)
                                                        }}  color="primary">
                                                            <DeleteIcon  />
                                                        </IconButton>



                                                     </li>
                                                </ul>
                                                )})}

                                        </td>

                                        <td  id={index+9}className="centerAll" ><button onClick={()=>{
                                            this.editProf(index,value.firstName, value.lastName, value.address,value.cin, value.birthD, value.phone,value.subject)
                                        }} className="btn btn-primary">Edit</button></td>
                                        <td id={index+10} className="centerAll" ><button onClick={()=>{
                                            this.deleteProf(index,value.id)
                                        }} className="btn btn-danger">Delete</button></td>

                                    </tr>
                                    : <tr>
                                        <th scope="row" id={index+1}>{index+1}</th>
                                        <td className="centerAll" id={index+2+'edit'}><input type="text" defaultValue={value.firstName}  onChange={this.updateFirstName}/></td>
                                        <td className="centerAll" id={index+3+'edit'}><input type="text" defaultValue={value.lastName} onChange={this.updateLastName}/></td>
                                        <td className="centerAll" id={index+4+'edit'}><input type="text" defaultValue={value.cin} onChange={this.updateCIN} /></td>
                                        <td className="centerAll" id={index+5+'edit'}><input type="text" defaultValue={value.address} onChange={this.updateAddress} /></td>
                                        <td className="centerAll" id={index+6+'edit'}><input type="text" defaultValue={value.birthD} onChange={this.updateBirthday}/></td>
                                        <td className="centerAll" id={index+7+'edit'}><input type="text" defaultValue={value.phone} onChange={this.updatePhone}/></td>
                                        <td className="centerAll" id={index+8+'edit'}>
                                            <select  value={this.state.subject} className="form-control" onChange={this.updateSubject}>
                                                {subjects.map((x,index)=>
                                                    <option key={x.id}>{x.subject}</option>
                                                )}
                                            </select>



                                        </td>






                                        <td className="centerAll" id={index+9+'edit'}><button onClick={()=>{
                                            this.canceleditProf()
                                        }} className="btn btn-primary">Cancel</button></td>
                                        <td className="centerAll" id={index+10}><button onClick={()=>{
                                            this.updateProf(index,value.id)
                                        }} className="btn btn-info">Update</button></td>
                                    </tr>

                            )})}</tbody>

                </Table>
                <input type="button" className="buttonAdd" value="New" onClick={() => {
                    this.addProf()
                }}/>
            </div>
        )
    }
}