import Head from 'next/head';
import React from 'react';
import { useEffect } from 'react';

export default function Home(initialData) {
  useEffect(() => {
    console.log(initialData);
  });

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
      </Head>

      <h1>Giphy Search App</h1>

      {initialData.catGiphys.data.map((each, index) => {
        return (
          <div key='index'>
            <h3>{each.title}</h3>
            <img src={each.images.original.url} alt={each.title} />
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  let catGiphys = await fetch(
    'https://api.giphy.com/v1/gifs/search?q=cats&api_key=SXQwI6VJSOXXhcz6niY54Cv7OVByfaIN&limit=10',
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
}
