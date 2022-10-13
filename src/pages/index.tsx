import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Line from '../components/ui/Line';
import SimpleCard from '../components/ui/SimpleCard';
import Space from '../components/ui/Space';
import { FaTimes, FaPlus } from 'react-icons/fa';

interface MyFormValues {
  header: string;
}

const HomePage: NextPage = () => {
  const initialValues: MyFormValues = { header: '' };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <h2>Create a poll</h2>
      <Space size="3xl" />
      <SimpleCard className="p-6 max-h-[75%] w-full max-w-xl overflow-auto">
        <div className="flex flex-col items-start">
          <Input
            id="header"
            label="Ask a question"
            placeholder="Did you say hi to your cat today?"
          />
          <Line className="my-6 self-center" />
          <p className="text-lg mb-2">Add answers</p>
          <Input
            id="header"
            placeholder="Option 1"
            rightIcon={
              <FaTimes
                className="cursor-pointer"
                size={21}
                onClick={() => {}}
              />
            }
          />
          <Space size="xl" />
          <Button className="flex items-center border-0 !p-2" variant="outline">
            <FaPlus
              className="cursor-pointer mr-2"
              size={18}
              onClick={() => {}}
            />
            Add answer
          </Button>
          <Space size="2xl" />
          <Button className="w-full">Create</Button>
        </div>
      </SimpleCard>
    </div>
  );
};

export default HomePage;
