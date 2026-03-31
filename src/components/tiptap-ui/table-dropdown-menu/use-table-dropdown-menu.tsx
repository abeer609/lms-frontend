"use client"

import * as React from "react"
import type { Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "../../hooks/use-tiptap-editor"

// --- Icons ---

// --- Tiptap UI ---
import {
  canToggle,
} from "../../tiptap-ui/heading-button"

/**
 * Configuration for the heading dropdown menu functionality
 */
export type Operation = "Insert table"| "Add column before"| "Add column after"| "Delete column"| "Add row before"|"Add row after"| "Delete row"| "Delete table"| "Merge cells"| "Split cell"| "Toggle header column"| "Toggle header row"| "Toggle header"| "cellMerge or split"| "Set cell attribute"| "Fix tables"|"Go to next cell"| "Go to previous cell"

export interface UseTableDropdownMenuConfig {
  editor?: Editor | null

  operations?: Operation[]
  /**
   * Whether the dropdown should hide when headings are not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
}

export function useTableDropdownMenu(config?: UseTableDropdownMenuConfig) {
  const {
    editor: providedEditor,
    operations,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = React.useState(true)

  const isActive = true
  const canToggleState = canToggle(editor)


  return {
    isVisible,
    isActive,
    // canToggle: canToggleState,
    operations,
    label: "Heading",
  }
}
