import React , { useState} from 'react';
import 'firebase/auth';
import {  useFirebaseApp ,FirebaseAppProvider ,useAuth } from 'reactfire';
import { auth} from './firebase'
import firebase from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const firebase = useFirebaseApp();
    const user = useAuth();

  const submit = async () => {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = async () => {
    await firebase.auth().signIn(email, password);


  };

  const logout = async () => {
    await firebase.auth().signOut(email, password);


  };
  

  return (
    <div>
      {user.email}
      {!user && 
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(event) => setPassword(event.target.value)} />
        <button onClick={submit}>Create Account</button>
        <button onClick={submit}>Login</button>
      </div>
      }
      {
        user && <button onClick={logout}> logout </button>
      }
    </div>
  );
};


// import { onAuthStateChanged, signOut } from 'firebase/auth'
// import React, { useEffect, useState } from 'react'
// import { auth} from './firebase'
// import 'firebase/auth';

// const AuthDetails = () => {
//   const [authUser, setAuthUser] = useState(null);

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user);
//       } else {
//         setAuthUser(null);
//       }
//     });

//     return () => {
//       listen();
//     };
//   }, []);

//   const userSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("sign out successful");
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div>
//       {authUser ? (
//         <>
//           <p>{`Signed In as ${authUser.email}`}</p>
//           <button onClick={userSignOut}>Sign Out</button>
//         </>
//       ) : (
//         <p>Signed Out</p>
//       )}
//     </div>
//   );
// };

// export default AuthDetails;