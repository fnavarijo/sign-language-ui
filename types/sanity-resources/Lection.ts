import { Block } from 'sanity-blocks-vue-component/dist/types';

import { SanityResouce } from './BaseTypes';

export type Lection = {
  name: string;
  description: string;
  content: Block[];
  sign: SanityResouce;
  video: string;
};
