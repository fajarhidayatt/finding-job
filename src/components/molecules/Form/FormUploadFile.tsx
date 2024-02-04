'use client';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ChangeEvent, useRef, useState } from 'react';

interface FormUploadFileProps {
  form: any;
}

const FormUploadFile = ({ form }: FormUploadFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nameFile, SetNameFile] = useState<string>('Attach Resume / CV');

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      SetNameFile(e.target.files[0].name);
      form.setValue('resume', e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h5 className="font-semibold">Attach your resume</h5>
      <div>
        <div>
          <div
            onClick={handleSelectFile}
            className="text-xs text-primary text-center font-semibold p-3 cursor-pointer border-2 border-dashed border-primary"
          >
            {nameFile}
          </div>
        </div>
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FormUploadFile;
