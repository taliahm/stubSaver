import React, { Component } from 'react';
import Config from './components/database.js';
import AddTicket from './components/addTicket.js';
import Tickets from './components/Tickets.js';
import { Link } from 'react-router';
import './App.css';

  const firebase = window.firebase;
  firebase.initializeApp(Config);

class App extends Component {
  constructor() {
    super();
    this.state={
      displayItems: []
    }
  }
  componentDidMount() {
    // console.log('mounted yo')
    const firebase = window.firebase;
    const dbRef = firebase.database().ref()
    dbRef.on('value', (data) => {
      // console.log(data.val())
      const dbData = data.val()
      let dataArray = []
      for(let key in dbData){
        // console.log(dbData[key])
        dataArray.push(dbData[key])
      }
      this.setState({
        displayItems: dataArray
      })
    })

    // const imageStorage = firebase.storage().ref().child('images/').getDownloadURL().then(function(url){
    //   console.log(url)
    // })
  }
  render() {
    return (
     <header>
      <h1>Collect My Stubs!</h1>
      <AddTicket />
      <Link to="/reco">Get Recomendations</Link>
      <Tickets items={this.state.displayItems}/>
     </header>
    );
  }
}

export default App;
