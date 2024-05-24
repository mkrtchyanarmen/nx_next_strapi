import Link from 'next/link';
import { getBlogs } from './utils';

const BlogsPage = async () => {
  const blogs = await getBlogs();

  return (
    <div className="relative w-screen h-screen pt-10 px-10">
      <Link href="/" className="absolute left-2 top-2 text-blue-500">
        Form
      </Link>
      <div className="flex gap-4">
        {blogs?.map(({ title, description, date }, idx) => (
          <div key={idx} className="rounded w-fit p-3 shadow-md">
            <h4>{title}</h4>
            <p>{description}</p>
            <span>
              <b>Date</b>:{date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
