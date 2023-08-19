export function fetchLessonsByUser({ email }: { email: string }) {
  return groq`*[_type == 'lesson'] {
    _id,
    name,
    description,
    sign,
    'progress': *[_type == 'progress' && references(^._id) && user._ref in *[_type == 'user' && email == '${email}']._id] {
      status
    }
  }
  `;
}
