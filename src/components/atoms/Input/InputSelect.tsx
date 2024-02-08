import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, FieldValues, Path } from 'react-hook-form';

type TOption = Record<string, string>;

interface InputSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  label?: string;
  placeholder?: string;
}

const InputSelect = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder,
}: InputSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option: TOption) => (
                <SelectItem key={option.key} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSelect;
