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
      studentName : '',
      searchName: ''
    }
    this.getData(); 
  }

  changeStudentValue (e) {
    this.setState({
      studentName: e.target.value 
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
      data:  JSON.stringify({ name: this.state.studentName }),
      success: (data) => {
        this.getData(); 
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    this.setState({
      studentName: ""
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
      First Name: <input value = { this.state.studentName}  onChange= { this.changeStudentValue.bind(this) } /><br />
      <br />Last Name: <input value = { this.state.studentName}  onChange= { this.changeStudentValue.bind(this) } /><br />
      <br /> Birth Date: <input value = { this.state.studentName }  onChange= { this.changeStudentValue.bind(this) } /><br />
      <br /> Cohort: <input value = { this.state.studentName }  onChange= { this.changeStudentValue.bind(this) } /><br />

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


