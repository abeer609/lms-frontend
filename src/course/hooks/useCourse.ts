import { client } from "../../client";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "../schema";

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => client.get<Course>(`courses/${id}/`).then((res) => res.data),
  });
};
