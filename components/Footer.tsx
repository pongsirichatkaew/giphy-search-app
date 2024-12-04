import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className='footer'>
        <p>
          <Link href='/'>Home</Link>
        </p>
        <p>
          <Link href='/about'>About</Link>
        </p>
        <p>
          <Link href='/posts'>Posts</Link>
        </p>
      </div>
    </>
  );
}
