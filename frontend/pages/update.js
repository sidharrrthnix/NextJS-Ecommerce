import UpdateProduct from "../components/UpdateProduct";

/* eslint-disable arrow-body-style */
const SellPage = ({ query }) => {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
};

export default SellPage;
