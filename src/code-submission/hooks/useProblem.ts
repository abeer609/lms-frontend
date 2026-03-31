import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import { type Problem } from "../schema";
import { useAppSelector } from "../../hooks";
import type {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

const useProblem = (id: string) => {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const token = useAppSelector((state) => state.authReducer.access);

  return useQuery({
    queryKey: ["problems", id],
    queryFn: () =>
      client
        .get<Problem>(`/problems/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });
};

export default useProblem;
