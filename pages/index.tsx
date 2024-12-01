import Head from 'next/head';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

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
    searchTerm: '',
  });
  const [searchResults, setSearchResults] = useState<GiphyData[]>([]);

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

export async function getServerSideProps() {
  console.log('getStaticProps called...');
  const response = await fetch(
    'https://api.giphy.com/v1/gifs/search?q=cats&api_key=SXQwI6VJSOXXhcz6niY54Cv7OVByfaIN&limit=10',
  );
  const catGiphys = await response.json();
  console.log('fetchCalled');
  return { props: { catGiphys } };
}
