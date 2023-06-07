
import { useEffect, useState } from 'react';
import './App.css';
import DispensaHolder from './Dispensa_Holder';
import { BrowserRouter } from 'react-router-dom';

function App() {
  // hold user information
const [user, setUser] = useState()
// hold token information
const [token, setToken] = useState()

useEffect(() =>{
let lStorage = localStorage.getItem('user')
let tStorage = localStorage.getItem('token')
console.log(tStorage)
// console.log(JSON.parse(lStorage))
if(lStorage){
  setUser(JSON.parse(lStorage))
}
if(tStorage){
  setToken(tStorage)
}

}, [])

  return (
    <div className="App">
      <BrowserRouter>
      <DispensaHolder user={user} setUser={setUser} token={token} setToken={setToken}/>
      </BrowserRouter>
     
    </div>
  );
}







export default App;
