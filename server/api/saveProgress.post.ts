import { SanityClient } from '@sanity/client';

// TODO: How can I get the email and lesson ref?
// TODO: If user + lesson already exists, update progress
// TODO: Can I read the user from Auth0?
// TODO: Add custom logger
export default defineEventHandler(async (event) => {
  const { userRef, lessonRef, status, relationId } = await readBody(event);

  if (!userRef || !lessonRef || !status) {
    return {
      message: 'Missing required fields',
    };
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
    // TODO: should create it only if all fields are existing
    const result = await sanityClient.create(lessonProgress);
    console.log(result);

    return {
      message: 'Successfully saved progress',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to save progress',
    };
  }
});
