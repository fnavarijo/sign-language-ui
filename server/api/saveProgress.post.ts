// import { SanityClient } from '@sanity/client';
// const { SanityClient } = require('@sanity/client')

import { User, StatusProgress, ResourceType } from '~/types/sanity';

// TODO: How can I get the email?
// TODO: Add custom logger
// TODO: Add unit tests for this
// TODO: Any lib to check that the interface sent is the correct one?
const buildLessonProgress = ({
  userRef,
  lessonRef,
  status,
  relationId,
}: Record<string, string> & { status: StatusProgress }) => ({
  _id: relationId || null,
  _type: ResourceType.Progress,
  status,
  user: {
    _type: 'reference',
    _ref: userRef,
  },
  lesson: {
    _type: 'reference',
    _ref: lessonRef,
  },
});

const isValidStatus = (status: string) => {
  return Object.values(StatusProgress).includes(status as StatusProgress);
};

export default defineEventHandler(async (event) => {
  const { userEmail, lessonRef, status, relationId } = await readBody(event);

  if (!userEmail || !lessonRef || !status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  if (!isValidStatus(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid status',
    });
  }

  const sanity = useSanity();
  const sanityClient = sanity.client;

  try {
    const user = await sanityClient.fetch<User>(
      `*[_type == 'user' && email == $userEmail][0]`,
      { userEmail }
    );

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Not existing user',
      });
    }

    const lessonProgress = buildLessonProgress({
      userRef: user._id,
      lessonRef,
      status,
      relationId,
    });

    if (!relationId) {
      // @ts-ignore
      const document = await sanityClient.create(lessonProgress);
      return {
        message: 'Progress saved',
        details: document,
      };
    }

    const document = await sanityClient
      // @ts-ignore
      .patch(relationId)
      .set(lessonProgress)
      .commit();

    return {
      message: 'Progress updated',
      details: document,
    };
  } catch (error) {
    throw error;
  }
});
