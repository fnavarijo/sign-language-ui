export function fetchLesson({
  id,
  userEmail,
}: {
  id: string;
  userEmail: string;
}) {
  return groq`*[_type == "lesson" && _id == "${id}"] {
    _id,
    name,
    content,
    video,
    sign,
    "progress": *[_type == "progress" && references(^._id) && user._ref in *[_type == 'user' && email == '${userEmail}']._id] {
      _id,
      status,
    }
  }[0]`;
}
