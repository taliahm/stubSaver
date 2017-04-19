import React, { Component } from 'react';
import Config from './components/database.js';
import AddTicket from './components/addTicket.js';
import Tickets from './components/Tickets.js';
import { Link } from 'react-router';
import './normalize.css';
import './App.css';
import logo from '../public/ticket.png';

  const firebase = window.firebase;
  firebase.initializeApp(Config);

class App extends Component {
  constructor() {
    super();
    this.changeEvent = this.changeEvent.bind(this);
    this.state={
      displayItems: [],
      user: false,
      email: '',
      password: '',
      confirm: ''
    }
  }
  componentDidMount() {
    // console.log('mounted yo')
    const firebase = window.firebase;
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('logged in')
        this.setState({
          user: true, 
          uid: user.uid,
        })   
         const dbRef = firebase.database().ref(`users/${this.state.uid}`)
    // console.log(dbRef)
    dbRef.on('value', (data) => {
      const dbData = data.val()
      let dataArray = []
      for(let key in dbData){
        dataArray.push(dbData[key])
      }
      this.setState({
        displayItems: dataArray
      })
    })  
      }
      else { console.log('no logged in')
       this.setState({
         user: false,
       })
    }
    });
   

    // const imageStorage = firebase.storage().ref().child('images/').getDownloadURL().then(function(url){
    //   console.log(url)
    // })
  }
  editTicket(item) {
    console.log('to be editted', item.target.id)

  }
  changeEvent(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  signUp(e) {
    console.log('signing up')
    e.preventDefault();
    if(this.state.password === this.state.confirm) {
      firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch((error) => {
            console.log(error)
            });
      }
  }
  signIn(e) {
    console.log('signing in')
    e.preventDefault();
    firebase.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
        console.log(error)
      })
  }
  signOut(){
    console.log('signing out')
    firebase.auth().signOut();
  }
  render() {
    let toDisplay = '';
  
    if(this.state.user === true) {
      toDisplay = 
       <header>
          <div className="topBar">
            <div className="logoWrap">
              <img src={logo} alt="ticket icon"/>
            </div>
            <h1>Collect My Stubs!</h1>
        </div>
        <nav>
          <AddTicket uid={this.state.uid}/>
          <Link className="link" to="/reco">Search for Recomendations</Link>
        </nav>
        <Tickets items={this.state.displayItems} editTicket={(item) => this.editTicket(item)}/>
        <button onClick={this.signOut}>Sign Out </button>
     </header>
    }
    else {
      toDisplay = 
      <section>
        <div className="topBar">
          <div className="logoWrap">
            <img src={logo} alt="ticket icon"/>
          </div>
          <h1>Collect My Stubs!</h1>
        </div>
        <div className="formContain"> 
          <form onSubmit={(e) => this.signUp(e)} className="signForm">
            <h3> sign up </h3>
            <label className="signForm__label" htmlFor="email">Sign Up Email</label>
            <input className="signForm__input" type="email" id="email" name="email" onChange={this.changeEvent}/>
            <label className="signForm__label" htmlFor="password">Please create a password</label>
            <input className="signForm__input" type="password" id="password" name="password" onChange={this.changeEvent}/>
            <label className="signForm__label" htmlFor="confirm">Please confirm Your password</label>
            <input className="signForm__input" type="password" id="confirm" name="confirm" onChange={this.changeEvent}/>
            <button className="signForm__btn" type="submit">Sign Up</button>
          </form>
          <h2> Or </h2>
          <form onSubmit={(e) => this.signIn(e)} className="signForm">
          <h3>Sign in</h3>
          <label className="signForm__label" htmlFor="email">Enter Email</label>
            <input className="signForm__input" type="email" id="email" name="email" onChange={this.changeEvent}/>
            <label className="signForm__label" htmlFor="password">Enter Your Password</label>
            <input className="signForm__input" type="password" id="password" name="password" onChange={this.changeEvent}/>
            <button className="signForm__btn" type="submit">Sign in</button>
          </form>
        </div>
      </section>
    }
    return (
     <section>{toDisplay}</section>
    );
  }
}

export default App;
