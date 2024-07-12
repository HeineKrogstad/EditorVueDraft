import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color';

export default function getEditorConfig(content = '', editable = true, tiptapExtensions = []) {
  return {
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'orderedList', 'bulletList', 'codeBlock', 'blockquote'],
      }),
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      FontFamily,
      Image,
      Color,
Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      //...tiptapExtensions,
    ],
    content: content,
    editable: editable,
  };
}