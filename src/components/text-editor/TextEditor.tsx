import { useEditor } from "@tiptap/react";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { MAX_FILE_SIZE, handleImageUpload } from "../lib/tiptap-utils";
import { Highlight } from "@tiptap/extension-highlight";
import { ImageUploadNode } from "../tiptap-node/image-upload-node";
import { Image } from "@tiptap/extension-image";
import { Focus, Selection } from "@tiptap/extensions";
import { AIContentNode } from "../tiptap-node/ai-content/ai-content-node-extension";
import { TableKit } from "@tiptap/extension-table";
import "../../components/tiptap-node/table/table.scss";
import { useRef, useState } from "react";

export default function TextEditor({
  content,
  editable = false,
}: {
  content: string;
  editable?: boolean;
}) {
  const [name, setName] = useState("Unititled document");
  const editor = useEditor({
    autofocus: true,
    editable: editable,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),

      TableKit.configure({}),

      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      AIContentNode,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      // Clear previous timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        handleUpdate(editor.getHTML());
      }, 2000);
    },
  });
  const debounceRef = useRef<number | undefined>(undefined);

  const handleUpdate = (content: string) => {};
  return (
    <SimpleEditor
      editable={editable}
      documentName={name}
      setDocumentName={setName}
      editor={editor}
    />
  );
}
