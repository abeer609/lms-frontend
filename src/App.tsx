import { useEffect } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Otp from "./auth/otp/Otp.tsx";
import Login from "./auth/login/Login.tsx";
import Resource from "./resources/Resource.tsx";
import Course from "./course/Course.tsx";
import Lesson from "./lesson/Lesson.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TextEditor from "./components/text-editor/TextEditor.tsx";
import RootLayout from "./layout.tsx";
import Landing from "./landing/Landing.tsx";
import CoursesPage from "./courses/CoursesPage.tsx";
import About from "./about/About.tsx";
import Register from "./auth/register/Register.tsx";
import AIDetector from "./ai-dectection/AIDetector.tsx";
import ActivateAccountPage from "./auth/register/ActivateAccountPage.tsx";
import { useAppDispatch } from "./hooks.ts";
import { checkAuthenticated, load_user } from "./features/auth/authSlice.ts";
import YoutubeSummary from "./youtube-summary/YoutubeSummary.tsx";
import ProblemPage from "./code-submission/ProblemPage.tsx";
import AssignmentPage from "./assignment/Assignment.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import ProblemList from "./code-submission/Problems.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/courses",
    element: <CoursesPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/editor",
    element: <TextEditor editable={true} content="" />,
  },

  {
    element: <RootLayout />,
    children: [
      {
        path: "/courses/:courseId",
        element: <Course />,
      },
      {
        path: "/problems",
        element: <ProblemList />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "problems/:id",
        element: <ProblemPage />,
      },
      {
        path: "assignments/:assignmentId",
        element: <AssignmentPage />,
      },
      {
        path: "/courses/:courseId/lessons/:lessonId",
        element: <Lesson />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/ai-detector",
    element: <AIDetector />,
  },
  {
    path: "youtube-summary",
    element: <YoutubeSummary />,
  },
  {
    path: "/auth/otp",
    element: <Otp />,
  },
  {
    path: "/resource",
    element: <Resource />,
  },
  {
    path: "/activate/:uid/:token",
    element: <ActivateAccountPage />,
  },
]);
export const client = new QueryClient();

function App() {
  const dispatch = useAppDispatch();
  const load = async () => {
    await dispatch(checkAuthenticated());
    await dispatch(load_user());
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
