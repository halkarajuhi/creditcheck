import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Addfaq from './FAQ/Addfaq';
import Showfaq from './FAQ/Showfaq';
import  Editfaq from './FAQ/Editfaq';
import Updateckeditor from './Aboutus/Updateckeditor';
import Addckeditor from './Aboutus/Addckeditor';
import Userlist from './users/Userlist';
import Showuser from './users/Showuser'; 
import Chat from './chat/Chat';
import Profile from './component/Profile'
import Addreport from './Report/Addreport';
import Showreport from './Report/Showreport';
import Editreport from './Report/Editreport';


function App() {
  const  userid = localStorage.getItem('userid');
  return (
    <div className="App">
       
       <BrowserRouter>
  <Routes>
  {userid == "" || userid == null ? (  <Route exact path="/" element={<Login/>}/>)
     :(<Route exact path="/" element={<Dashboard/>}/>)}
    
     <Route exact path="/Addfaq" element={<Addfaq/>}/>
      <Route exact path="/Showfaq" element={<Showfaq/>}/>
      <Route exact path="/editfaq/:id" element={<Editfaq/>}/>
      <Route exact path="/Updateckeditor" element={<Updateckeditor/>}/>
      <Route exact path="/Addckeditor" element={<Addckeditor/>}/>
      <Route exact path="/users" element={<Userlist/>}/>  
      <Route exact path="/showuser/:id" element={<Showuser/>}/>
      <Route exact path="/chat" element={<Chat/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
      <Route exact path="/addreport" element={<Addreport/>}/>
      <Route exact path="/showreport" element={<Showreport/>}/>
      <Route exact path="/editreport/:id" element={<Editreport/>}/>
      
     </Routes>
    </BrowserRouter>
  
    </div>
  );
}


export default App;
