import { Formik, Field } from "formik";

const Transfer = () => {
const date = new Date()
  const initialValues = {
    date: date.getTime(),
    add_id: "",
    coffin_group_id: "",
    place_origin: "",
    place_destiny: "",
    responsible: "",
    coffin: {
      id: "",
      units: 1,
      size: "",
      color: "",
      type: "",
      mbox: false,
      supplier: "",
    },
  };
  const handleSubmit = () => {};
  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>

      </Formik>
    </section>
  );
};

export default Transfer;
