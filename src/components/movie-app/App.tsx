import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

interface Movie {
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  id: number
}

const queryClient = new QueryClient();

const url =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ca98a3b8c6446c719f9025aed016ff10';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieApp />
    </QueryClientProvider>
  );
}

function MovieApp() {
  const { isLoading, error, data, isFetching } = useQuery(['movies'], () =>
    axios.get(url).then((res) => res.data)
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>{data?.results.map((movie: Movie) => (<div key={movie.id}>{movie.title}</div>))}</div>;
}
