export function getAvatar(user: any) {

  if (user?.image)
    return user.image

  if (user?.avatar)
    return user.avatar

  const name =
    user?.name ||
    "User"

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff&bold=true`

}
