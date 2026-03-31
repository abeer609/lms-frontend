import { useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "../components/breadcrumbs";
import { SidebarLayoutContent } from "../components/sidebar-layout";
import { Video } from "../components/video-player";
import useLesson from "./hooks/useLesson";
import TextEditor from "../components/text-editor/TextEditor";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   let lesson = await getLesson((await params).slug);

//   return {
//     title: `${lesson?.title} - Compass`,
//     description: lesson?.description,
//   };
// }

type Assignment = {
  id: string;
  title: string;
  description: string;
  lesson: string;
  attachment: string | null;
  due_date: string;
  created_at: string;
};

export default function Lesson() {
  const { courseId } = useParams();
  const { lessonId } = useParams();
  if (!lessonId) return;

  const [assignments, setAssignments] = useState<Assignment[] | undefined>();
  const [remainingTimes, setRemainingTimes] = useState<Record<string, string>>(
    {}
  );
  useEffect(() => {
    const updateRemainingTimes = () => {
      if (!assignments) return;

      const now = new Date();
      const newRemainingTimes: Record<string, string> = {};

      assignments.forEach((assignment) => {
        const dueDate = new Date(assignment.due_date);
        const diffTime = dueDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          newRemainingTimes[assignment.id] = `${diffDays} days left`;
        } else if (diffDays === 0) {
          newRemainingTimes[assignment.id] = "Due today";
        } else {
          newRemainingTimes[assignment.id] = "Past due";
        }
      });

      setRemainingTimes(newRemainingTimes);
    };
    updateRemainingTimes();
  }, [assignments]);

  useEffect(() => {
    if (!lesson) return;
    setAssignments(lesson.assignments);
  });

  const { data: lesson, isLoading: isLessonLoading } = useLesson(lessonId);
  if (!isLessonLoading && lesson) {
    console.log(lesson.content);
    return (
      <SidebarLayoutContent
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbHome />
            <BreadcrumbSeparator className="max-md:hidden" />
            <Breadcrumb href={`/courses/${courseId}`} className="max-md:hidden">
              {lesson.module.title}
            </Breadcrumb>
            <BreadcrumbSeparator />
            <Breadcrumb>{lesson?.title}</Breadcrumb>
          </Breadcrumbs>
        }
      >
        <div className="mx-auto max-w-7xl">
          <div className="lg:max-w-6xl">
            <h2 className="p-4 text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white mb-4">
              {lesson.title}
            </h2>
            {lesson?.video && <Video id="video" src={lesson.video.video} />}
          </div>
          <div className="lg:flex gap-x-10 py-4 lg:max-w-6xl">
            {/* content */}
            {lesson.content ? (
              <div
                id="content"
                className={`prose ${
                  assignments && assignments.length > 0 ? "" : "mx-auto"
                }`}
              >
                {<TextEditor content={lesson.content} />}
              </div>
            ) : (
              <p>No content found</p>
            )}
            {/* assignment */}
            <div className="flex-1 space-y-4 mt-10 lg:mt-4 h-full border border-gray-700 rounded-md p-4">
              <h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white">
                Assignments
              </h2>
              <div className="space-y-4">
                {!assignments ||
                  (assignments.length == 0 && <p>No assignments found</p>)}
                {assignments &&
                  assignments.length > 0 &&
                  assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {assignment.title}
                        </h3>
                        <span className="text-sm text-red-600 dark:text-red-400">
                          {remainingTimes[assignment.id]}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Due:{" "}
                        {new Date(assignment.due_date).toLocaleDateString(
                          "en-GB"
                        )}
                      </div>
                      <a
                        href={`/assignments/${assignment.id}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View Assignment
                        <svg
                          className="w-4 h-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarLayoutContent>
    );
  } else {
    return <Loading showLogo={false} />;
  }
}
