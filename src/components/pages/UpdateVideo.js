import React from 'react';
import Illustration from '../Illustration';
import image from '../../assets/images/undraw_video_upload_3d4u.svg'
import { Navigate, useLocation } from 'react-router-dom';
import UpdateVideoForm from '../UpdateVideoForm';

function UpdateVideo() {

  let username = "";
  const location = useLocation();
  const {state} = location;
  if(state!=null)
      username = state.username;

  return (<>
  {username!="admin" && <Navigate to="/admin" />}
  {username=="admin" && (
    <>
      <h1>Update Video</h1>
      <div className='column'>
          <Illustration image={image} />
          <UpdateVideoForm/>
      </div>
      </>
  )}
  
</>);
}

export default UpdateVideo;