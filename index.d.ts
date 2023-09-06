export type {Options} from './lib/index.js'

export {default} from './lib/index.js'

// Add custom data supported when `retext-emoji` is added.
declare module 'nlcst-emoticon-modifier' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface EmoticonData {
    /**
     * Emoji of emoticon node (example: `'😀'`).
     *
     * Registered by `retext-emoji`.
     */
    emoji?: string
    /**
     * Short description of emoticon node (example: `'grinning face'`).
     *
     * Registered by `retext-emoji`.
     */
    description?: string
    /**
     * Name of emoji (example: `['grinning']`).
     *
     * Registered by `retext-emoji`.
     */
    names?: string[]
    /**
     * Tags of emoji (example: `['smile', 'happy']`).
     *
     * Registered by `retext-emoji`.
     */
    tags?: string[]
  }
}
