import Head from 'next/head';
import { useRouter } from 'next/router';
import { InitialDataProps } from '..';

type searchGetServerSideProps = {
  query: {
    searchTerm: string;
  };
};

export default function Search(initialData: InitialDataProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Search results for: {router.query.searchTerm}</title>
        <meta name='description' content={initialData.giphys.data.map((each, index) => each.title + ' ')}></meta>
      </Head>
      <h1>Search results for: {router.query.searchTerm}</h1>

      <div className='giphy-search-results-grid'>
        {initialData.giphys.data.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context: searchGetServerSideProps) {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=SXQwI6VJSOXXhcz6niY54Cv7OVByfaIN&limit=6`,
  );
  const giphyJson = await giphys.json();
  return { props: { giphys: giphyJson } };
}
