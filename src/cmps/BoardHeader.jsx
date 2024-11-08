export function BoardHeader() {
    return (
      <>
        <header className="board-header flex justify-between align-center">
          <p>Monday work management</p>
          <div className="board-header-btns flex  align-center">
            <div>
              <button>
                <i class="fa-regular fa-bell"></i>
              </button>
              <button>
                <i class="fa-solid fa-inbox"></i>
              </button>
              <button>
                <i class="fa-solid fa-user-plus"></i>
              </button>
            </div>
            <hr/>
            <div>
              <button>
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <button>LOGO USER_IMG</button>
            </div>
          </div>
        </header>
      </>
    )
  }