import { useState } from "react"
import { useUsers } from "./Users.logic"
import { User } from "../../types/types"

import "./Users.css"

export const Users = () => {
  const { getUsers, loading } = useUsers()
  const [users, setUsers] = useState<User[]>()
  const [id, setId] = useState<string | undefined>()

  const handleGetUsers = (id?: string) => {
    getUsers(id).then((response) => {
      setUsers(response)
    })
  }

  return (
    <div className="pageContainer">
      <h1>Users</h1>
      <div className="actionsContainer">
        <div className="inputContainer">
          <input type="text" onChange={(event) => setId(event.target.value)} />
          <button disabled={!id} onClick={() => handleGetUsers(id)}>
            Get User
          </button>
        </div>
        <div>
          <button onClick={() => handleGetUsers()}>Get Users</button>
        </div>
      </div>
      <br />
      {loading ? (
        "Loading"
      ) : users ? (
        <p>
          Users:
          {JSON.stringify(users)}
        </p>
      ) : (
        <p>User not found</p>
      )}
    </div>
  )
}
