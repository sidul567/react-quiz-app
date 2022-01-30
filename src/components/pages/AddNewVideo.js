import React from 'react';
import AddNewVideoForm from '../AddNewVideoForm';
import Illustration from '../Illustration';
import image from '../../assets/images/undraw_video_upload_3d4u.svg'
import { Navigate, useLocation, useParams } from 'react-router-dom';

function AddNewVideo() {
  let username = "";
  const location = useLocation();
  const {state} = location;
  if(state!=null)
      username = state.username;
  return (
  <>
    {username!="admin" && <Navigate to="/admin" />}
    {username=="admin" && (
      <>
        <h1>Add New Video</h1>
        <div className='column'>
            <Illustration image={image} />
            <AddNewVideoForm/>
        </div>
        </>
    )}
    
  </>);
}

export default AddNewVideo;
