export type Assignment = {
  id: string;
  title: string;
  description: string;
  lesson: string;
  attachment: string | null;
  due_date: string;
  created_at: string;
};

export interface Video {
  id: string;
  thumbnail: string;
  duration: number | null;
  video: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  module: {
    id: string;
    title: string;
  };
  video: Video | null;
  assignments: Assignment[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  banner: string | null;
  description: string;
  modules: Module[];
}
