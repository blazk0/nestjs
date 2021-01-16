import {
  VideoCameraOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  ArrowUpOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { ComponentType } from 'react';

type Drawer = {
  key: string;
  path: string;
  title: string;
  Icon: ComponentType;
};

export const drawerItems: Drawer[] = [
  {
    key: '2',
    path: '/about',
    title: 'About',
    Icon: InfoCircleOutlined,
  },
  {
    key: '3',
    path: '/articles',
    title: 'Articles',
    Icon: EditOutlined,
  },
  {
    key: '4',
    path: '/advices',
    title: 'Advcies',
    Icon: QuestionCircleOutlined,
  },
  {
    key: '5',
    path: '/videos',
    title: 'Videos',
    Icon: VideoCameraOutlined,
  },
  {
    key: '6',
    path: '/inspire',
    title: 'Inspiration',
    Icon: ArrowUpOutlined,
  },
  {
    key: '7',
    path: '/locations',
    title: 'Locations',
    Icon: AimOutlined,
  },
  {
    key: '8',
    path: '/faq',
    title: 'Faq',
    Icon: QuestionCircleOutlined,
  },
];
