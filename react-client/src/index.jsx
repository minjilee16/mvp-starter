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
      birthDate:'',
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

  birthDateValue (e) {
    this.setState({
      birthDate: e.target.value 
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
                              birthDate: this.state.birthDate,
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
      birthDate: ""
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
    console.log('DATA', this.state.items)
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
// create input Add bar 
// create button 

  render () {
    return (<div>
      <h1>Student List</h1>
      <h3>Add new Student </h3>
      <div id ="addBar">
      First Name: <input value = { this.state.firstName}  onChange= { this.firstNameValue.bind(this) } /><br />
      <br />Last Name: <input value = { this.state.lastName }  onChange= { this.lastNameValue.bind(this) } /><br />
      <br /> Birth Date: <input value = { this.state.birthDate }  onChange= { this.birthDateValue.bind(this) } /><br />
      <br /> Cohort: <input value = { this.state.cohort }  onChange= { this.cohortValue.bind(this) } /><br />

      <br /><button onClick= {this.addStudentPostRequest.bind(this)} >Add</button>  
      </div>


      <div id="serachBar">
       <br /><h3> Search a student name </h3> 
       <input value = { this.state.searchName }  onChange= { this.changeSearchName.bind(this)} />
       <button onClick= {this.findStudent.bind(this)} >Go!</button> 
       
      </div>
      <List items={this.state.items}/>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));


