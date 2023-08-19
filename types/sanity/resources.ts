import { Block } from 'sanity-blocks-vue-component/dist/types';

import { SanityImage } from './base';

export type Lesson = {
  _id: string;
  name: string;
  description: string;
  content: Block[];
  sign: SanityImage;
  video: string;
};

export type Progress = {
  _id: string;
  status: string;
};

export type LessonWithProgress = Lesson & {
  progress: Progress[];
};
