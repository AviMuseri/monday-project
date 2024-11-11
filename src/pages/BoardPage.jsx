import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { SideBar } from "../cmps/SideBar"
import { useEffect } from "react"
import { BoardDetails } from "./BoardDetails"
import { MyWork } from "../cmps/MyWork"

export function BoardPage() {

  const { boardId } = useParams()

  const location = useLocation()

  const isBoardPage = location.pathname === "/board"
  const isMyWorkPage = location.pathname === "/my-work"


  return (
    <>
      <section className="board-page main-layout app">
        {/* <main className="main-content"> */}
        <SideBar />
        {isBoardPage && <BoardIndex />}
        {boardId && <BoardDetails />}
        {isMyWorkPage && <MyWork />}
        {/* </main> */}
      </section>
    </>
  )
}
