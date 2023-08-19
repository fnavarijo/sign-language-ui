import { Block } from 'sanity-blocks-vue-component/dist/types';

import { SanityImage } from './base';

// Entities created on Sanity
export enum ResourceType {
  Lesson = 'lesson',
  Progress = 'progress',
  User = 'user',
}

export type Lesson = {
  _id: string;
  name: string;
  description: string;
  content: Block[];
  sign: SanityImage;
  video: string;
};

export enum StatusProgress {
  NotStarted = 'not_started',
  InProgress = 'started',
  Completed = 'completed',
}

export type Progress = {
  _id: string;
  status: StatusProgress;
};

export type User = {
  _id: string;
  email: string;
  name: string;
};

export type LessonWithProgress = Lesson & {
  progress: Progress[];
};
