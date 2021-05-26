import { GetServerSideProps } from "next";
import Head from "next/head";
import Finandy from "../components/Finandy";
import { DataInputs } from "../redux/finandyInputs/types";
import { getFinData } from "../store/DB";

export default function Home({ data }: { data: DataInputs }) {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getFinData();
  return {
    props: {
      data,
    },
  };
};
