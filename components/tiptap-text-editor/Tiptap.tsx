"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

import MenuBar from "./menu-bar";

interface Props {
  content: string;
  onChange: (content: string) => void;
    editable?: boolean;
}

const Tiptap = ({ content, onChange ,editable = true}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6",
          },
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-300",
        },
      }),
    ],

    content: content || "",

    editable,

    immediatelyRender: false,

   editorProps:{
 attributes:{
  class:"prose prose-slate max-w-none min-h-[70vh] focus:outline-none px-8 py-6 leading-7 text-[16px]"
 }
},

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-xl overflow-hidden bg-background shadow-sm">
      {/* Toolbar */}

      <div className="border-b sticky top-0 bg-background z-10 p-2">
        <MenuBar editor={editor} />
      </div>

      {/* Editor */}

      <div className="max-h-[80vh] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
