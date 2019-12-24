import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import Student from './../Students/Student';
import Hello from './../welcome/Hello';
import "react-datepicker/dist/react-datepicker.css";
import '/home/rania/soa_app/src/components/welcome/welcome.css';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from "mdbreact";


class FormStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address:'',
            cin:'',
            phone:'',
            value:'IF5',
            birthD:new Date(),
            group:'',
            idg:'',
            groups:[],
            success: false,
            date: null,
            focused: null,
            apistd:[]
        };
    }

    async componentDidMount() {
        try {
            console.log(this.props.valg)

            const response = await axios.get('/groups')
            const groups = await response.data;
            this.setState({groups:groups})
            console.log(groups)
       if(this.props.valg){
            axios.get('/groups/'+this.props.valg)
                .then((res)=>{
                    const apiListt = res.data.student;
                    console.log(apiListt);
                    this.setState({ apiList:apiListt });
                    this.setState({ apiList:apiListt });


                });}

        } catch (error) {
            console.log(error);
        }
    }

    onChangeFirstName = (e) => this.setState({firstName: e.target.value})
    onChangeLastName = (e) => this.setState({lastName: e.target.value})
    onChangeCIN = (e) => this.setState({cin: e.target.value})
    onChangeAddress = (e) => this.setState({address: e.target.value})
    onChangePhone = (e) => this.setState({phone: e.target.value})
    handleChange = (e) => this.setState({birthD: e.target.value})
    onChangeGroup =(e) =>{this.setState({group:e.target.value,value:e.target.value})}

    onSubmit = (firstName, lastName, address,cin, birthD, phone,group) => {
        axios.get('/group/' + this.props.valg).then((res)=>{
            console.log(res.data);
            const group_id=res.data;
            this.setState({idg:group_id})

        axios.post('/studentadd/'+group_id, {
            firstName, lastName, address,cin, birthD, phone
        })
            .then((r) => {
                this.setState({apistd:r.data})
                this.setState({success:true})
            })
            .catch(function (error) {
                console.log(error);
            });
        })}

    handleChange = date => {
        this.setState({
            birthD: date
        });
    };


    render(){
        const { firstName, lastName, address,cin, birthD, phone,group, success,groups} = this.state
        
        if(success){
            return(
                <Student val={this.props.valg} ap={this.state.apistd}/>
               )
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
                                        <b>New Student Form </b>
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
                                            firstName, lastName, address,cin, birthD, phone, group
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
export default  FormStudent;