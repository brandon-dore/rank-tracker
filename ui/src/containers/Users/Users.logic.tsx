import axios from "axios"
import { useState } from "react"
import { User } from "../../types/types"

interface UseGames {
  getUsers: (id: string | undefined) => Promise<User[]>
  loading: boolean
}

export const useUsers = (): UseGames => {
  const [loading, setLoading] = useState(false)
  const getUsers = async (id: string | undefined): Promise<any> => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:3000/users${id ? "/" + id : ""}`,
      )
      setLoading(false)
      return response.data
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return {
    getUsers,
    loading,
  }
}
