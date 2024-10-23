'use client';
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorComponentProps {
  onChange: (data: string) => void;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({ onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default CKEditorComponent;
