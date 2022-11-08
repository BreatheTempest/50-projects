import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import useHover from '../../utils/useHover';

interface Movie {
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  id: number
  poster_path: string
}

const queryClient = new QueryClient();

async function fetchMovies(url: string) {
  const res = await axios.get(url);
  return res.data;
}

const url =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ca98a3b8c6446c719f9025aed016ff10&page=1';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieApp />
    </QueryClientProvider>
  );
}

function MovieApp() {
  const { isLoading, error, data, isFetching } = useQuery(['movies'], () => fetchMovies(url));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div className='grid grid-cols-fill-40 gap-4 items-center justify-center'>{data?.results.map((movie: Movie) => (<Movie key={movie.id} movie={movie} />))}</div>;
}

function Movie({ movie }: { movie: Movie }) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div ref={hoverRef} className='bg-sky-800 overflow-hidden relative'>
      <img className='w-auto object-cover'
        src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}
        `}
        alt={`Movie poster for ${movie.title}`} />
      <div className={`p-4 absolute w-full bottom-0 bg-sky-800 `}>
        <div className='flex justify-between'>
          <h2 className='text-gray-100 '>{movie.title}</h2>
          <p>{movie.vote_average}</p>
        </div>



      </div>
      <div className={`absolute bg-gray-100 text-gray-900  ${isHovered ? 'right-0 left-0 bottom-0' : 'translate-y-9'} transition max-h-full p-4`}>{movie.overview}</div>
    </div>
  )

}