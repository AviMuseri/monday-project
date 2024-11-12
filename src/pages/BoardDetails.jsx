import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadBoard, loadBoards } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { useSelector } from "react-redux"
import { TaskConversation } from "../cmps/TaskConversation"

export function BoardDetails() {
  const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
  const board = useSelector(storeState => storeState.boardModule.currBoard)

  const { boardId, taskId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) initBoard()
  }, [boardId])

  async function initBoard() {
    try {
      await loadBoard(boardId)
    } catch (err) {
      console.log('Had issues in board details', err)
      navigate('/board')
    }
  }

  if (!board) return <div>Loading...</div>

  return (
    boardId ? (
      <section className="board-details">
        <BoardDetailsHeader board={board} />
        <GroupList
          board={board} />
        <TaskConversation />
      </section>
    ) : (
      <div>Board not found.</div>
    )
  )
}
