import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addTimeline, deleteTimeline, getUser } from '../../actions/user';
import { MdKeyboardBackspace } from "react-icons/md"
import { CLEAR_ERRORS, CLEAR_MESSAGE } from '../../actions/actions';
import { Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Timeline = () => {
    const { message, error, loading } = useSelector((state) => state.update)
    const { user } = useSelector((state) => state.user)
    const { message:loginMessage } = useSelector((state) => state.login)
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(addTimeline(title, description, date))
        dispatch(getUser())
    }


    const deleteHandler = async (id) => {
        await dispatch(deleteTimeline(id))
        dispatch(getUser())
    }


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: CLEAR_ERRORS })
        }

        if (message) {
            toast.success(message)
            dispatch({ type: CLEAR_MESSAGE })
        }
        
        if (loginMessage) {
            toast.success(loginMessage)
            dispatch({ type: CLEAR_MESSAGE })
        }
        
    }, [ error, message, dispatch, loginMessage])


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
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className='adminPanelInputs'
                        type="text"
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        className='adminPanelInputs'
                        type="date"
                        placeholder='Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />


                    <Link to="/account">
                        BACK <MdKeyboardBackspace />
                    </Link>


                    <Button type='submit' onSubmit={submitHandler} variant='contained' disabled={loading} >
                        Add
                    </Button>

                </form>
                <div className="adminPanelYoutubeVideos">
                    {
                        user && user.timeline && user.timeline.map((item) => (
                            <div className="youtubeCard" key={item._id}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body1" style={{ letterSpacing: "2px" }}>
                                    {item.description}
                                </Typography>
                                <Typography variant="body1" style={{ fontWeight: 600 }}>
                                    {item.date.toString().split("T")[0]}
                                </Typography>

                                <Button
                                    style={{
                                        margin: "auto",
                                        display: "block",
                                        color: "rgba(40,40,40,0.7)",
                                    }}
                                    onClick={() => deleteHandler(item._id)}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Timeline