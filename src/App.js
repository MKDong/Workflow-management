import { Route, Routes } from 'react-router';
import './App.css';
import Home from './layout/Home';
import Login from './component/auth/Login';
import Auth from './layout/auth'
import Register from './component/auth/Register';
import ListTask from './component/usser/tasks/ListTask';
import Profile from './component/usser/Profile';
import Statistical from './component/usser/Statistical';
import { useEffect } from 'react';
import { getPopulate } from './service/getAllApi';
import { useDispatch, useSelector } from 'react-redux';
import { taskAllNoPaginition } from './redux/couterSlice/couterSlice';
import PrivateRouter from './component/auth/PrivateRouter'

function App() {
  const dispatch = useDispatch()
  const reRenderr = useSelector((store) => store.counter.ItemreRender);
  useEffect(() => {
    async function getAllTask() {
        let res = await getPopulate();
        dispatch(taskAllNoPaginition(res.data.data))
        // console.log(res.data.data);
    }
    getAllTask();
}, [dispatch, reRenderr]);
  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route index element={<ListTask/>} />
        <Route path='profile' element={<PrivateRouter> <Profile/> </PrivateRouter>} />
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
