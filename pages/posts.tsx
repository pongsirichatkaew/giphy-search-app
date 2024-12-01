import { AppDispatch, AppStore, wrapper } from '@/store';
import { fetchPosts, Post, selectPostsError, selectPostsLoading } from '@/store/slices/postSlice';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PostsPage({ posts }: { posts: Post[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  return (
    <>
      <Link href='/'>Home</Link>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={() => dispatch(fetchPosts())}>Fetch Posts</button>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </React.Fragment>
      ))}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store: AppStore) => async () => {
  await store.dispatch(fetchPosts());
  return {
    props: {
      posts: store.getState().posts.posts,
    },
  };
});
