import axios from 'axios';
import React,{useState, useEffect} from 'react';
import './App.css';

const url = 'https://reqres.in/api/users/'

function App() {

  
const [users, setUsers]=useState([])
const [filteredUsers, setFilteredUsers]=useState([])
const [count, setCount]=useState(1)
const [search, setSearch]=useState('')

useEffect(()=>{
  setFilteredUsers(users.filter(u=>u.first_name.toLowerCase().includes(search.toLowerCase())))
},[search, users])

const loadUser = () =>{
  axios.get(url+count)
    .then(response=>{
      setUsers([...users,response.data.data])
    })
    .catch(error=>{
      console.log(error)
    })
}

const clickHandler = () =>{
  setCount(c=>c+1)
    loadUser()
  }
  const inputHandler = e =>{
    setSearch(e.target.value)
  }
  const removeHandler = (id) =>{

  setUsers(users.filter(u=>u.id!==id))
  }
  return (
    <div className="App">
      <div className='card'>
      <div className='card-header'>
        <button onClick={clickHandler}>load user</button>
        <input type='text' onChange={e=>inputHandler(e)} placeholder='search for user'/>
      </div>
      <div className='user-list'>
      
      {
        users.length!==0?(search!==''?filteredUsers:users).map((user)=>{
          return(
          <div key={user.id} className='user'>
            <button style={{position:'absolute',top:0,right:0}} onClick={()=>removeHandler(user.id)}>&times;</button>
            <div className='user-header'>
              <div className='user-name'>Hello, I'm {`${user.first_name} ${user.last_name}`}</div>
              
            </div>
            <div className='user-body'>
              <img src={user.avatar} className='user-img' alt={`${user.first_name} avatar`}/>
              <p className='user-email'>{`${user.email}`}</p>
            </div>
            
          </div>
          )
        }):<div><h2>No users loaded yet</h2></div>
      }
      </div>
      </div>
    </div>
  );
}

export default App;
