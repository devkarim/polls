import { useEffect, useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import Button from './Button';
import Input from './Input';
import Space from './Space';

interface MultipleInputProps {
  placeholder?: string;
  addValueText: string;
  onChange?: (newValues: string[]) => void;
}

const MultipleInput: React.FC<MultipleInputProps> = ({
  addValueText,
  placeholder,
  onChange,
}) => {
  const [values, setValues] = useState<string[]>(['']);

  const addValue = (value: string) => setValues((prev) => [...prev, value]);

  const updateValue = (i: number, value: string) => {
    setValues((prev) => {
      let newValues = [...prev];
      newValues[i] = value;
      return newValues;
    });
  };

  const removeValue = (i: number) =>
    setValues((prev) => prev.filter((_, index) => index != i));

  const removeClick = (i: number) => {
    if (values.length <= 1) return;
    removeValue(i);
  };

  useEffect(() => {
    onChange && onChange(values);
    // NOTE: Not sure yet if this is good practice
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <>
      {values.map((v, index) => (
        <div className="w-full" key={index}>
          <Input
            value={v}
            onChange={(newValue) => updateValue(index, newValue)}
            placeholder={`${placeholder} ${index + 1}`}
            rightIcon={
              values.length > 1 ? (
                <FaTimes
                  className="cursor-pointer"
                  size={21}
                  onClick={() => removeClick(index)}
                />
              ) : undefined
            }
          />
          <Space size="xl" />
        </div>
      ))}
      <Button
        className="flex items-center border-0 !p-2"
        variant="outline"
        onClick={() => addValue('')}
      >
        <FaPlus className="cursor-pointer mr-2" size={18} />
        {addValueText}
      </Button>
    </>
  );
};

export default MultipleInput;
