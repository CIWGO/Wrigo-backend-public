import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';

import "./UserProfilePage.css";
function UserProfile() {
  const [users, setUsers] = useState([]);
  // const [uid, setuid] = useState('');
  
  // const handleuidChange = (event) => {
  //   setuid(event.target.value);
  // }
  
  const fetchUsers = () => {
    // eslint-disable-next-line no-unused-expressions
    // const dat=localStorage.getItem("uid")
    // console.log(dat)
    const uid = localStorage.getItem("uid");
    axios.post('http://localhost:3005/users/getUserProfile',
  {uid} 
    )
      .then(response => {
        const dateString = response.data.user.birth===undefined ?  "": new Date(response.data.user.birth).toISOString().substr(0, 10);
        setUsers(
          {
            username:response.data.user.username, country: response.data.user.country, gender: response.data.user.gender, email: response.data.user.email,
            birth:dateString,study_field:response.data.user.study_field
          
          });
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  return (
    <div className='container'>
      {/* <input
        className='search_input'
          type="text"
          value={uid}
          onChange={handleuidChange}
        /> */}
      <button onClick={fetchUsers} >
        {'get user profile by uid'}
      </button>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>gender</th>
            <th>country</th>
            <th>birth</th>
            <th>study_field</th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td>{users.username}</td>
            <td>{users.gender}</td>
            <td>{users.country}</td>
            <td>{users.birth}</td>
            <td>{users.study_field}</td>
            </tr>   
        </tbody>
      </table>
      <Link to="/updateUserProfile">
      <button type="submit">update user profile</button>
        </Link>
    </div>
  );
}

export default UserProfile;