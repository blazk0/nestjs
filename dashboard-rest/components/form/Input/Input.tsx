import { InputHTMLAttributes, ReactNode } from 'react';
import { Form, Input as TextInput } from 'antd';
import { useField } from 'formik';
import styles from './Input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  leftPrefix?: ReactNode;
  type?: 'text' | 'password' | 'textarea';
};

const Input = (props: Props) => {
  const [field, { error }] = useField(props);

  const renderInput = () => {
    switch (props.type) {
      case 'password':
        return (
          <TextInput.Password
            {...field}
            placeholder={props.placeholder}
            size="large"
            prefix={props.leftPrefix}
          />
        );
      case 'textarea':
        return (
          <TextInput.TextArea
            {...field}
            placeholder={props.placeholder}
            size="large"
          />
        );
      default:
        return (
          <TextInput
            {...field}
            placeholder={props.placeholder}
            size="large"
            prefix={props.leftPrefix}
          />
        );
    }
  };

  return (
    <Form.Item label={props.label}>
      {renderInput()}
      {error && <span className={styles.error}>{error}</span>}
    </Form.Item>
  );
};

export default Input;
