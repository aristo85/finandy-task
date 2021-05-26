import Head from "next/head";
import Finandy from "../components/Finandy";
import { getFinData } from "../store/DB";

export default function Home({ data }) {
  return (
    <div className="container">
      <Head>
        <title>Create Finandy App</title>
      </Head>
      <main>
        <Finandy data={data} />
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await getFinData();
  return {
    props: {
      data,
    },
  };
};
