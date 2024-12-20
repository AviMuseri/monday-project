import { useSelector } from "react-redux"
import { addMemberToBoard, removeMemberFromBoard, setBackdrop } from "../store/actions/board.actions"
import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ManageBoardMembers({ board, setManageModal }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const users = useSelector(storeState => storeState.userModule.users)

    const [filterByToEdit, setFilterByToEdit] = useState({ name: '' })
    const [availableMembers, setAvailableMembers] = useState(users)

    useEffect(() => {
        setAvailableMembers(users)
    }, [users])

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onClose() {
        setManageModal(false)
    }

    useEffect(() => {
        if (filterByToEdit.name) {
            const regex = new RegExp(filterByToEdit.name, "i")
            setAvailableMembers(users.filter((user) => regex.test(user.fullname)))
        } else {
            setAvailableMembers(users)
        }
    }, [filterByToEdit])

    async function onAddMember(user) {
        try {
            await addMemberToBoard(user)
            onClose()
            showSuccessMsg('Member added to board successfully')
        } catch (err) {
            // console.log(err)
            showErrorMsg('Failed add member to board')
        }
    }

    async function onRemoveMember(user) {
        try {
            await removeMemberFromBoard(user)
            showSuccessMsg('Member removed from board successfully')

            // onClose()
        } catch (err) {
            // console.log(err)
            showErrorMsg('Failed remove member to board')

        }
    }

    return (
        <>
            <div onClick={onClose} className="backdrop"></div >

            <section className="manage-members">
                <button onClick={onClose} className="close-btn"><i class="fa-solid fa-xmark"></i></button>
                <div className="modal-title">Manage members</div>
                <div className="search">
                    <input type="search" placeholder="Search by name" name="name" value={filterByToEdit.name} onChange={handleChange} />
                    {filterByToEdit.name && <div className="options">
                        {availableMembers.map((user, idx) => {
                            const isInclude = board.members.some(member => member._id === user._id)
                            if (!isInclude) return (
                                <div onClick={() => onAddMember(user)} key={user._id}
                                    className='suggested-member user'>
                                    <img className='user-img' src={user.imgUrl} alt="" />
                                    <div className='user-name'>
                                        <span>{user.fullname}</span>
                                    </div>
                                </div>

                            )

                        })}
                    </div>}
                </div>

                <div className="assign-users">
                    <div className="board-owner user">
                        <img className="user-img" src={board.owner.imgUrl}></img>
                        <div className="user-name">{board.owner.fullname}</div>
                        <div className="crown-container">
                            <i class="fa-solid fa-crown"></i>
                        </div>
                    </div>
                    {board.members.map(member => {
                        if (member._id !== board.owner._id) {
                            return (
                                // return (
                                < div key={member._id} className="user" >
                                    <img className="user-img" src={member.imgUrl}></img>
                                    <div className="user-name">{member.fullname}</div>
                                    {user._id === board.owner._id && <button onClick={() => onRemoveMember(member)} className="remove-btn"><i class="fa-solid fa-xmark"></i></button>}
                                </div>
                            )
                        }

                    })}
                </div>
            </section >
        </>
    )
}