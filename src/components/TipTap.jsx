'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Tiptap() {
    const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    });

    if (!editor) return null;

    return (
    <div className="border rounded-md p-4 shadow-sm">
        <EditorContent editor={editor} />
    </div>
    );
}
