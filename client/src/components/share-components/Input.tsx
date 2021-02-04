import { TextField, makeStyles } from "@material-ui/core";

interface InputProps {
  name: string;
  type: string;
  label: string;
  variant: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  variant,
  onChange,
  value,
}) => {
  const classes = useStyle();
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      variant={variant}
      onChange={onChange}
      value={value}
      classes={{ root: classes.textField }}
    />
  );
};

const useStyle = makeStyles({
  textField: {
    width: "100%",
  },
});

export default Input;
