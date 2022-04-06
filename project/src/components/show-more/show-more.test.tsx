import {render, screen} from '@testing-library/react';
import ShowMore from './show-more';

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    const maxFilmChangeHandler = jest.fn();

    render(
      <ShowMore setMaxFilmCount={maxFilmChangeHandler}/>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
