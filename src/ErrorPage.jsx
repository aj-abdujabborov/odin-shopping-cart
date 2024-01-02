import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Not found</h1>
      <p>Sorry, the page couldn&apos;t be found.</p>
      <Link to="/">Go home</Link>
      <p>Error message: {error.statusText || error.message}</p>
    </div>
  );
}
