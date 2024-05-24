import Link from 'next/link';
import RegisterForm from './RegisterForm';

const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <Link href="/blogs" className="absolute left-2 top-2 text-blue-500">
        Blogs
      </Link>
      <RegisterForm />
    </div>
  );
};

export default Home;
