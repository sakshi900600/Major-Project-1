import React, { useEffect, useState } from 'react';
import BlogHeader from './BlogComponents/BlogHeader/BlogHeader';
import BlogList from './BlogComponents/BlogList/BlogList';
import Pagination from './BlogComponents/Pagination/Pagination';
import styles from './BlogPage.module.css';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../../api/blogsAPI';

const ARTICLES_PER_PAGE = 9;

const BlogPage = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // ⬇ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data.blogs);
        setFilteredBlogs(response.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs: ", err);
      }
    };

    fetchBlogs();
  }, []);

  // ⬇ Apply filters (search + category)
  useEffect(() => {
    let result = blogs;

    if (searchTerm.trim() !== '') {
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, blogs]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const handleBlogClick = (blog) => {
    navigate(`/blogs/${blog.slug}`);
  };

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        <BlogHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <BlogList blogs={paginatedBlogs} onBlogClick={handleBlogClick} />

        {filteredBlogs.length === 0 && (
          <div className={styles.noResults}>
            <h3>No articles found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        )}

        {filteredBlogs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
