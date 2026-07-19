import Balance from "./component/Balance";
import Form from "./component/Form";
import Layout from "./component/Layout";
import Transactions from "./component/transection/Transactions";

function App() {
  return (
    <Layout>
      <Balance></Balance>
      <Form></Form>
      <Transactions></Transactions>
    </Layout>
  );
}
export default App;
