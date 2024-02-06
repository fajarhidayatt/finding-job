'use client';

import { useEffect, useRef } from 'react';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';

interface InputCKEditorProps {
  form: any; // TODO: PR
  name: string;
  editorLoaded?: boolean;
}

const InputCKEditor = ({ form, name, editorLoaded }: InputCKEditorProps) => {
  const editorRef = useRef<any>(); // TODO: PR
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
  }, []);

  return editorLoaded ? (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={form.getValues(name)}
        onChange={(event: any, editor: any) => {
          // TODO: PR
          const data = editor.getData();
          form.setValue(name, data);
        }}
      />
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem>
            <FormMessage className="mt-3" />
          </FormItem>
        )}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default InputCKEditor;
