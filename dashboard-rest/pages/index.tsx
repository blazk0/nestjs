import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useGetUser } from '../hooks/auth';

const Splash = () => {
  const router = useRouter();
  const user = useGetUser(router.query.pathName);

  return (
    <div className="centerContainer">
      <Spin size="large" />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      drawer: false,
    },
  };
}

export default Splash;
