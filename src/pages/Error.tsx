import Header from '../components/Header';
const ErrorBoundary = () => {
  return (
    <>
      <Header />
      <main>
        <section className="error">
          <h1 className="error__heading">Something went wrong</h1>
        </section>
      </main>
    </>
  );
};

export default ErrorBoundary;
