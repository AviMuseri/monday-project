import logo from '../assets/img/logo.png'

export function BoardHeader() {
  return (
    <>
      <header className="board-header flex justify-between align-center">
        <div className="flex align-center">
          <img src={logo} alt="Logo" />
          <h1 className="logo-home-nav">Sundae</h1>
        </div>
        <div className="board-header-btns flex  align-center">
          <div>
            <button>
              <i className="fa-regular fa-bell"></i>
            </button>
            <button>
              <i className="fa-solid fa-inbox"></i>
            </button>
            <button>
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </div>
          <hr />
          <div>
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button>LOGO USER_IMG</button>
          </div>
        </div>
      </header>
    </>
  )
}