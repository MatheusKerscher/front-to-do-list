import { useEffect, useRef } from 'react'

export interface Shortcut {
  key: string
  alt?: boolean
  ctrl?: boolean
  shift?: boolean
  handler: () => void
  allowInInput?: boolean
  description: string
  label: string
}

const INPUT_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const ref = useRef<Shortcut[]>(shortcuts)
  ref.current = shortcuts

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName ?? ''
      const inInput = INPUT_TAGS.has(tag)

      for (const shortcut of ref.current) {
        if (e.key !== shortcut.key) continue
        if (!!shortcut.alt !== e.altKey) continue
        if (!!shortcut.ctrl !== e.ctrlKey) continue
        if (shortcut.shift !== undefined && shortcut.shift !== e.shiftKey) continue
        if (inInput && !shortcut.allowInInput) continue

        e.preventDefault()
        shortcut.handler()
        return
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])
}
