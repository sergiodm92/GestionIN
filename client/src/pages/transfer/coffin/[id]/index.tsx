import { GetServerSideProps } from "next";
import styles from "../../styles/transfer.module.css";
import PageUnderConstruction from "../../../../components/pageUnderConstruction/pageUnderConst";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  return {
    props: {
      id,
    },
  };
};

const CoffinTransferDetail = ({ id }: { id: string }) => {
  return (
    <div className={styles.container}>
      <PageUnderConstruction/>
    </div>
  );
};
export default CoffinTransferDetail;