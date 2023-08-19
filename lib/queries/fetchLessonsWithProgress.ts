export function fetchLessonsWithProgress({ userEmail }: { userEmail: string }) {
  return groq`*[_type == 'lesson'] {
    _id,
    name,
    description,
    sign,
    'progress': *[_type == 'progress' && references(^._id) && user._ref in *[_type == 'user' && email == '${userEmail}']._id] {
      status
    }
  }
  `;
}
