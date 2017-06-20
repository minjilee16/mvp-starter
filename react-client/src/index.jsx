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
      searchName: '',
      deleteName: '',
      selectValue:''
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
      if ( searchName.toLowerCase() === data[i].first_name.toLowerCase() ) {
        hold.push(data[i]);
      } 
    }
    if(hold.length > 0 ) {
      hold.forEach( (name) => {
        this.setState({
          items: hold
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

  changeDeleteName (e) {
    this.setState({
      deleteName: e.target.value
    })
  }

  deleteStudentName () {
    var value = this.state.deleteName.toLowerCase();
    $.ajax({
      url : '/items',
      method: 'DELETE',
      contentType: 'application/json', 
      data: JSON.stringify({ deleteName: value }),
      success: (data) => {
        console.log('DATA! :', data); 
        this.getData();
      },
      error: (error) => {
        console.error('error:',error); 
      }
    })

     this.setState({
      deleteName: ''
    })
  }

  selectValueChange (e) {
    this.setState({
      selectValue:e.target.value
    });
    // console.log('selectValue',this.state.selectValue);
  }


  handleSubmit() {
    var optionValue = this.state.selectValue; 
    var data = this.state.items; 

        console.log('optionValue', data)
    var data77 = [];
    var data78 = [];
    for(var i =0; i< data.length; i++) {
      if(data[i].cohort === 77 ) {
        data77.push(data[i]); 
      } else if ( data[i].cohort === 78){
        data78.push(data[i]); 
      }
    }
    // console.log('data77',data77); 
    if ( optionValue === 'All') {
      this.setState({
        items: data
      })
    } 

    if( optionValue === 'HR77') {
      this.setState({
        items: data77
      })
    } 

    if ( optionValue === 'HR78' ) {
      this.setState({
        items: data78
      })
    } 
  }



  render () {
    return (<div>
      <h1>Hack Reactor Student List</h1>
      <h3>Add New Student </h3>

      <div id ="addBar">
      First Name: <input className ='info' value = { this.state.firstName }  onChange= { this.firstNameValue.bind(this) }  placeholder = {"type first name"}/><br />
      <br />Last Name: <input className ='info' value = { this.state.lastName }  onChange= { this.lastNameValue.bind(this) } placeholder = {"type last name"}/><br />
      <br /> Cohort:   <input className ='info' value = { this.state.cohort }  onChange= { this.cohortValue.bind(this) } placeholder = {"type cohort number"}/><br />
      <br /><button className ="AddButton" onClick= {this.addStudentPostRequest.bind(this)} >ADD NEW STUDENT</button>  
      </div>


      <div id="serachBar">
       <br /><h3> Search a Student</h3> 
       <input className ='info' value = { this.state.searchName }  onChange= { this.changeSearchName.bind(this) } placeholder = {"type first name"}/>
       <button onClick= {this.findStudent.bind(this)} className ="AddButton" >GO!</button> 
      </div>

      <div id="deleteBar">
       <br /><h3> Delete a Student</h3> 
       <input className ='info' value = { this.state.deleteName }  onChange= { this.changeDeleteName.bind(this)} placeholder = {"type first name"} />
       <button onClick= {this.deleteStudentName.bind(this)} className ="AddButton">DELETE</button> 
      </div>

      <div>
      <h3>Select Cohort</h3>
     
          <select value={this.state.selectValue} onChange={ this.selectValueChange.bind(this) }> 
            <option value="All"> All </option>
            <option value="HR77"> HR77 </option>
            <option value="HR78"> HR78 </option>
          </select>  
        <input onClick={this.handleSubmit.bind(this)} type='button' value='submit' id='submitButton'/>      

      </div>
    

      <List items={this.state.items}/>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));


