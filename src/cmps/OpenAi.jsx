import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { addAiBoard, resetFilterBy, saveBoardDemo } from "../store/actions/board.actions"
import loader from '../assets/img/loader.gif'
import { makeId } from "../services/util.service"
import { ADD_BOARD, SET_BOARD } from "../store/reducers/board.reducer"
import { useDispatch } from "react-redux"
import { boardService } from "../services/board/board.service.remote"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function OpenAi({ isOpen = false }) {

    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    const navigate = useNavigate() // Initialize the navigate function
    const dispatch = useDispatch() // Initialize the navigate function

    let timeOutRef = useRef()
    let timeOutRef2 = useRef()
    let timeOutRef3 = useRef()
    const updateOneRef = useRef()
    const updateTwoRef = useRef()
    const updateThreeRef = useRef()

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setData(prevData => ({ ...prevData, [field]: value }))
    }



    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            setIsLoading(true)
            showSuccessMsg('Ai started board creation')
            updateOneRef.current.style.display = 'block'
            timeOutRef2 = setTimeout(() => {
                updateTwoRef.current.style.display = 'block'
            }, 3500)
            const savedBoard = await addAiBoard(data)
            if (savedBoard) {
                updateThreeRef.current.style.display = 'block'
                setIsModal(false)
                navigate(`/board/${savedBoard._id}`)
                setIsLoading(false)
                setData(prevData => ({ ...prevData, theme: '' }))
                showSuccessMsg('Ai board created successfully')
            }
        } catch (err) {
            // console.log(err)
            showErrorMsg('Ai failed create board , try again later')
        }
    }

    async function onSubmitDemo(ev) {
        ev.preventDefault()
        try {
            setIsLoading(true)
            updateOneRef.current.style.display = 'block'
            const demoAiBoard = {
                "title": "Vacation Planner",
                "owner": {
                    "_id": "673c5da78af25152208746cb",
                    "fullname": "Avi Museri",
                    "imgUrl": "https://res.cloudinary.com/drj1liym1/image/upload/v1732014309/kdnfyljpgquuwhqy0n7b.jpg",
                    "isAdmin": null
                },
                "isStarred": false,
                "archivedAt": null,
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#01c875",
                        "type": "status"
                    },
                    {
                        "id": "l102",
                        "title": "Stuck",
                        "color": "#e02f4b",
                        "type": "status"
                    },
                    {
                        "id": "l103",
                        "title": "Working on it",
                        "color": "#fdbb63",
                        "type": "status"
                    },
                    {
                        "id": "l104",
                        "title": "Bonus",
                        "color": "#b57ce3",
                        "type": "status"
                    },
                    {
                        "id": "l105",
                        "title": "Coming soon",
                        "color": "#7aaffd",
                        "type": "status"
                    },
                    {
                        "id": "l106",
                        "title": "High",
                        "color": "#6545a9",
                        "type": "priority"
                    },
                    {
                        "id": "l107",
                        "title": "Medium",
                        "color": "#777ae5",
                        "type": "priority"
                    },
                    {
                        "id": "l108",
                        "title": "Low",
                        "color": "#7aaffd",
                        "type": "priority"
                    },
                    {
                        "id": "l109",
                        "title": "Critical",
                        "color": "#5c5c5c",
                        "type": "priority"
                    }
                ],
                "members": [
                    {
                        "_id": "673c5da78af25152208746cb",
                        "fullname": "Avi Museri",
                        "imgUrl": "https://res.cloudinary.com/drj1liym1/image/upload/v1732014309/kdnfyljpgquuwhqy0n7b.jpg",
                        "isAdmin": null
                    }
                ],
                "groups": [
                    {
                        "id": "g10b",
                        "title": "Preparation",
                        "color": "#ffbe00",
                        "tasks": [
                            {
                                "id": "ta1a",
                                "title": "Book Flights",
                                "assignedTo": [],
                                "status": "Working on it",
                                "priority": "High",
                                "conversation": []
                            },
                            {
                                "id": "ta1b",
                                "title": "Pack Bags",
                                "assignedTo": [],
                                "status": "Stuck",
                                "priority": "Medium",
                                "conversation": []
                            },
                            {
                                "id": "ta1c",
                                "title": "Research Destination",
                                "assignedTo": [],
                                "status": "Done",
                                "priority": "Low",
                                "conversation": []
                            }
                        ]
                    },
                    {
                        "id": "g10c",
                        "title": "On the Road",
                        "color": "#ff9000",
                        "tasks": [
                            {
                                "id": "ta2a",
                                "title": "Visit Sights",
                                "assignedTo": [],
                                "status": "Coming soon",
                                "priority": "High",
                                "conversation": []
                            },
                            {
                                "id": "ta2b",
                                "title": "Try Local Foods",
                                "assignedTo": [],
                                "status": "Working on it",
                                "priority": "Medium",
                                "conversation": []
                            },
                            {
                                "id": "ta2c",
                                "title": "Attend Local Events",
                                "assignedTo": [],
                                "status": "Bonus",
                                "priority": "Low",
                                "conversation": []
                            }
                        ]
                    },
                    {
                        "id": "g10d",
                        "title": "Post-Trip",
                        "color": "#ffa500",
                        "tasks": [
                            {
                                "id": "ta3a",
                                "title": "Share Photos",
                                "assignedTo": [],
                                "status": "Coming soon",
                                "priority": "Medium",
                                "conversation": []
                            },
                            {
                                "id": "ta3b",
                                "title": "Write Travel Blog",
                                "assignedTo": [],
                                "status": "Stuck",
                                "priority": "High",
                                "conversation": []
                            },
                            {
                                "id": "ta3c",
                                "title": "Unpack",
                                "assignedTo": [],
                                "status": "Done",
                                "priority": "Low",
                                "conversation": []
                            }
                        ]
                    }
                ],
                "activities": [],
                "cmpsLabels": [
                    {
                        "type": "MemberPicker",
                        "title": "Person",
                        "id": "edu0F",
                        "class": "members"
                    },
                    {
                        "type": "StatusPicker",
                        "title": "Status",
                        "id": "13Mkz",
                        "class": "status"
                    },
                    {
                        "type": "PriorityPicker",
                        "title": "Priority",
                        "id": "NJSgB",
                        "class": "priority"
                    },
                    {
                        "type": "DatePicker",
                        "class": "date",
                        "title": "Date",
                        "id": "sMywTO"
                    },
                    {
                        "type": "ProgressBar",
                        "class": "progress",
                        "title": "Progress",
                        "id": "7xaorb"
                    },
                    {
                        "type": "FilePicker",
                        "class": "file",
                        "title": "File",
                        "id": "D6vMaM"
                    }
                ]
            }
            showSuccessMsg('Ai started board creation')

            const saved = await saveBoardDemo(demoAiBoard)

            if (saved) {
                timeOutRef2 = setTimeout(() => {
                    updateTwoRef.current.style.display = 'block'
                }, 3500)
                timeOutRef3 = setTimeout(() => {
                    updateThreeRef.current.style.display = 'block'
                }, 6000)
                timeOutRef = setTimeout(() => {
                    resetFilterBy()
                    setIsLoading(false)
                    setIsModal(false)
                    dispatch({ type: SET_BOARD, board: saved })
                    navigate(`/board/${saved._id}`)
                    showSuccessMsg('Ai board created successfully')

                }, 7000)
            }

        } catch (err) {
            // console.log(err)
            // showErrorMsg('Ai failed create board , try again later')

        }
    }



    return (
        <section className="generate">
            <button className={`gen-btn ${isOpen ? 'open' : 'close'}`} onClick={() => setIsModal(true)}><i class="fa-solid fa-robot"></i></button>
            {isModal && <div onCanPlay={() => setIsModal(false)} className="backdrop"></div>}
            {isModal && <div className="gen-modal">
                <h2 className="board-ai">Board Ai</h2>
                <h2 className="welcome-title">Hello , please insert a board theme</h2>
                <button type="button" className="close" onClick={() => setIsModal(false)}>x</button>
                <div className="updates">
                    <p ref={updateOneRef} className="update one">Generating board</p>
                    <p ref={updateTwoRef} className="update two">Creating tasks</p>
                    <p ref={updateThreeRef} className="update three">Done</p>
                </div>
                <form onSubmit={onSubmitDemo}>
                    <input onChange={handleChange} type="text" placeholder="Message boardAi" name="theme" />
                    <button><i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                </form>
                {isLoading && <img src={loader} alt="" />}
            </div>}
        </section>
    )
}