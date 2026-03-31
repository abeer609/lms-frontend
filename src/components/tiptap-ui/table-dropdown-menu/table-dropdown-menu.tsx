import * as React from "react"
import { ChevronDownIcon } from "../../tiptap-icons/chevron-down-icon"
import { useTiptapEditor } from "../../hooks/use-tiptap-editor"
import type { ButtonProps } from "../../tiptap-ui-primitive/button"
import { Button, ButtonGroup } from "../../tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../tiptap-ui-primitive/dropdown-menu"
import { Card, CardBody } from "../../tiptap-ui-primitive/card"
import { useTableDropdownMenu, type UseTableDropdownMenuConfig } from "./use-table-dropdown-menu"
import { TableOperationButton } from "./table-button"

export interface HeadingDropdownMenuProps
  extends Omit<ButtonProps, "type">,
  UseTableDropdownMenuConfig {
  portal?: boolean
  onOpenChange?: (isOpen: boolean) => void
}


export const TableDropdownMenu = React.forwardRef<
  HTMLButtonElement,
  HeadingDropdownMenuProps
>(
  (
    {
      editor: providedEditor,
      operations = ["Insert table", "Add column before", "Add column after", "Delete column", "Add row before", "Add row after", "Delete row", "Delete table", "Merge cells", "Split cell"],
      hideWhenUnavailable = false,
      portal = false,
      onOpenChange,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const [isOpen, setIsOpen] = React.useState(false)
    const { isVisible, isActive } = useTableDropdownMenu({
      editor,
      operations,
      hideWhenUnavailable,
    })

    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        if (!editor) return
        setIsOpen(open)
        onOpenChange?.(open)
      },
      [editor, onOpenChange]
    )

    if (!isVisible) {
      return null
    }

    return (
      <DropdownMenu modal open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            data-style="ghost"
            data-active-state={isActive ? "on" : "off"}
            role="button"
            tabIndex={-1}

            aria-label="Format text as heading"
            aria-pressed={isActive}
            tooltip="Table"
            {...buttonProps}
            ref={ref}
          >
            {/* <Icon className="tiptap-button-icon" /> */}
            Table Operations
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" portal={portal}>
          <Card>
            <CardBody>
              <ButtonGroup>
                {operations.map((operation) => (
                  <DropdownMenuItem key={`operation-${operation}`} asChild>
                    <TableOperationButton
                      editor={editor}
                      operation={operation}
                      text={operation}
                      showTooltip={false}
                    />
                  </DropdownMenuItem>
                ))}
              </ButtonGroup>
            </CardBody>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

TableDropdownMenu.displayName = "TableDropdownMenu"

export default TableDropdownMenu
