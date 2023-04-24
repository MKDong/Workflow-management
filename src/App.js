import { Route, Routes } from 'react-router';
import './App.css';
import Home from './layout/Home';
import Login from './component/auth/Login';
import Auth from './layout/auth'
import Register from './component/auth/Register';
import ListTask from './component/usser/tasks/ListTask';
import Profile from './component/usser/Profile';
import Statistical from './component/usser/Statistical';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route index element={<ListTask/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='statistical' element={<Statistical/>} />
      </Route>

      <Route path='/auth' element={<Auth/>}>
        <Route index element={<Login/>} />
        <Route path='register' element={<Register/>} />
      </Route>
    </Routes>
  );
}

export default App;
