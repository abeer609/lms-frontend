import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import type { Lesson } from "../../course/schema";

const useLesson = (id: string) => {
  return useQuery({
    queryKey: ["lessons", id],
    queryFn: () =>
      client.get<Lesson>(`/lessons/${id}/`).then((res) => res.data),
  });
};

export default useLesson;
