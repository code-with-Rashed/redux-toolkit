import Posts from "../components/posts/Posts";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <section className="wrapper">
      <Sidebar></Sidebar>
      <Posts />
    </section>
  );
};
export default Home;
