// src/pages/BlogPage/BlogDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogDetail from './BlogComponents/BlogDetail/BlogDetail';
import { getAllBlogs, getBlogById } from '../../api/blogsAPI';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    loadBySlug(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Resolve slug -> id (try to find in list; if not, fetch the list)
  const loadBySlug = async (slugToFind) => {
    try {
      setLoading(true);
      setError(null);

      // 1) fetch the list (small cost) to find the _id for this slug
      const listRes = await getAllBlogs(); // returns { data: { blogs: [...] } }
      const blogs = listRes.data.blogs || [];

      const found = blogs.find(b => b.slug === slugToFind);

      if (!found) {
        setError('Blog not found');
        return;
      }

      const id = found._id;

      // 2) fetch blog detail using ID
      const detailRes = await getBlogById(id); // expected to return blog object inside res.data or res.data.blog
      // try common response shapes:
      const blogData = detailRes.data?.blog ?? detailRes.data ?? detailRes.data?.data;
      setBlog(blogData);
    } catch (err) {
      console.error("Error loading blog detail", err);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading blog...</div>;
  if (error) return (
    <div style={{ padding: 24 }}>
      <p>{error}</p>
      <button onClick={() => navigate('/blogs')}>Back to blogs</button>
    </div>
  );

  return (
    // Keep exact API of BlogDetail: it expects blog and onBack
    <BlogDetail blog={blog} onBack={() => navigate('/blogs')} />
  );
};

export default BlogDetailPage;
