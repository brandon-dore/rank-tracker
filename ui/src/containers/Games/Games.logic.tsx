import axios from "axios"
import { useState } from "react"
import { Game } from "../../types/types"

interface UseGames {
  getGames: (id: string | undefined) => Promise<Game[]>
  loading: boolean
}

export const useGames = (): UseGames => {
  const [loading, setLoading] = useState(false)
  const getGames = async (id: string | undefined): Promise<any> => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:3000/games${id ? "/" + id : ""}`,
      )
      setLoading(false)
      return response.data
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return {
    getGames,
    loading,
  }
}
