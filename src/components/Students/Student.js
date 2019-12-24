import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import FormStudent from "./FormStudent";

export default class Student extends Component
{
    constructor(props){
        super(props);
        this.state={
            studentList : [],
            apiListt: [],
            address:'',
            firstName:'',
            lastName:'',
            birthD:'',
            group:'',
            phone:null,
            cin:'',
            editIndex:null,
            redir:false
        }
        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateCIN = this.updateCIN.bind(this)
        this.updatePhone = this.updatePhone.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
    }

    async componentDidMount() {
        try {

            const response = await axios.get('/students')
            const apiListt = await response.data;
            this.setState({ apiListt:this.props.ap });
            this.setState({ studentList: this.props.ap });
            console.log(apiListt)

        } catch (error) {
            console.log(error);
        }
    }


    editEmployee(index ,firstName, lastName, address,cin, birthD, phone){
        this.setState({firstName : firstName,lastName:lastName,address:address,cin:cin,phone:phone,birthD:birthD})


        this.setState(
            {
                editIndex : index
            }
        )
    }

    canceleditEmployee(){
        this.setState({
            editIndex : null
        })
    }

    deleteEmployee(index,id){
        axios.delete('/studentdel/'+id)
            .then(response => {
                console.log(response.data);
                const api =  response.data;
                console.log(api);
                const list= this.state.studentList;
                list.splice(index, 1);
                this.setState({
                    list
                })
            })
            .catch(error => {
                console.log(error);
            });

    }

    updateEmployee(index,id){
        const edI = this.state.editIndex
        this.state.apiListt[edI].firstName=this.state.firstName;
        this.state.apiListt[edI].lastName=this.state.lastName;
        this.state.apiListt[edI].address=this.state.address;
        this.state.apiListt[edI].cin=this.state.cin;
        this.state.apiListt[edI].birthD=this.state.birthD;
        this.state.apiListt[edI].phone=this.state.phone;
        this.state.apiListt[edI].position=this.state.group;
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const cin = this.state.cin
        const address = this.state.address
        const phone = this.state.phone
        const birthD = this.state.birthD
        const group = this.state.group
        axios.put("/studentUpd/"+id, {
            firstName, lastName, address,cin, birthD, phone,group
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    editIndex : null
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    updateFirstName(e){
        if( e.target.value !== this.state.firstName){
            this.setState({
                    firstName : e.target.value
                }
            )}
    }

    updateLastName(e){
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
        if( e.target.value !== this.state.cin){
            this.setState({
                    cin : e.target.value
                }
            )}
    }

    updatePhone(e){
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
     updateGroup(e){
         if( e.target.value !== this.state.group){
             this.setState({
                     group : e.target.value
                 }
             )}
     }

     addStudent(){
        this.setState({redir:true})
     }
    render() {

        const styles = {

            tab2: {
                cursor: 'pointer',
                color:'black',
                height:'100%'
            }

        }

        const { redir } = this.state

        if(redir){
            return(
                <FormStudent valg={this.props.val}/>
            )
        }

        return (
            <div>
                <h1><b>List of {this.props.val} Students</b></h1>
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
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {
                    this.props.ap.map((value, index)=>{
                        return(  this.state.editIndex !== index ?
                        <tr key={value.id}>
                            <th scope="row">{index+1}</th>
                            <td id={index+2}>{value.firstName}</td>
                            <td id={index+3}>{value.lastName}</td>
                            <td id={index+4}>{value.cin}</td>
                            <td id={index+5}>{value.address}</td>
                            <td id={index+6}>{new Date(value.birthD).toISOString().slice(0, 19).replace('T', ' ')}</td>
                            <td id={index+7}>{value.phone}</td>

                            <td  id={index+9}className="centerAll" ><button onClick={()=>{
                                this.editEmployee(index,value.firstName, value.lastName, value.address,value.cin, value.birthD, value.phone)
                            }} className="btn btn-primary">Edit</button></td>
                            <td id={index+10} className="centerAll" ><button onClick={()=>{
                                this.deleteEmployee(index,value.id)
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
                                    <td className="centerAll" id={index+8+'edit'}><input type="text" defaultValue={value.Group}onChange={this.updateGroup}/></td>
                                    <td className="centerAll" id={index+9+'edit'}><button onClick={()=>{
                                        this.canceleditEmployee()
                                    }} className="btn btn-primary">Cancel</button></td>
                                    <td className="centerAll" id={index+10}><button onClick={()=>{
                                        this.updateEmployee(index,value.id)
                                    }} className="btn btn-info">Update</button></td>
                                </tr>

                    )})}
                </tbody>
            </Table>
                <input type="button" className="buttonAdd" value="New" onClick={() => {
                    this.addStudent()
                }}/>
                </div>
        )
    }
}
