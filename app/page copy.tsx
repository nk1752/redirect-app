'use client';

import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

import Image from "next/image";
import CurrentUser from "./components/currentUser";
import Signout from "./components/signout";
import Topbar from "./components/topbar";

export default function Home() {

  const { instance, accounts, inProgress } = useMsal();

  const [currentUser, setCurrentUser] = useState('no user signed in');
  const [accessToken, setAccessToken] = useState('');
  const [principalEmail, setPrincipalEmail] = useState('');

 // use effect to get the current user
  useEffect(() => {
    if (accounts.length > 0) {
      
      const name = accounts[0].name;
      const email = accounts[0].username;

      if (name) {

        setCurrentUser(name);
        setPrincipalEmail(email);
      }
     
    }
  }, [accounts, inProgress, instance]);

  return (
    <main className="flex flex-col">
      <Topbar />
      <div className=" flex flex-col gap-10 items-center content-center justify-center ">
        <div className="flex flex-col bg-gray-700 max-h-96 p-4 border-4 text-stone-100 gap-4">
          <h1 className="text-2xl">Welcome to the Claims Workflow PoC</h1><br />
          <h2 className="text-xl">Current User: {currentUser}</h2>
          <h2 className="text-xl">Principal Email: {principalEmail}</h2>
          
        </div>
      </div>
    
    
    </main>

  );
}
