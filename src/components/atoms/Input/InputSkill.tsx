'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Plus, X } from 'lucide-react';

interface InputSkillProps {
  form: any; // TODO: PR
  name: string;
  label: string;
}

const InputSkill = ({ form, name, label }: InputSkillProps) => {
  const [isHide, setHide] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const val = form.getValues(name);

    if (val && val.length > 0) {
      setSkills(val);
    }
  }, [form, name]);

  const handleAddSkill = () => {
    if (inputValue.trim() === '') return;

    const newSkills: string[] = [...skills, inputValue];

    setSkills(newSkills);
    setInputValue('');
    form.setValue(name, newSkills);
  };

  const handleDeleteSkill = (item: string) => {
    const updateSkills: string[] = skills.filter(
      (skill: string) => skill !== item
    );

    setSkills(updateSkills);
    form.setValue(name, skills);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <div>
              {/* button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setHide(!isHide)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {label}
              </Button>

              {/* input */}
              {isHide ? (
                <div className="mt-4 flex gap-4">
                  <Input
                    className="w-60"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    Add
                  </Button>
                </div>
              ) : null}

              {/* skills */}
              <div className="mt-2 space-x-3">
                {skills.map((skill: string, index: number) => (
                  <Badge
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleDeleteSkill(skill)}
                  >
                    {skill}
                    <X className="w-4 h-4 ml-2" />
                  </Badge>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSkill;
