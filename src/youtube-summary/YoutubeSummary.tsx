import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbHome, BreadcrumbSeparator, Breadcrumb } from "../components/breadcrumbs"
import { SidebarLayoutContent } from "../components/sidebar-layout";
import Markdown from 'react-markdown'
import { client } from "../client";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

function toEmbedUrl(youtubeUrl:string) {
    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get("v"); // get the 'v' param
    return `https://www.youtube.com/embed/${videoId}`;
}

function getVideoId(url:string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}



const YoutubeSummary = () => {
  const [summaryId, setSummaryId] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")
  const [status, setStatus] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const createSummary = async (youtubeUrl: string) => {
    setLoading(true)
    try {
      const response = await client.post("youtube/summarize/", { "url": youtubeUrl })
      setSummaryId(response.data.id)
      setStatus(response.data.status)
      setLoading(false)
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message)
        setLoading(false)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createSummary(url)
  }
  useEffect(() => {
    if (!summaryId) return;
    let intervalId: number;

    const fetchData = async () => {
      console.log('fetching...')
      try {
        const response = await client.get(`/youtube/summarize/${summaryId}/`);
        const result = response.data;
        console.log(result)
        // ✅ stop polling if condition is met
        if (result.status === "COMPLETED") {
          clearInterval(intervalId);
          setSummary(result.summarized_text);
          setStatus('COMPLETED')
          console.log("Polling stopped — video processing completed!");
        }
      } catch (error) {
        clearInterval(intervalId)
        if (error instanceof AxiosError)
          setError(error.message)
      }
    };

    // fetch immediately on mount
    // set interval for polling
    intervalId = setInterval(fetchData, 5000); // 5 seconds

    // cleanup on unmount
    return () => clearInterval(intervalId);
  }, [summaryId]);


  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator className="max-md:hidden" />

          <BreadcrumbSeparator />
          <Breadcrumb>Youtube Summary</Breadcrumb>
        </Breadcrumbs>
      }>

      <div className="mx-auto flex max-w-xl gap-x-10 py-4">
        <div className="w-full flex-1">
          <div>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                disabled={loading || status == 'PENDING'}
                onChange={(e) => setUrl(e.target.value)}
                type="url"
                id="url"
                defaultValue={url}
                className="block w-full rounded-md  px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 border-2 border-indigo-500 transition-colors focus:ring-indigo-500"
                name="url"
                placeholder="Enter the youtube url..."
              />
              <button
                disabled={loading}
                className="flex gap-2 justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >Summarize {loading && <span><Loader2 className="h-4 w-4 mr-2 animate-spin" /></span>}</button>
            </form>
          </div>
          {status == "COMPLETED" && <iframe className="mt-4" width="100%" height="345" src={`https://www.youtube.com/embed/${getVideoId(url)}`}>
          </iframe>}
          {summary &&
            <div id="content" className="prose mt-4">
              <Markdown>
                {summary}
              </Markdown>
            </div>
          }
          {status == 'PENDING' && <p className="mt-4">We are processing your request. Please wait & don't close your browser...</p>}
        </div>
      </div>
    </SidebarLayoutContent>
  )
}

export default YoutubeSummary