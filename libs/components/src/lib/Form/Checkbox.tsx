import { Checkbox, CheckboxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type CheckboxWithControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Pick<CheckboxProps, 'required' | 'disabled' | 'sx'>;

export function CheckboxWithController<T extends FieldValues>({
  control,
  name,
  disabled,
  required,
  sx,
}: CheckboxWithControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field, fieldState }) => {
        const { name, ref, onChange, value } = field;
        return (
          <Checkbox
            {...{
              name,
              disabled,
              onChange: (e) => onChange(e.target.checked),
              ref,
              checked: value,
            }}
            sx={sx}
            color={fieldState.error ? 'error' : 'primary'}
          />
        );
      }}
    />
  );
}
