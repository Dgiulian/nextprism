import Head from 'next/head';
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <h3 className="justify-start flex text-lg font-medium py-4">Home Page</h3>
    </Layout>
  );
}
