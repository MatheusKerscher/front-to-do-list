import type { Shortcut } from '../../hooks/useKeyboardShortcuts'

interface KeyboardShortcutsHelpProps {
  shortcuts: Shortcut[]
  onClose: () => void
}

export function KeyboardShortcutsHelp({ shortcuts, onClose }: KeyboardShortcutsHelpProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full p-8 rounded shadow-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 font-montserrat text-sm text-black hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer"
        >
          close
        </button>

        <h2 className="font-poppins font-bold text-dark text-2xl mb-1">
          Keyboard Shortcuts
        </h2>
        <div className="h-[3px] w-10 bg-primary mb-6" />

        <div className="flex flex-col gap-3">
          {shortcuts.map(s => (
            <div key={s.label} className="flex items-center gap-4">
              <kbd className="shrink-0 bg-[#f0f1f2] border border-gray-200 rounded px-2 py-0.5 font-montserrat text-xs text-dark w-20 text-center">
                {s.label}
              </kbd>
              <span className="font-montserrat text-sm text-dark">{s.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
