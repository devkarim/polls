import ErrorLabel from './ErrorLabel';
import Input, { InputProps } from './Input';

interface FormFieldProps extends InputProps {
  errMsg?: string;
  touched?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  errMsg,
  touched,
  ...props
}) => {
  return (
    <div>
      <Input id={id} name={id} {...props} />
      <ErrorLabel message={errMsg} show={touched} />
    </div>
  );
};

export default FormField;
