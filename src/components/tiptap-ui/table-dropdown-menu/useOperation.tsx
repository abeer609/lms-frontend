import React from 'react'
import type { Operation } from './use-table-dropdown-menu'
import type { Editor } from '@tiptap/react'

export interface UseOperationConfig {
    editor?: Editor | null
    operation: Operation

}

const useOperation = (config: UseOperationConfig) => {
    if (config.operation == "Insert table") {
        config.editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    }else if(config.operation == "Delete table"){
        config.editor?.chain().focus().deleteTable().run()
    }else if(config.operation=="Add column after"){
        config.editor?.chain().focus().addColumnAfter().run()
    }else if(config.operation == "Add column before"){
        config.editor?.chain().focus().addColumnBefore().run()
    }else if(config.operation == "Add row after"){
        config.editor?.chain().focus().addRowAfter().run()
    }else if(config.operation == "Add row before"){
        config.editor?.chain().focus().addRowBefore().run()
    }else if(config.operation == "Merge cells"){
        config.editor?.chain().focus().mergeCells().run()
    }else if(config.operation == "Split cell"){
        config.editor?.chain().focus().splitCell().run()
    }
    else if(config.operation == "Delete row"){
        config.editor?.chain().focus().deleteRow().run()
    }
    else if(config.operation == "Delete column"){
        config.editor?.chain().focus().deleteColumn().run()
    }
}


export default useOperation