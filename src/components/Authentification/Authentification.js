import React, { Component } from 'react';
import './auth.css';
import  './../welcome/welcome.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import Hello from './../welcome/Hello'

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader,
    MDBBtn

} from "mdbreact";
class  Authentification extends Component
{

    state = {
        username: '',
        password:'',
        redirect: false
    };

    handleInputChange = param =>
        this.setState({ [param.target.name]: param.target.value });


    handleSubmit =  event => {
        event.preventDefault();
        this.state.username==="admin" && this.state.password==="admin" ? this.setState({ redirect: true }) : swal("Access Deneid", "Please Enter Correct username And Password");
    }



    render(){
        const { redirect } = this.state;
        if (redirect)
        {
            return<Hello />;
        }

        return (

<div className="Appi">
    <MDBContainer>
        <MDBRow>
            <MDBCol md="7">
                <MDBCard>
                    <MDBCardBody  className="fil">

                        <MDBCardHeader  className="form-header warm-flame-gradient rounded">
                            <h3 >
                                <MDBIcon icon="lock" /> <b>Login to the administration System</b>
                            </h3>
                        </MDBCardHeader>
<br/>

                           <b> Username</b>

                        <input
                            type="username"
                            id="defaultFormEmailEx"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                            name="username"
                        />


                            <b> Password </b>

                        <input
                            type="password"
                            id="defaultFormPasswordEx"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            name="password"
                        />

                        <div className="text-center mt-4">
                            <MDBBtn
                                color="danger"
                                type="submit"
                                onClick={this.handleSubmit}
                                className="mb-3"
                            >
                                Log in
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
export default Authentification;