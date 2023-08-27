import '../styles/App.css'
import Layout from '../components/Layout'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result'
import { useAuth } from '../contexts/AuthContext';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Loader from './Loader';
import AddNewVideo from './pages/AddNewVideo';
import AdminLogin from './pages/AdminLogin';
import AdminMenu from './pages/AdminMenu';
import UpdateVideo from './pages/UpdateVideo';
import AddNewQuiz from './pages/AddNewQuiz';
import QuizSubmit from './pages/QuizSubmit';
import DeleteVideo from './pages/DeleteVideo';
function App() {
  const {currentUser} = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<Home/>} />    
            <Route path="/signup" element={!currentUser?<Signup/>:<Navigate to="/" />} />    
            <Route path="/login" element={!currentUser?<Login/>:<Navigate to="/" />} />    
            <Route path="/quiz/:id" element={currentUser?<Quiz/>:<Navigate to="/login" />} />    
            <Route path="/result/:id" element={currentUser?<Result/>:<Navigate to="/login" />} />    
            <Route path="/admin" element={<AdminLogin/>} />    
            <Route path="/addNewVideo" element={<AddNewVideo/>} />    
            <Route path="/adminMenu" element={<AdminMenu/>} />    
            <Route path="/updateVideo" element={<UpdateVideo/>} />    
            <Route path="/addNewQuiz" element={<AddNewQuiz/>} />    
            <Route path="/quizSubmit" element={<QuizSubmit/>} />    
            <Route path="/deleteVideo" element={<DeleteVideo/>} />    
        </Routes>
      </Layout>  
    </BrowserRouter>
  );
}

export default App;
