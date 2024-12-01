import { selectPosts } from '@/store/slices/postSlice';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../store';
import { increment, selectCounterData } from '../store/slices/counterSlice';
// import { useCounter } from '../contexts/CounterContext';

// Define the type for Giphy data
type GiphyData = {
  title: string;
  images: {
    original: {
      url: string;
    };
  };
};

type InitialDataProps = {
  catGiphys: {
    data: GiphyData[];
  };
};

export default function Home({ catGiphys }: InitialDataProps) {
  const [searchTerm, setSearchTerm] = useState<string>('cats');
  const [formInputs, setFormInputs] = useState<{ searchTerm: string }>({
    searchTerm: 'cat',
  });
  const [searchResults, setSearchResults] = useState<GiphyData[]>([]);
  const counter = useSelector(selectCounterData);
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  // console.log('posts', posts);
  // const { counter, increment, decrement } = useCounter();

  useEffect(() => {
    dispatch(increment());
  }, []);

  useEffect(() => {
    console.log('Home', counter, posts);
  }, [counter, posts]);

  useEffect(() => {
    setSearchResults(catGiphys.data);
  }, [catGiphys]);

  const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const search = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`,
    );
    const giphys = await response.json();
    setSearchResults(giphys.data);
    setSearchTerm(formInputs.searchTerm);
  };

  return (
    <div className='container'>
      <Head>
        <title>Giphy App</title>
      </Head>

      <h1>Giphy Search App</h1>
      <Link href='/about'>About</Link>
      <Link className='ml-3' href='/posts'>
        Posts
      </Link>

      <form onSubmit={search}>
        <input name='searchTerm' onChange={handleInputs} type='text' required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <div className='giphy-search-results-grid'>
        {searchResults.map((each, index) => (
          <div key={index}>
            <h3>{each.title}</h3>
            <img src={each.images.original.url} alt={each.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  // console.log('Home Page State:', store.getState());

  const response = await fetch(
    'https://api.giphy.com/v1/gifs/search?q=cats&api_key=SXQwI6VJSOXXhcz6niY54Cv7OVByfaIN&limit=10',
  );
  const catGiphys = await response.json();
  return { props: { catGiphys } };
});
