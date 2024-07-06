import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from "./components/Contact/Contact"
import Login from './components/Login/Login';
import AdminPanel from './components/Admin/AdminPanel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getUser, loadUser } from './actions/user';
import TimeLine from './components/Admin/Timeline';
import Youtube from './components/Admin/Youtube';
import Project from './components/Admin/Project';
import Loader from "./components/Loader/Loader";
import NotFound from './components/NotFound/NotFound';



function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login)
  const { loading, user } = useSelector((state) => state.user)

  useEffect(() => {

    dispatch(getUser())
    dispatch(loadUser())

  }, [dispatch])

  return (

    <Router>
      {loading ? <Loader /> : (
        <>
          <Header />
          <Routes>
            <Route path='/'
              element={
                <Home
                  youtubes={user?.youtube}
                  timelines={user?.timeline}
                  skills={user?.skills} />}
            />
            <Route
             path='/about'
              element={<About about={user?.about} />} />
            <Route
             path='/projects'
              element={<Projects projects={user?.projects} />} />
            <Route
             path='/contact'
              element={<Contact />} />
            <Route
             path='/account'
              element={isAuthenticated ? <AdminPanel /> : <Login />} />
            <Route
             path='/admin/timeline'
              element={isAuthenticated ? <TimeLine /> : <Login />} />
            <Route
             path='/admin/youtube'
              element={isAuthenticated ? <Youtube /> : <Login />} />
            <Route
             path='/admin/project'
              element={isAuthenticated ? <Project /> : <Login />} />

                <Route path='*'
                  element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>

  )
}

export default App;
