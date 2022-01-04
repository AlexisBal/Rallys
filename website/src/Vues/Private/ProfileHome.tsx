import React from 'react';
import { useAuth } from "../../Tracking/Auth";


function ProfileHome () {
  let auth = useAuth();

  return (
      <body>
        <div className='safe-container'>
          <h1>Hey {auth.user}</h1>
          <main className="form-settings">
          </main>
        </div>
      </body>
  );
}

export default ProfileHome;