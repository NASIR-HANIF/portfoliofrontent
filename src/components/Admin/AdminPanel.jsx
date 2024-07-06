import React, { useState, useEffect} from 'react';
import "./AdminPanel.css"
import { Button, Typography } from "@mui/material";
import { AiOutlineProject } from "react-icons/ai"
import { FaYoutube } from "react-icons/fa"
import { MdTimeline } from "react-icons/md"
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { logout, updateUser} from "../../actions/user"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  CLEAR_ERRORS,
  CLEAR_MESSAGE
} from "../../actions/actions"

const AdminPanel = () => {
    const dispatch = useDispatch()
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [skills, setSkills] = useState({});
  const [about, setAbout] = useState({});
  const { message:loginMessage } = useSelector((state) => state.login)
  const { message, error, loading } = useSelector((state) => state.update)


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(name, email, password, about, skills))
  }
  const logoutHandler = () => { 
    dispatch(logout())
  }



  const handleAboutImage = (e) => {
    const Reader = new FileReader();
    const file = e.target.files[0]
    Reader.readAsDataURL(file)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAbout({...about, avatar: Reader.result })
      }
    }
  }


  const handleImages = (e, val) => {
    const Reader = new FileReader();
    const file = e.target.files[0]
    Reader.readAsDataURL(file)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        if (val === 1) {
          setSkills({...skills, image1: Reader.result })
        }
        if (val === 2) {
          setSkills({...skills, image2: Reader.result })
        }
        if (val === 3) {
          setSkills({...skills, image3: Reader.result })
        }
        if (val === 4) {
          setSkills({...skills, image4: Reader.result })
        }
        if (val === 5) {
          setSkills({...skills, image5: Reader.result })
        }
        if (val === 6) {
          setSkills({...skills, image6: Reader.result })
        }
      }
    }
  }


  
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch({ type: CLEAR_ERRORS });
  }
  if (loginMessage) {
    toast.success(loginMessage);
    dispatch({ type: CLEAR_MESSAGE });
  }
  if (message) {
    toast.success(message);
    dispatch({ type: CLEAR_MESSAGE });
  }
}, [error, message, dispatch, loginMessage]);



  return (
    <div className='adminPanel'>
      <div className="adminPanelContainer">
        <Typography variant='h4' >
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            className='adminPanelInputs'
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='adminPanelInputs'
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='adminPanelInputs'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="adminPanelSkill">
            <div>
              <Typography>Skill 1</Typography>
              <input
                className='adminPanelFileUpload'
                type="file"
                accept='image/*'
                onChange={(e) => handleImages (e, 1)}
              />
            </div>
            <div>
              <Typography>Skill 2</Typography>
              <input
                className='adminPanelFileUpload'
                type="file"
                accept='image/*'
                onChange={(e) => handleImages (e, 2)}
              />
            </div>
            <div>
              <Typography>Skill 3</Typography>
              <input
                className='adminPanelFileUpload'
                type="file"
                accept='image/*'
                onChange={(e) => handleImages (e, 3)}
              />
            </div>
            <div>
              <Typography>Skill 4</Typography>
              <input
                className='adminPanelFileUpload'
                type="file"
                accept='image/*'
                onChange={(e) => handleImages (e, 4)}
              />
            </div>
            <div>
              <Typography>Skill 5</Typography>
              <input
                className='adminPanelFileUpload'
                type="file"
                accept='image/*'
                onChange={(e) => handleImages (e, 5)}
              />
            </div>
            <div>
              <Typography>Skill 6</Typography>
              <input
                className='adminPanelFileUpload'
                type="file"
                accept='image/*'
                onChange={(e) => handleImages (e, 6)}
              />
            </div>
          </div>

          <div className="adminPanelAbout">
            <fieldset>
              <legend>About</legend>
              <input
                className='adminPanelInputs'
                type="text"
                placeholder='Name'
                value={about.name}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
              />
              <input
                className='adminPanelInputs'
                type="text"
                placeholder='Title'
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
              />
              <input
                className='adminPanelInputs'
                type="text"
                placeholder='Subtitle'
                value={about.subtitle}
                onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              />
              <input
                className='adminPanelInputs'
                type="text"
                placeholder='Description'
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
              />
              <input
                className='adminPanelInputs'
                type="text"
                placeholder='Quote'
                value={about.quote}
                onChange={(e) => setAbout({ ...about, quote: e.target.value })}
              />
              <input
                className='adminPanelFileUpload'
                type="file"
                placeholder='Choose Avatar'
                accept='image/*'
                onChange={handleAboutImage}
              />
            </fieldset>
          </div>

          <Link to="/admin/timeline">
            TIMELINE <MdTimeline />
          </Link>

          <Link to="/admin/youtube">
            YOUTUBE <FaYoutube />
          </Link>

          <Link to="/admin/project">
            PROJECTS <AiOutlineProject />
          </Link>

          <Button type='submit' variant='contained' disabled={loading} >Update</Button>

        </form>
        <Button
          variant='contained'
          color='error'
          style={{ display: "block", margin: "4vmax auto" }}
          onClick={logoutHandler}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  )
}

export default AdminPanel