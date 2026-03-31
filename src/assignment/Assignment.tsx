import React, { useState } from "react";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import useAssignment from "./useAssignment";
import Loading from "../components/Loading";
import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "../components/breadcrumbs";
import NotFound from "../components/NotFound";
import { SidebarLayoutContent } from "../components/sidebar-layout";

const Assignment = () => {
  const { assignmentId } = useParams();
  if (!assignmentId) return <NotFound />;
  const { data: assignment, isLoading, error } = useAssignment(assignmentId);
  const [submission, setSubmission] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmission(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    // if (!assignment) return;
    // if (assignment.attachment) return;
    // try {
    //   const response = await fetch(assignment.attachment);
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = assignment.attachment.split("/").pop() || "assignment";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error("Error downloading file:", error);
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission) return;

    setLoading(true);
    try {
      // Implement your submission logic here
      console.log("Submitting assignment:", submission);
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoading && assignment) {
    return (
      <SidebarLayoutContent
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbHome />
            <BreadcrumbSeparator className="max-md:hidden" />
            <Breadcrumb className="text-white">Lessons</Breadcrumb>
            <BreadcrumbSeparator />
            <Breadcrumb>{assignment.title}</Breadcrumb>
          </Breadcrumbs>
        }
      >
        <div className="max-w-6xl mx-auto px-6 py-12 text-gray-100">
          <div className="md:flex gap-12">
            {/* assignment */}
            <div className="flex-1">
              <div className=" border-gray-700 pb-8 mb-12">
                <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
                <div className="flex mb-10">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-sm uppercase tracking-wider ">
                      Due Date:
                    </h3>
                    <p className="text-gray-200">
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="prose">
                      <Markdown>{assignment.description}</Markdown>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-80 flex gap-10 flex-col shrink-0">
              {assignment.attachment && (
                <div className="sticky top-6 bg-gray-700/30 p-6 rounded-lg">
                  <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
                    Assignment Materials
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {assignment.attachment.split("/").pop()}
                        </p>
                        <p className="text-xs text-gray-400">
                          Assignment document
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg
                  hover:bg-gray-500 transition-colors text-sm font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Submit Your Assignment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="submission"
                      className="block text-sm text-gray-300 mb-2"
                    >
                      Upload Your Work
                    </label>
                    <input
                      type="file"
                      id="submission"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg
                  text-sm text-gray-200 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm
                  file:bg-gray-600 file:text-gray-200
                  hover:file:bg-gray-500 transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!submission || loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg
                hover:bg-blue-500 disabled:bg-gray-600 disabled:text-gray-400
                disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Submitting..." : "Submit Assignment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayoutContent>
    );
  } else if (!isLoading && !assignment) {
    return <NotFound />;
  } else {
    return <Loading showLogo={true} />;
  }
};

export default Assignment;
