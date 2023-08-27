import React from 'react';
import Button from '../Button';
import Illustration from '../Illustration';
import image from '../../assets/images/undraw_video_upload_3d4u.svg'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function AdminMenu() {

    let username = "";
    const location = useLocation();
    const {state} = location;
    if(state!=null)
        username = state.username;
    const navigate = useNavigate();

    function handleClick(e){
        navigate("../"+e.target.dataset.url,{
            state: {
                username: "admin"
            }
        })
    }

  return <>
    {username!="admin" && <Navigate to="/admin" />}
    {username=="admin" && (
        <>
        <h1>Admin Menu</h1>
        <div className="column">
            <Illustration image={image} />
            <div>
            <Button data-url="addNewVideo" className="button w-100" onClick={handleClick}><span>Add New Video</span> <span className='material-icons-outlined'>pin</span></Button>
            <Button className="button w-100" data-url="updateVideo" onClick={handleClick}><span>Update Video</span> <span className='material-icons-outlined'>pin</span></Button>
            <Button className="button w-100" data-url="deleteVideo" onClick={handleClick}><span>Delete Video</span> <span className='material-icons-outlined'>pin</span></Button>
            <Button className="button w-100" data-url="addNewQuiz" onClick={handleClick}><span>Add New Quiz</span> <span className='material-icons-outlined'>pin</span></Button>
            </div>
        </div>
        </>
    )}
    
  </>;
}

export default AdminMenu;
