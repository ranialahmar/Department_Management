import React, { Component } from 'react';
import axios from 'axios';
import './welcome.css';
import Student from '/home/rania/soa_app/src/components/Students/Student.js'
import Stuff from '/home/rania/soa_app/src/components/Stuff/Stuff.js'
import Prof from '/home/rania/soa_app/src/components/Prof/Prof.js'
import Evaluation from '/home/rania/soa_app/src/components/Evaluation/Evaluation.js'
import { TabContent, TabPane } from 'reactstrap';


export default class  Hello extends Component
{
    constructor(props){
        super(props);
        this.state={
            apiList: [],
            activeTab: '5',
            value:'Students',
            group:'',
            groups:[],
            grp:'',
            redirect:false,
            redi:false
        };
        this.handleChange = this.handleChange.bind(this);

    }

    async componentDidMount(){
        console.log(this.props.id);
        console.log(this.props.sub);
        console.log(this.props.st)
        axios.get('/groups').then((r)=>{
            this.setState({groups:r.data})
        })
     if(this.props.sub && this.props.id) {
         axios.put('/subjectUpdProf/' + this.props.sub + '/' + this.props.id)
             .then((rep) => {
                 const sub = rep.data;
                 console.log(sub);
             })
     }
     if(this.props.st && this.props.group &&this.props.idg){
         axios.get('/groups/'+this.props.group)
             .then((res)=>{
                 const apiListt = res.data.student;
                 console.log(apiListt);
                 this.setState({ apiList:apiListt });
                 this.setState({redirect:true});
                 this.affectation(apiListt);
             });
         this.state.activeTab !== '1'&& this.setState({ activeTab: '1' });


     }
    }





    handleChange=(event)=> {

        if (event.target.value!= 'Students'){

            this.setState({value:event.target.value});
            axios.get('/groups/'+event.target.value)
                .then((res)=>{
                    const apiListt = res.data.student;
                    console.log(apiListt);
                    this.setState({ apiList:apiListt });
                    this.setState({redirect:true});
                    this.affectation(apiListt);
                });

            this.state.activeTab !== '1'&& this.setState({ activeTab: '1' });

        }
    }
    toggle = tab => this.state.activeTab !== tab && this.setState({ activeTab: tab });

    affectation = (g) =>{
        this.setState({apiList:g});
        this.setState({redirect:true});
    }

    render(){

        const { groups ,redirect,redi}=this.state;

        return (
            <div>
                <div className="Backg">
                    <h1> <b> Welcome to Management Interface for the Department of Information Science & Technology </b></h1>

                    <form>
                        <select value={this.state.value} className="button" onChange={this.handleChange}>
                            <option disabled>Students</option>
                            {groups.map((x,index)=>
                                <option key={x.id}>{x.nameG}</option>
                            )}
                        </select>
                        <input  value="Professors" type="button" className="button1"  onClick={() => { this.toggle('2'); }}/>
                        <input value="Administration Stuff" type="button" className="button2" onClick={() => { this.toggle('3'); }}/>
                        <input value="Evaluation" type="button" className="button3" onClick={() => { this.toggle('4'); }}/>

                    </form>
                </div>

                <div className="tableCh">
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {redirect==true &&  <Student val={this.state.value} ap={this.state.apiList} /> }

                        </TabPane>
                        <TabPane tabId="2">
                            <Prof/>
                        </TabPane>
                        <TabPane tabId="3" >
                            <Stuff/>
                        </TabPane>
                        <TabPane tabId="4">
                            <Evaluation groups={this.state.groups}/>
                        </TabPane>
                        <TabPane tabId="5">

                        </TabPane>


                    </TabContent>
                </div>

            </div>

        )}



};