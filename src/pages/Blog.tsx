import { useEffect, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
};

const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "5 Tips for Buying a Bicycle Online Safely",
    excerpt:
      "Make your online bicycle shopping experience safe and smooth with these essential tips.",
    image: "https://source.unsplash.com/800x400/?bicycle,shopping",
    date: "May 4, 2025",
    author: "Arif Hasan",
  },
  {
    id: 2,
    title: "How to Maintain Your Bicycle Like a Pro",
    excerpt:
      "Learn the basics of bicycle maintenance to keep your ride smooth and extend its life.",
    image: "https://source.unsplash.com/800x400/?bicycle,maintenance",
    date: "April 28, 2025",
    author: "CycleCare Team",
  },
  {
    id: 3,
    title: "Top 7 Benefits of Cycling Daily",
    excerpt:
      "Cycling isn’t just fun—it’s also great for your health, budget, and the environment.",
    image: "https://source.unsplash.com/800x400/?cycling,health",
    date: "April 20, 2025",
    author: "Dr. Mahfuz Rahman",
  },
  {
    id: 4,
    title: "Choosing the Right Bike for Your Lifestyle",
    excerpt:
      "From mountain bikes to road bikes—find out which type suits your needs best.",
    image: "https://source.unsplash.com/800x400/?bike,choice",
    date: "April 15, 2025",
    author: "Team BiCycleHub",
  },
];

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Simulate API call
    setBlogs(mockBlogs);
  }, []);

  return (
    <section className=" bg-white py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10 border-b-4 border-yellow-300 inline-block pb-2">
          Latest Blog Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md border border-yellow-400 hover:shadow-xl transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-yellow-500 transition">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {post.date} • by {post.author}
                </p>
                <p className="text-gray-700 text-sm">{post.excerpt}</p>
                <button className="mt-3 inline-block text-yellow-500 font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
