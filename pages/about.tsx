import Footer from '@/components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../store';
import { increment, selectCounterData } from '../store/slices/counterSlice';

export default function About() {
  const counter = useSelector(selectCounterData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(increment());
  }, []);

  useEffect(() => {
    console.log('About', counter);
  }, [counter]);
  // const { counter, increment, decrement } = useCounter();

  return (
    <>
      <div className='container'>
        <Head>
          <title>About</title>
        </Head>
        <h1>About</h1>
        <Link href='/'>Home</Link>
        <p>
          Love giphys? So do we. use our app <b>giphy search</b> to find the perfect giphy for any occasion.
        </p>

        <h2>Why do people love giphys?</h2>

        <p>
          Some people may work better with words, others with numbers, but everyone gets pictures. 90% of information
          transmitted to the human brain is visual.
        </p>

        <p>
          The old saying "a picture is worth a thousand words" is quite cliche. But that doesn't make it any less true,
          especially in marketing and particularly in the instant-gratification, short attention span world we live in
          today. Getting folks to retain (or even register) your messages and content or take action is harder than
          ever, especially if all you are giving them is words.
        </p>

        <p>
          Images are stronger than words. However, the fast-moving nature of GIFs make them stronger than images and
          their shorter length make them more digestible than video. That's the short answer.
        </p>

        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  console.log('About Page State:', store.getState());

  return { props: {} };
});
