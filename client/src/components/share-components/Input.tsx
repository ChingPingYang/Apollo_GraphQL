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
      classes={{ root: classes.root }}
      InputProps={{
        classes: {
          root: classes.root,
          notchedOutline: classes.notchedOutline,
        },
      }}
    />
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: "0px",
    "&:hover $notchedOutline": {
      borderColor: "orange",
    },
  },
  // This is needed
  notchedOutline: {},
}));

export default Input;
