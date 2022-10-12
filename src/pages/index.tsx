import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Line from '../components/ui/Line';
import SimpleCard from '../components/ui/SimpleCard';
import Space from '../components/ui/Space';

interface MyFormValues {
  header: string;
}

const HomePage: NextPage = () => {
  const initialValues: MyFormValues = { header: '' };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <h2>Create a poll</h2>
      <Space size="3xl" />
      <SimpleCard className="p-6">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          <Form className="flex flex-col items-center">
            <Input id="header" label="Ask a question" />
            <Line className="my-6" />
            <Input id="header" label="Add an answer" />
            <Space size="2xl" />
            <Button className="w-full">Create</Button>
          </Form>
        </Formik>
      </SimpleCard>
    </div>
  );
};

export default HomePage;
