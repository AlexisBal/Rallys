import React from 'react';
import { useAuth } from "../../Tracking/Auth";


function ProfileHome () {
  let auth = useAuth();
  console.log(auth.keybis);

  return (
      <body>
        <div className='safe-container'>
          <h1>Hey {auth.keybis}</h1>
          <main className="form-settings">
          </main>
        </div>
      </body>
  );
}

export default ProfileHome;