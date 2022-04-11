import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import React from 'react';
import Inventory from './components/Inventory';

const firebaseConfig = {
  apiKey: "AIzaSyBjYabqy9_P67Ka8Fzwj3ZsXn3CN4HhVkE",
  authDomain: "fpt-sandbox.firebaseapp.com",
  databaseURL: "https://fpt-sandbox-default-rtdb.firebaseio.com",
  projectId: "fpt-sandbox",
  storageBucket: "fpt-sandbox.appspot.com",
  messagingSenderId: "620589844068",
  appId: "1:620589844068:web:2d576ae7d28cbb723fc171",
  measurementId: "G-CQ2P0875MP"
};

// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
// const database = getDatabase(app);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inventory:"nothing"};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    const dbRef = ref(getDatabase());
    let firebase_data;
    get(child(dbRef, `zekoff`)).then((snapshot) => {
      if (snapshot.exists()) {
        firebase_data = snapshot.val();
        this.setState({inventory:JSON.stringify(firebase_data)});
        console.log(firebase_data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <div className="App">
        <Inventory inventory={this.state.inventory} />
      </div>
    );
  }

  handleChange() {
    this.setState({inventory:"Some inventory items"})
  }
}

export default App;
