import React, { useState, useEffect } from 'react';
import { auth, db } from "../service/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetail(docSnap.data());
      } else {
        console.log("User data not found");
      }
    } else {
      console.log("User not logged in");
      navigate('/')
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function userLogout() {
    try {
      await auth.signOut();
      console.log("User logout successful");
      navigate('/login');
    } catch (error) {
      console.log("User logout failed");
    }
  }

  return (
    <>
      {userDetail ?
        <div className='h-screen flex flex-col justify-center gap-5 items-center text-center'>
          <h1 className='text-4xl font-semibold'>Welcome : {userDetail.Username}</h1>
          <h1 className='text-4xl font-medium'>Your Email : {userDetail.Email}</h1>
          <button className='bg-red-500 px-5 py-3 text-white rounded-lg' onClick={userLogout}>Logout</button>
        </div>
        :
        <div className='h-screen flex flex-col justify-center gap-5 items-center text-center'>
          <span className='text-2xl'>Loading...</span>
        </div>
      }
    </>
  )
}

export default Home;
