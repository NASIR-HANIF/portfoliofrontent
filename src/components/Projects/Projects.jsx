import React, { Fragment } from 'react'
import "./Projects.css"
import { Button, Typography } from "@mui/material"
import { AiOutlineProject } from "react-icons/ai";
import { Delete } from "@mui/icons-material"
import {FaRegSmileWink} from "react-icons/fa"
import { useDispatch } from 'react-redux';
import { deleteProject, getUser } from '../../actions/user';


export const ProjectCard = ({
  id,
  url,
  projectImage,
  projectTitle,
  description,
  technologies,
  isAdmin = false
}) => {


  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
   await dispatch(deleteProject(id))
    dispatch(getUser())
}

  return (
    <>
      <a href={url} className='projectCard' target='blank'>
        <div>
          <img src={projectImage} alt={projectTitle} />
          <Typography variant='h5'>{projectTitle}</Typography>
        </div>
        <div>
          <Typography variant='h4' >About Project</Typography>
          <Typography >{description}</Typography>
          <Typography variant='h6' >Tech Stack: {technologies}</Typography>
        </div>
      </a>
      {
        isAdmin && (
          <Button
          onClick={()=>deleteHandler(id)}
           style={{ color: "rgba(40,40,40,0.7)" }} >
            <Delete />
          </Button>
        )
      }
    </>
  )
}



const Projects = ({projects}) => {


  return (
    <div className='projects'>
      <Typography variant='h3'>
        Projects <AiOutlineProject />
      </Typography>
      <div className="projectsWrapper">
        {
          projects.map((item) => (
            <ProjectCard 
            id={item._id}
            key={item._id}
            url={item.url}
            projectImage={item.image.url}
            projectTitle={item.title}
            description={item.description}
            technologies={item.techStack}
            />
          ))

        }
      </div>
      <Typography variant='h3' style={{font:"100 1.2rem 'Ubuntu Mono'"}} >
        All The Projects Shown Above Are Made By Me
         <FaRegSmileWink />
      </Typography>
    </div>
  )
}

export default Projects