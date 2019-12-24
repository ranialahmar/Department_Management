import React, { Component } from 'react';
import axios from 'axios';
import Prof from './Prof';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import '/home/rania/soa_app/src/components/welcome/welcome.css';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from "mdbreact";



class FormProf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address:'',
            cin:'',
            phone:'',
            birthD:new Date(),
            success: false,
            date: null,
            focused: null,
            subjects:[],
            subject:'',
            value:'',
            sub_id:'',
            prof_id:''
        };
    }

    async componentDidMount() {
        try {
            console.log(this.props.len);
            const response = await axios.get('/subjectsNoProf')
            const subjects = await response.data;
            this.setState({subjects:subjects})
            console.log(subjects)



        } catch (error) {
            console.log(error);
        }
    }

    onChangeFirstName = (e) => this.setState({firstName: e.target.value})
    onChangeLastName = (e) => this.setState({lastName: e.target.value})
    onChangeCIN = (e) => this.setState({cin: e.target.value})
    onChangeAddress = (e) => this.setState({address: e.target.value})
    onChangePhone = (e) => this.setState({phone: e.target.value})
    onChangeSubject =(e) => {
        this.setState({value: e.target.value});
        axios.get('/subjectidbyname/' + e.target.value).then((res) => {
            this.setState({sub_id: res.data})
        })

    }

    onSubmit = (firstName, lastName, address,cin, birthD, phone,id) => {

        axios.post('/profadd/', {
            id,firstName, lastName, address,cin, birthD, phone
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //this.setState({prof_id:res.data})

               axios.get('/prof/'+res.data).then((rep)=>{
                   this.setState({prof_id:rep.data});
                   this.setState({success:true});
               })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleChange = date => {
        this.setState({
            birthD: date
        });
    };


    render(){
        const { firstName, lastName, address,cin, birthD, phone, success,subjects} = this.state


        if(success){
            return(<Prof sub={this.state.sub_id} id={this.state.prof_id}/>)
        }
        return (
            <div className="form">
                <MDBContainer  >
                    <MDBRow>
                        <MDBCol md="7">
                            <MDBCard >
                                <MDBCardBody className="fil">
                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                        <h3 className="my-3">
                                            <b>New Professor Form </b>
                                        </h3>
                                    </MDBCardHeader>
                                    <br/>
                                    <input
                                        placeholder={"Firstname"}
                                        id="defaultFormEmailEx"
                                        className="form-control"
                                        value={this.state.firstName} onChange={this.onChangeFirstName}
                                    />
                                    <br/>
                                    <input
                                        placeholder={"Lastname"}
                                        id="defaultFormEmailEx"
                                        className="form-control"
                                        value={this.state.lastName} onChange={this.onChangeLastName}
                                    />
                                    <br/>
                                    <input
                                        placeholder={"Address"}
                                        id="defaultFormEmailEx"
                                        className="form-control"
                                        value={this.state.address} onChange={this.onChangeAddress}
                                    />
                                    <br/>
                                    <input
                                        placeholder={"CIN"}
                                        id="defaultFormEmailEx"
                                        className="form-control"
                                        value={this.state.cin} onChange={this.onChangeCIN}
                                    />
                                    <br/>

                                    <input
                                        placeholder={"Phone"}
                                        id="defaultFormPasswordEx"
                                        className="form-control"
                                        value={this.state.phone} onChange={this.onChangePhone}
                                    />
                                    <br/>
                                    <select  value={this.state.value}  className="form-control" onChange={this.onChangeSubject}>
                                        {subjects.map((x,index)=>
                                            <option key={x.id}>{x.subject}</option>
                                        )}
                                    </select>

                                    <label
                                        htmlFor="defaultFormPasswordEx"
                                        className="grey-text font-weight-light"
                                    >
                                        <b>Birthday Date : </b> <br/>
                                    </label>
                                    <DatePicker
                                        id="defaultFormPasswordEx"
                                        className="form-control"
                                        selected={this.state.birthD}
                                        onChange={this.handleChange}
                                        placeholder={"Birthday Date"}
                                        value={this.state.birthD}

                                    />


                                    <div className="text-center mt-4">
                                        <MDBBtn
                                            color="danger"
                                            type="submit"
                                            className="mb-3"
                                            onClick={()=>this.onSubmit(
                                                firstName, lastName, address,cin, birthD, phone,this.props.len
                                            )}
                                        >
                                            Save
                                        </MDBBtn>
                                    </div>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }

}
export default  FormProf;