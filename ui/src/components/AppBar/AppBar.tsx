import { Link } from "react-router-dom"

export const AppBar = () => {
  return (
    <div className="pageContainer">
      <div className="appBar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
