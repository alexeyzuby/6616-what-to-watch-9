import {MouseEvent, useState} from 'react';
import {Film} from '../../types/film';
import {FilmComment} from '../../types/comment';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import {FilmTabsItems} from '../../const';

type FilmTabsProps = {
  film: Film,
  comments: FilmComment[],
};

function FilmTabs({film, comments}: FilmTabsProps) {
  const [current, setCurrent] = useState(FilmTabsItems.Overview);

  const tabClickHandler = (evt: MouseEvent<HTMLAnchorElement>, tab: string) => {
    evt.preventDefault();
    setCurrent(tab);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(FilmTabsItems).map((tab) => (
            <li key={tab} className={`film-nav__item${tab === current ? ' film-nav__item--active' : ''}`}>
              <a href="#" className="film-nav__link" onClick={(evt) => tabClickHandler(evt, tab)}>{tab}</a>
            </li>
          ))}
        </ul>
      </nav>

      {current === FilmTabsItems.Overview && <OverviewTab film={film}/>}
      {current === FilmTabsItems.Details && <DetailsTab film={film}/>}
      {current === FilmTabsItems.Reviews && <ReviewsTab comments={comments}/>}
    </>
  );
}

export default FilmTabs;
