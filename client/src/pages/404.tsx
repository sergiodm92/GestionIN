import Link from 'next/link';

const NotFound = () => {
  return (
    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '10rem', marginBottom: '2rem', backgroundColor: '#083045', color: '#ffffff', padding: '1rem 2rem', borderRadius: '10px' }}>
        404
      </h2>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Oops! Esta página no existe.</h1>
      <p style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
        Lo sentimos, no hemos podido encontrar la página que estás buscando.
      </p>
      <Link href="/">
        <a
          style={{
            backgroundColor: '#083045',
            color: '#ffffff',
            fontSize: '1.5rem',
            padding: '1rem 2rem',
            borderRadius: '10px',
            transition: 'background-color 0.2s ease-in-out',
          }}
        >
          Volver al inicio
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
