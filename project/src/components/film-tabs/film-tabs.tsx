import {MouseEvent, useState} from 'react';
import {reviews} from '../../mocks/reviews';
import {Film} from '../../types/film';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';

type FilmTabsProps = {
  film: Film;
};

const TabsItems = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews',
};

function FilmTabs({film}: FilmTabsProps) {
  const [current, setCurrent] = useState(TabsItems.Overview);

  const tabClickHandler = (evt: MouseEvent<HTMLAnchorElement>, tab: string) => {
    evt.preventDefault();
    setCurrent(tab);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(TabsItems).map((tab) => (
            <li key={tab} className={`film-nav__item${tab === current ? ' film-nav__item--active' : ''}`}>
              <a href="#" className="film-nav__link" onClick={(evt) => tabClickHandler(evt, tab)}>{tab}</a>
            </li>
          ))}
        </ul>
      </nav>

      {current === TabsItems.Overview && <OverviewTab film={film}/>}
      {current === TabsItems.Details && <DetailsTab film={film}/>}
      {current === TabsItems.Reviews && <ReviewsTab reviews={reviews}/>}
    </>
  );
}

export default FilmTabs;
