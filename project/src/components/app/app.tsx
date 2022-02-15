import Main from '../main/main';

type AppProps = {
  promo: {
    title: string,
    genre: string,
    year: string,
  },
  films: {
    id: number,
    image: string,
    title: string,
  }[],
}

function App({promo, films}: AppProps): JSX.Element {
  return (
    <Main promo={promo} films={films}/>
  );
}

export default App;
