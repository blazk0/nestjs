import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Title, Sider } from '@components/layout/antd';
import styles from './drawer.module.css';
import { drawerItems } from '@constants/drawer';

const Drawer = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [key, setKey] = useState<string>('1');
  const router = useRouter();

  useEffect(() => {
    const item = drawerItems.find(item => item.path === router.pathname);

    setKey(item?.key || '1');
  }, []);

  return (
    <Sider
      collapsible
      theme="light"
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={300}
    >
      {!collapsed && (
        <Title level={2} className={styles.header}>
          Dashboard
        </Title>
      )}

      <Menu selectedKeys={[key]}>
        {drawerItems.map(({ key, path, title, Icon }) => (
          <Menu.Item
            key={key}
            icon={<Icon />}
            onClick={e => setKey(String(e.key))}
          >
            <Link href={path}>{title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Drawer;
