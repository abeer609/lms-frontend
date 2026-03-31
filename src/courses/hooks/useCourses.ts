import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {type Course } from "../../course/Course"
import { client } from "../../client"


const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: ()=>client.get<Course[]>('/courses/').then(res=>res.data)
  })
}

export default useCourses