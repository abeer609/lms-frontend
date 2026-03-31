import * as React from "react"

// --- Lib ---

// --- Tiptap UI ---

// --- UI Primitives ---
import type { ButtonProps } from "../../tiptap-ui-primitive/button"
import { Button } from "../../tiptap-ui-primitive/button"
import { useTiptapEditor } from "../../hooks/use-tiptap-editor"
import { type Operation, type UseTableDropdownMenuConfig } from "./use-table-dropdown-menu"
import useOperation from "./useOperation"

export interface TableButtonProps
  extends Omit<ButtonProps, "type">,
  UseTableDropdownMenuConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  operation: Operation,
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
}


/**
 * Button component for toggling heading in a Tiptap editor.
 *
 * For custom button implementations, use the `useHeading` hook instead.
 */
export const TableOperationButton = React.forwardRef<
  HTMLButtonElement,
  TableButtonProps
>(
  (
    {
      editor: providedEditor,
      operation,
      text,
      hideWhenUnavailable = false,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)


    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return

        useOperation({
          editor,
          operation
        })
      },
      [onClick]
    )


    return (
      <Button
        type="button"
        data-style="ghost"
        data-active-state="off"
        role="button"
        tabIndex={-1}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    )
  }
)

TableOperationButton.displayName = "TableOperationButton"
