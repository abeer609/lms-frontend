import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";


const useGemini = (prompt: string) => {
  return useQuery({
    queryKey: [prompt],
    enabled: !!prompt,
    queryFn: () =>
      client
        .post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              "X-goog-api-key": "AIzaSyDsogwKeVtCBHga4MRgPy28obf2Yb6TeiQ",
            },
          }
        )
        .then((res) => res.data.candidates[0].content.parts[0].text),
  },
)
};

export default useGemini;
