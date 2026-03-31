import { useQuery } from "@tanstack/react-query";
import React from "react";
import { client } from "../client";
import { type Assignment } from "../course/schema";

const useAssignment = (assignmentId: string) => {
  return useQuery({
    queryKey: ["assignments", assignmentId],
    queryFn: () =>
      client
        .get<Assignment>(`/assignments/${assignmentId}/`)
        .then((res) => res.data),
  });
};

export default useAssignment;
