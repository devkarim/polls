interface RadioButtonProps {
  id: string;
  value: string;
  name: string;
  children?: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  value,
  name,
  children,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        className="w-6 h-6"
      />
      <label htmlFor={id} className="ml-2 text-2xl">
        {children}
      </label>
    </div>
  );
};

export default RadioButton;
