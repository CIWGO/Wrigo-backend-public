import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

import"./UpdateUserProfile.css"
function UpdateUserProfile() {
  const [birth, setBirthday] = useState('');
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState('');
  const [study_field, setField] = useState('');
  const navigate = useNavigate ();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const uid = localStorage.getItem("uid");
    axios.put('http://localhost:3005/users/userProfile', {uid,
    birth,gender,country,study_field
    })
    .then((response) => {
      console.log(response.data);
      navigate('/userProfile');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="container">
      <h1 className="heading">user profile</h1>
      <form onSubmit={handleFormSubmit}>
      {/* <label>
        uid:
        <input
          type="text"
          value={uid}
          onChange={(event) => setUid(event.target.value)}
        />
      </label>  */}
      <label>
        Birthday:
        <input
          type="date"
          value={birth}
          onChange={(event) => setBirthday(event.target.value)}
        />
      </label>
      
      <label>
        Gender:
        <select
            value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="others">ohters</option>
        </select>
        </label>
        
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        </label>
        
      <label>
        Study field:
        <input
          type="text"
          value={study_field}
          onChange={(event) => setField(event.target.value)}
        />
        </label>
        
        <button type="submit">Submit</button>
        {/* <Link to="/userProfile">
        </Link> */}
      </form>
      </div>
  );
}
export default UpdateUserProfile;