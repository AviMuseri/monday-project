import { useRef } from "react"
import rename from '../assets/img/rename-icon.svg'
import expand from '../assets/img/expand-icon.svg'
import trash from '../assets/img/trash-icon.svg'
import newTab from '../assets/img/open-in-new-tab-icon.svg'
import copyLink from '../assets/img/copy-link-icon.svg'
import moveTo from '../assets/img/move-to-icon.svg'
import duplicate from '../assets/img/duplicate-icon.svg'
import plus from '../assets/img/plus-modal-icon.svg'
import addSubitem from '../assets/img/add-subitem-icon.svg'
import convertSubitem from '../assets/img/convert-subitem-icon.svg'
import archive from '../assets/img/archive-icon.svg'
import star from '../assets/img/star.svg'



export function BoardOptionsModal({ onClose, boardId, onAddToFavorites, modalPosition, onDelete, isStarred, onRename }) {
    const modalRef = useRef(null)

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                ref={modalRef}
                className="modal-content"
                style={{
                    top: modalPosition.top,
                    left: modalPosition.left,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={() => { onRename(boardId); onClose() }}><img src={rename} alt="rename" />Rename Board</button>
                <div className="divider"></div>
                <button onClick={() => onDelete(boardId)}><img src={trash} alt="trash" />Delete</button>
                <button onClick={() => onAddToFavorites(boardId)}>
                    {isStarred ? <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38651 0.919639L8.72889 1.24523L9.38698 0.920593L11.129 4.45187L15.0309 5.02032C15.2789 5.05775 15.5116 5.16372 15.7026 5.32629C15.8937 5.48886 16.0355 5.70156 16.1121 5.94041C16.1888 6.17927 16.1972 6.43478 16.1364 6.67816C16.0757 6.92112 15.9484 7.14233 15.769 7.31695L15.768 7.31784L12.9482 10.0673L13.6135 13.9517L13.6138 13.9535C13.6571 14.2021 13.6297 14.4578 13.5347 14.6916C13.4394 14.9259 13.2801 15.1287 13.0749 15.2767C12.8698 15.4246 12.6271 15.5118 12.3747 15.5283C12.1238 15.5446 11.8735 15.4904 11.6519 15.3718L8.17876 13.5456L4.69674 15.3773C4.47515 15.4959 4.22475 15.5502 3.97387 15.5338C3.72146 15.5174 3.47877 15.4302 3.27362 15.2823C3.06847 15.1343 2.90914 14.9315 2.81388 14.6972C2.71885 14.4634 2.69143 14.2076 2.73473 13.959L2.73504 13.9573L3.4004 10.0728L0.58498 7.32119L0.58397 7.32021C0.404543 7.1456 0.277339 6.92443 0.216658 6.68151C0.155863 6.43814 0.164258 6.18262 0.240897 5.94377C0.317535 5.70491 0.45937 5.49221 0.650413 5.32964C0.841455 5.16707 1.07411 5.0611 1.32215 5.02367L1.32538 5.02319L5.22851 4.45192L6.97099 0.919639C7.08244 0.694536 7.25457 0.505061 7.46798 0.37259C7.68139 0.240118 7.92757 0.169922 8.17875 0.169922C8.42993 0.169922 8.67611 0.240118 8.88952 0.37259C9.10292 0.505061 9.27506 0.694536 9.38651 0.919639Z" fill="#FFCB00"/></svg>
                    : <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38651 0.919639L8.72889 1.24523L9.38698 0.920593L11.129 4.45187L15.0309 5.02032C15.2789 5.05775 15.5116 5.16372 15.7026 5.32629C15.8937 5.48886 16.0355 5.70156 16.1121 5.94041C16.1888 6.17927 16.1972 6.43478 16.1364 6.67816C16.0757 6.92112 15.9484 7.14233 15.769 7.31695L15.768 7.31784L12.9482 10.0673L13.6135 13.9517L13.6138 13.9535C13.6571 14.2021 13.6297 14.4578 13.5347 14.6916C13.4394 14.9259 13.2801 15.1287 13.0749 15.2767C12.8698 15.4246 12.6271 15.5118 12.3747 15.5283C12.1238 15.5446 11.8735 15.4904 11.6519 15.3718L8.17876 13.5456L4.69674 15.3773C4.47515 15.4959 4.22475 15.5502 3.97387 15.5338C3.72146 15.5174 3.47877 15.4302 3.27362 15.2823C3.06847 15.1343 2.90914 14.9315 2.81388 14.6972C2.71885 14.4634 2.69143 14.2076 2.73473 13.959L2.73504 13.9573L3.4004 10.0728L0.58498 7.32119L0.58397 7.32021C0.404543 7.1456 0.277339 6.92443 0.216658 6.68151C0.155863 6.43814 0.164258 6.18262 0.240897 5.94377C0.317535 5.70491 0.45937 5.49221 0.650413 5.32964C0.841455 5.16707 1.07411 5.0611 1.32215 5.02367L1.32538 5.02319L5.22851 4.45192L6.97099 0.919639C7.08244 0.694536 7.25457 0.505061 7.46798 0.37259C7.68139 0.240118 7.92757 0.169922 8.17875 0.169922C8.42993 0.169922 8.67611 0.240118 8.88952 0.37259C9.10292 0.505061 9.27506 0.694536 9.38651 0.919639Z" fill="white" stroke="black"/></svg>}
                    {isStarred ? ' Remove from Favorites' : ' Add to Favorites'}
                </button>

            </div>
        </div>
    )
}
