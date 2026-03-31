import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react"
import AINodeView from "./ai-content-node"

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    aiContent: {
      setAiContentNode: () => ReturnType
    }
  }
}

export const AIContentNode = Node.create({
    name: 'aiContent',
    group: 'block',
    atom:true,
    // addOptions: {

    // }
    parseHTML(){
        return [{tag: "div#ai-content"}]
    },
    renderHTML({HTMLAttributes}){
        return [
            "div",
            mergeAttributes({id:'ai-content'}, HTMLAttributes),
            0
        ]
    },
    addCommands() {
        return {
            setAiContentNode: ()=>
            ({commands})=>{
                return commands.insertContent({
                    type: this.name
                })
            }
        }
    },
    addNodeView(){
        return ReactNodeViewRenderer(AINodeView)
    }
    // addCommands() {
    // return {
    //   setAiContentNode:
    //     () =>
    //     ({ chain }) => {
    //       return chain()
    //         .insertContent({
    //           type: 'aiContent',
    //           content: [
    //             {
    //               type: 'text',
    //               text: 'Hello from AI content!',
    //             },
    //           ],
    //         })
    //         .focus()
    //         .run()
    //     },
    // }
    // }
})