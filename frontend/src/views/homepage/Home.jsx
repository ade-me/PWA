import Navbar from '../../layouts/Navbar/Navbar';
import './HomeStyles.css';
import Posts from '../../layouts/Posts/Posts';

function Home() {
  return (
    <section className='Home-page flex items-center justify-center flex-col w-screen h-screen'>
      <Navbar />
      <section className='h-[calc(100vh-150px)] w-[100%] flex flex-col items-center pt-70px pl-3 pr-3 pb-10px gap-3 overflow-y-auto'>
        <Posts />
        <Posts />
      </section>
    </section>
  );
}

export default Home;
