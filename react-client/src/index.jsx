import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';


// add more input box 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: '',
      // item will be stored all students name 
      firstName : '',
      lastName: '',
      cohort:'',
      searchName: ''
    }
    this.getData(); 
  }

  cohortValue (e) {
    this.setState({
      cohort: e.target.value 
    })
  }


  lastNameValue (e) {
    this.setState({
      lastName: e.target.value 
    })
  }

  firstNameValue (e) {
    this.setState({
      firstName: e.target.value 
    })
  }


  changeSearchName (e) {
    this.setState({
      searchName: e.target.value 
    })
  }

  addStudentPostRequest() {
    // var tem =''; 
    $.ajax({
      url: '/items', 
      type: 'POST', 
      contentType : 'application/json',
      data:  JSON.stringify({ firstName: this.state.firstName,
                              lastName: this.state.lastName,
                              cohort: this.state.cohort }),
      success: (data) => {
        this.getData(); 
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    this.setState({
      firstName: ""
    })
    this.setState({
      lastName: ""
    })
    this.setState({
      cohort: ""
    })
  }

  getData(callback) {
    var self = this; 
    $.ajax({
      url: '/items',
      type: 'GET',
      success: (data) => {
        self.setState({
          items : data
        }) 
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  }

  findStudent () {
    var searchName = this.state.searchName; 
    var data = this.state.items; 
    var hold = []; 
    for(var i = 0; i < data.length; i++ ) {
      if ( searchName.toLowerCase() === data[i].name.toLowerCase() ) {
        hold.push(searchName);
      } 
    }

    if(hold.length > 0 ) {
      hold.forEach( (name) => {
        this.setState({
          items: name.toLowerCase()
        })
      })
    } else {
      this.setState({
        items: 'Not Found'
      })
    }
    this.setState({
      searchName: ""
    })
  }


  render () {
    return (<div>
      <h1>Hack Reactor Student List</h1>
      <h3>Add new Student </h3>
      <div id ="addBar">

      First Name: <input className ='info' value = { this.state.firstName }  onChange= { this.firstNameValue.bind(this) }  placeholder = {"type first name"}/><br />
      <br />Last Name: <input className ='info' value = { this.state.lastName }  onChange= { this.lastNameValue.bind(this) } placeholder = {"type last name"}/><br />
      <br /> Cohort:   <input className ='info' value = { this.state.cohort }  onChange= { this.cohortValue.bind(this) } placeholder = {"type cohort number"}/><br />
      <br /><button className ="AddButton" onClick= {this.addStudentPostRequest.bind(this)} >ADD NEW STUDENT</button>  
      </div>

      <div id="serachBar">
       <br /><h3> Search a student</h3> 
       <input className ='info' value = { this.state.searchName }  onChange= { this.changeSearchName.bind(this)} />
       <button onClick= {this.findStudent.bind(this)} className ="AddButton"  >GO!</button> 
       
      </div>
      <List items={this.state.items}/>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));


