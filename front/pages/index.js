import ProductList from '../components/ProductList';
import Incentives from '../components/Incentives';
import Banner from '../components/Banner';
import Layout from './Layout';

export default function Home({ homepage }) {
  const { product, campaign } = homepage;

  return (
    <Layout>
      <Banner data={campaign} />
      <ProductList data={product} />
      <Incentives />
    </Layout>
  );
}

export async function getStaticProps() {
  const prod = await fetch(`${process.env.API_GATEWAY}/homepage`);
  const homepage = await prod.json();

  return {
    props: {
      homepage,
    },
    // revalidate: 10,
  };
}
