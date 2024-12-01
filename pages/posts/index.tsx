import { wrapper } from '@/store';
import { selectPosts, selectPostsLoading, selectPostsError, fetchPosts } from '@/store/slices/postSlice';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function PostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    console.log('posts', posts);
  }, [posts]);

  return (
    <>
      <div>
        <Link href='/'>Home</Link>
        <h1>Posts</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <button onClick={() => dispatch(fetchPosts())}>Fetch Posts</button>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(fetchPosts());
  // console.log(store.getState().posts);
  return { props: {} };
});
