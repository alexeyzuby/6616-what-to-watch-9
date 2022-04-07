import {render, screen} from '@testing-library/react';
import FilmPreview from './film-preview';
import {makeFakeFilm} from '../../utils/mocks';

const fakeFilm = makeFakeFilm(1);

describe('Component: FilmPreview', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <FilmPreview
        src={fakeFilm.videoLink}
        poster={fakeFilm.posterImage}
        isActive={false}
      />,
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
