import CreateProducts from "../components/CreateProducts";
import PleaseSignIn from "../components/PleaseSignIn";
/* eslint-disable arrow-body-style */
const SellPage = () => {
  return (
    <div>
      <PleaseSignIn>
        <CreateProducts />
      </PleaseSignIn>
    </div>
  );
};

export default SellPage;
