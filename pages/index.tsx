import Footer from '@/components/Footer';
import { selectPosts } from '@/store/slices/postSlice';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../store';
import { increment, selectCounterData } from '../store/slices/counterSlice';

type GiphyData = {
  title: string;
  images: {
    original: {
      url: string;
    };
  };
};

export type InitialDataProps = {
  giphys: {
    data: GiphyData[];
  };
};

export default function Home({ giphys }: InitialDataProps) {
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

  // useEffect(() => {
  //   dispatch(increment());
  // }, []);

  // useEffect(() => {
  //   console.log('Home', counter, posts);
  // }, [counter, posts]);

  useEffect(() => {
    setSearchResults(giphys.data);
  }, [giphys]);

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
        <title>Giphy Search App</title>
        <meta
          name='description'
          content='Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation'></meta>
      </Head>

      <h1>Giphy Search App</h1>

      <form onSubmit={search}>
        <input name='searchTerm' onChange={handleInputs} type='text' required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <p>
        Share this search with others:
        <Link href='/search/[pid]' as={`/search/${searchTerm}`}>
          {`http://localhost:3000/search/${searchTerm}`}
        </Link>
      </p>

      <div className='giphy-search-results-grid'>
        {searchResults.map((each, index) => (
          <div key={index}>
            <h3>{each.title}</h3>
            <img src={each.images.original.url} alt={each.title} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${API_KEY}&limit=10`,
  );
  const giphys = await response.json();
  return { props: { giphys } };
});
