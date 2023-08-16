import { SanityClient } from '@sanity/client';

// On client
// get all the lessons
// get all the lessons progress where the user is: userId
// progressId
// merge both to show the progress

// I have the lessonId, userId

// TODO: How should I handle the lessons and the user information?
// TODO: How can I get the email and lesson ref?
// TODO: If user + lesson already exists, update progress
// TODO: Can I read the user from Auth0?
// TODO: Add custom logger
export default defineEventHandler(async (event) => {
  const { userRef, lessonRef, status, relationId } = await readBody(event);

  if (!userRef || !lessonRef || !status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const sanity = useSanity();
  const sanityClient = sanity.client as SanityClient;

  const lessonProgress = {
    _id: relationId || null,
    _type: 'progress',
    status,
    user: {
      _type: 'reference',
      _ref: userRef,
    },
    lesson: {
      _type: 'reference',
      _ref: lessonRef,
    },
  };

  try {
    if (!relationId) {
      const document = await sanityClient.create(lessonProgress);
      return {
        message: 'Progress saved',
        details: document,
      };
    }

    const document = await sanityClient
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
