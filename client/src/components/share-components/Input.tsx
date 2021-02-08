import { TextField, makeStyles } from "@material-ui/core";
import { InputError } from "../../types/types";

interface InputProps {
  name: string;
  type: string;
  label: string;
  variant: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleError: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  errorState: InputError;
}
const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  variant,
  onChange,
  handleError,
  value,
  errorState,
}) => {
  const classes = useStyle();
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      variant={variant}
      onChange={onChange}
      onBlur={handleError}
      value={value}
      classes={{ root: classes.textField }}
      helperText={errorState.error ? errorState.helperText : ""}
      error={errorState.error}
    />
  );
};

const useStyle = makeStyles({
  textField: {
    width: "100%",
  },
});

export default Input;
