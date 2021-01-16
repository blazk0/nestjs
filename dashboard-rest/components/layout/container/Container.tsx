import { FC } from 'react';
import { Layout } from 'antd';
import Drawer from 'components/layout/drawer';

type Props = {
  drawer?: boolean;
};

const Container: FC<Props> = ({ children, drawer = true }) => {
  return (
    <Layout>
      {drawer && <Drawer />}

      {children}
    </Layout>
  );
};

export default Container;
