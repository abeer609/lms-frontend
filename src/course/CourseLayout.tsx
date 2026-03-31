import { SidebarLayout } from "../components/sidebar-layout";
import type React from "react";
import type {  Module } from "./Course";

export default function CourseLayout({
  children,
  modules
}: {
  children: React.ReactNode;
  modules: Module[]
}) {
  return <SidebarLayout modules={modules}>{children}</SidebarLayout>;
}
