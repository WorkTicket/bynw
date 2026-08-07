/** Pass-through — avoid client JS for route transitions. */
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
