import React, { useState } from 'react';
import '../App.css';

const handleSubmit = () => {
  console.log()
}

function App() {

  const [name, setName] = useState("");

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newName: string = event.target.value
    console.log(newName);
    setName(newName);
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="App">
      <div className='loginName'>
        <label>
          {"Name: "}
          <input type="text" name="name" value={name} onChange={handleSetName} autoComplete='username'/>
        </label>
      </div>
      <div className='loginPassword'>
        <label>
          {"Password: "}
          <input type="password" name="password"/>
        </label>
      </div>
      <input type="submit" value="Submit" />
    </div>
    </form>
  );
}

export default App;
