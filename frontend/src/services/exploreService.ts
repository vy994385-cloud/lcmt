import api from "../api/axios"
import type { ExploreResponse } from "../types/Explore"

export async function getExploreData() {

  const { data } =
    await api.get<ExploreResponse>(
      "/explore"
    )

  return data

}