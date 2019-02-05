import React, { Component } from 'react';
import swal from 'sweetalert';

var firebase = require('firebase');
var uuid = require('uuid');

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyArHpA_kf1ZDq4OMGpgmACfH8nc_VXBP7I",
    authDomain: "usurvey-new-test.firebaseapp.com",
    databaseURL: "https://usurvey-new-test.firebaseio.com",
    projectId: "usurvey-new-test",
    storageBucket: "usurvey-new-test.appspot.com",
    messagingSenderId: "2423612974"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {

  submit(e){
    e.preventDefault();
    var studentName = this.refs.name.value;
    this.setState({studentName:studentName});
  }

  answerSelected(e){
    var answers = this.state.answers;
    if(e.target.name === 'answer1'){
      answers.answer1 = e.target.value;
    }else if(e.target.name === 'answer2'){
      answers.answer2 = e.target.value;
    }else if(e.target.name === 'answer3'){
      answers.answer3 = e.target.value;
    }else if(e.target.name === 'answer4'){
      answers.answer4 = e.target.value;
    }else if(e.target.name === 'answer5'){
      answers.answer5 = e.target.value;
    }
    this.setState({answers:answers});
  }

  questionSubmit(e){
    e.preventDefault();
    if(this.state.answers.answer1 === '' || this.state.answers.answer2==='' || this.state.answers.answer3==='' || this.state.answers.answer4==='' || this.state.answers.answer5===''){
      swal("OOPS!", "Maybe You Didn't Select Something", "error");
      return;
    }
    firebase.database().ref('usurvey-updated/' + this.state.uid).set({
      studentName: this.state.studentName,
      anwers: this.state.answers,
    })
    this.setState({isSubmitted:true});
    swal("Good job!", "You clicked the button!", "success");
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName:'',
      answers:{
        answer1:'',
        answer2:'',
        answer3:'',
        answer4:'',
        answer5:''
      },
      isSubmitted:false,
    };
    this.submit = this.submit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  render(){
    var studentName;
    var questions;

    if(this.state.studentName===''&& this.state.isSubmitted===false){
      studentName =  <div>

         <div className="row">
            <div className="col s12 m12 l7">
              <div className="image-section">
                <div className="group-image"></div>
              </div>
            </div>
            <div className="col s12 m12 l5">
              <h4 className="heading">
                <span className="heading-primary">Welcome</span>
                <span className="heading-secondary">to Usurvey</span>
              </h4>
              <form onSubmit={this.submit}>
                <div className="input-field">
                  <input type="text" ref='name' className="name" id="name"/>
                  <label htmlFor="name">Enter Your Name</label>
                </div>
              </form>
            </div>
         </div>

      </div>
      questions = '';
    }else if(this.state.studentName !=='' && this.state.isSubmitted===false){
      studentName = <div>
          <h2 className='heading-secondary center'>Welcome to Usurvey {this.state.studentName}</h2>
      </div>
      questions = <div>

      <div className="container">
        <form onSubmit={this.questionSubmit}>
        <div className="card-panel">
          <h5 className='center card-heading'>Which One Would Recommend</h5>
          <div className="container">
            <div className="question center">
              <label>
                <input type="radio" name='answer1' value='Google Pay' onChange={this.answerSelected}/>
                  <span>Google Pay</span>
              </label>
              <label>
                <input type="radio" name='answer1' value="Paytm" onChange={this.answerSelected}/>
                  <span>Paytm</span>
              </label>
              <label>
                <input type="radio" name='answer1' value="Tez" onChange={this.answerSelected}/>
                  <span>Tez</span>
              </label>
            </div>
          </div>
        </div>
        <div className="card-panel">
          <h5 className='center card-heading'>Which Social Media App Do You Use</h5>
          <div className="container">
            <div className="question center">
              <label>
                <input type="radio" name='answer2' value="Instagram" onChange={this.answerSelected}/>
                  <span>Instagram</span>
              </label>
              <label>
                <input type="radio" name='answer2' value="facebook" onChange={this.answerSelected}/>
                  <span>facebook</span>
              </label>
              <label>
                <input type="radio" name='answer2' value="Snapchat" onChange={this.answerSelected}/>
                  <span>Snapchat</span>
              </label>
            </div>
          </div>
        </div>
        <div className="card-panel">
          <h5 className='center card-heading'>Is Online Learning Convinient</h5>
          <div className="container">
            <div className="question center">
              <label>
                <input type="radio" name='answer3' value='Yes' onChange={this.answerSelected}/>
                  <span>Yes</span>
              </label>
              <label>
                <input type="radio" name='answer3' value='No' onChange={this.answerSelected}/>
                  <span>No</span>
              </label>
              <label>
                <input type="radio" name='answer3' value='Maybe' onChange={this.answerSelected}/>
                  <span>Maybe</span>
              </label>
            </div>
          </div>
        </div>
        <div className="card-panel">
          <h5 className='center card-heading'>Do You Spend More Than 2hrs On Social Media</h5>
          <div className="container">
            <div className="question center">
              <label>
                <input type="radio" name='answer4' value='yes' onChange={this.answerSelected}/>
                  <span>yes</span>
              </label>
              <label>
                <input type="radio" name='answer4' value='No' onChange={this.answerSelected}/>
                  <span>No</span>
              </label>
              <label>
                <input type="radio" name='answer4' value='Sometimes' onChange={this.answerSelected}/>
                  <span>Sometimes</span>
              </label>
            </div>
          </div>
        </div>
        <div className="card-panel">
          <h5 className='center card-heading'>Are You a Student</h5>
          <div className="container">
            <div className="question center">
              <label>
                <input type="radio" name='answer5' value='Yes' onChange={this.answerSelected}/>
                  <span>Yes</span>
              </label>
              <label>
                <input type="radio" name='answer5' value='No' onChange={this.answerSelected}/>
                  <span>No</span>
              </label>
              <label>
                <input type="radio" name='answer5' value='Looking For Job' onChange={this.answerSelected}/>
                  <span>Looking For Job</span>
              </label>
            </div>
          </div>
        </div>
        <div className="button center">
          <input type="submit" className="btn btn-large center blue lighten-2 white-text"/>
        </div>
        </form>
      </div>

      </div>
    }else if(this.state.isSubmitted===true){
      studentName = <div>
        <div className="row">
          <div className="col s12 m12 l7">
            <div className="image-section">
              <div className="thank-image"></div>
            </div>
          </div>
          <div className="col s12 m12 l5">
            <div className="response-page">
              <h2 className="center">Thanks For Response</h2>
            </div>
          </div>
        </div>
      </div>
    }

    return(
      <div>
        {studentName}
        {questions}
      </div>
    );
  }
}

export default Usurvey;
