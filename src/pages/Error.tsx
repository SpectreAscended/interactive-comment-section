import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouteError } from 'react-router';
import './error.scss';

interface Error {
  message: string;
  status: number;
  data: {
    message: string;
  };
}

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;

  let title = 'An error occured!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <Header />
      <main>
        <section className="error">
          <h1 className="error__heading">{title}</h1>
          <p>{message}</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ErrorBoundary;
