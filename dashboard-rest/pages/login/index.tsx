import { Card, Button, Layout } from 'antd';
import { Formik, Form } from 'formik';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useQueryCache } from 'react-query';
import * as yup from 'yup';

import styles from './login.module.css';
import { Input } from '@components/form';
import { useLoginUser } from '@hooks/auth';
import ids from '@constants/queries/ids';

export interface LoginType {
  email: string;
  password: string;
}

const Login = () => {
  const [loginUser] = useLoginUser();
  const cache = useQueryCache();
  const router = useRouter();
  const user = cache.getQueryData(ids.user);

  if (user) {
    router.replace('/about');
  }

  return (
    <Layout className={styles.container}>
      <Card className={styles.card} title="Login to Proceed">
        <Formik
          initialValues={{ email: '', password: '' }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => loginUser({ values, actions })}
          validationSchema={yup.object().shape({
            email: yup.string().email('Invalid Email').required(),
            password: yup.string().required(),
          })}
        >
          {({ isSubmitting, handleSubmit, status }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                leftPrefix={<UserOutlined className={styles.icon} />}
              />

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                leftPrefix={<LockOutlined className={styles.icon} />}
              />

              {status && <p className={styles.errorMsg}>{status}</p>}

              <Button
                loading={isSubmitting}
                type="primary"
                htmlType="submit"
                className={styles.inputBtn}
                onSubmit={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      drawer: false,
    },
  };
}

export default Login;
