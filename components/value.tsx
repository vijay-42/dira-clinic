import { isTodo } from '@/content/clinic'

/**
 * Renders a supplied value, or a loud bracketed marker when it is still a
 * placeholder. An invisible gap ships silently; a marker does not.
 */
export function Value({ value, marker }: { value: string; marker: string }) {
  if (isTodo(value)) {
    return <span className="todo-marker">{`[${marker}]`}</span>
  }
  return <>{value}</>
}
