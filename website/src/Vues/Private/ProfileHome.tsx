import React from 'react';
import { useAuth } from "../../Tracking/Auth";


function ProfileHome () {
  const { key } = useAuth();

  return (
      <body>
        <div className='safe-container'>
          <h1>Hey {key}</h1>
          <main className="form-settings">
          </main>
        </div>
      </body>
  );
}

export default ProfileHome;