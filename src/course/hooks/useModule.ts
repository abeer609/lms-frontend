import { useQuery } from "@tanstack/react-query"
import { client } from "../../client"
import type { Module } from "../Course"

const useModule = (id?:string) => {
  return useQuery({
    queryKey: ['moduels', id],
    queryFn: ()=>client.get<Module>(`/modules/${id}/`).then(res=>res.data),
    enabled: !!id
  })
}

export default useModule