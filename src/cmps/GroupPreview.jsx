import { useState } from "react"
import { TaskList } from "../cmps/TaskList"
import { Draggable } from "react-beautiful-dnd"
import { updateGroup } from "../store/actions/board.actions"

export function GroupPreview({
  group,
  onRemoveGroup,
  index,
  groupsLength
}) {
  const { title, tasks } = group

  let taskStrCount = ''
  if (tasks.length === 1) taskStrCount = `${tasks.length} Task`
  if (tasks.length > 1) taskStrCount = `${tasks.length} Tasks`
  if (tasks.length === 0) taskStrCount = `No tasks`

  const [groupTitle, setGroupTitle] = useState(title)
  const [isEditGroupTitle, setIsEditGroupTitle] = useState(false)

  const handleTitleChange = (e) => setGroupTitle(e.target.value)

  const saveTitle = async (ev) => {
    ev.preventDefault()
    try {
      const updatedGroup = { ...group, title: groupTitle }
      await updateGroup(updatedGroup)
      setIsEditGroupTitle(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Draggable
        draggableId={group.id}
        index={index}
        key={group.id}
      >
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="group-preview">
              <header
                className="flex align-center"
                {...provided.dragHandleProps}
              >
                {groupsLength > 1 && < button
                  onClick={() => onRemoveGroup(group.id)}
                  className="delete-group-btn"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>}
                <p
                  style={{
                    color: group.color,
                  }}>
                  <i className="fa-solid fa-chevron-down"></i>
                </p>

                {isEditGroupTitle ?
                  <form onSubmit={saveTitle}>
                    <input
                      type="text"
                      value={groupTitle}
                      onChange={handleTitleChange}
                      onBlur={saveTitle}
                      style={{
                        color: group.color,
                        width: '500px',
                        maxWidth: '500px',
                      }}
                      className="group-title"
                      autoFocus
                    />
                  </form>

                  :
                  <h4
                    className="group-title"
                    onClick={() => setIsEditGroupTitle(true)}
                    style={{ color: group.color, borderColor: group.color }}
                  >{groupTitle}</h4>
                }

                <span className="tasks-count">{taskStrCount}</span>

              </header>
              <main className="flex">
                {/* <div
                  className="side-group-color"
                  }
                ></div> */}
                <TaskList
                  group={group}
                />
              </main>
            </div>
          </div>
        )}

      </Draggable >
    </>
  )
}
