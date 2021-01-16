import { Input } from '@components/form';
import { Title } from '@components/layout/antd';
import { Card, Form, Row, Col, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Formik } from 'formik';

import styles from './about.module.css';

const About = () => {
  return (
    <Card title="About" className={styles.container}>
      <Formik
        initialValues={{
          name: '',
          experience: '',
          specialty: '',
          photo: '',
          bio: [],
        }}
        onSubmit={values => console.log(values)}
      >
        {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={64}>
              <Col span={7}>
                <Input id="name" label="Name" name="name" placeholder="Name" />
                <Input
                  id="experience"
                  label="Experience"
                  name="experience"
                  placeholder="Experience"
                  type="textarea"
                />

                <Input
                  id="specialty"
                  label="Specialty"
                  name="specialty"
                  placeholder="Specialty"
                  type="textarea"
                />

                <Title level={5}>Biography</Title>

                <Form.List name="bio">
                  {(fields, { add, remove }) => (
                    <>
                      <Space
                        align="center"
                        size="large"
                        className={styles.bottomSpacing}
                      >
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>

                        <Button
                          type="dashed"
                          onClick={() => remove(fields[fields.length - 1].name)}
                          block
                          icon={<MinusCircleOutlined />}
                        >
                          Remove field
                        </Button>
                      </Space>

                      {fields.map(field => (
                        <Input
                          name={`bio_${field.key}`}
                          key={field.key}
                          type="textarea"
                          placeholder="Enter Description"
                        />
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>

              <Col span={10}>
                <Title level={3}>Picture</Title>

                {values.photo && (
                  <img src={values.photo} className={styles.img} />
                )}

                <input
                  type="file"
                  onChange={e =>
                    setFieldValue(
                      'photo',
                      URL.createObjectURL(e.target.files && e.target.files[0])
                    )
                  }
                />
              </Col>
            </Row>

            <Button loading={isSubmitting} onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default About;
