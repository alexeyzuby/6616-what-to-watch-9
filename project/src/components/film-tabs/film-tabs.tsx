import {Fragment, MouseEvent, useState} from 'react';
import {reviews} from '../../mocks/reviews';
import {Film} from '../../types/film';
import TabOverview from './tab-overview';
import TabDetails from './tab-details';
import TabReviews from './tab-reviews';

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

  let currentTab: JSX.Element | null = null;

  switch (current) {
    case TabsItems.Overview:
      currentTab = <TabOverview film={film}/>;
      break;
    case TabsItems.Details:
      currentTab = <TabDetails film={film}/>;
      break;
    case TabsItems.Reviews:
      currentTab = <TabReviews reviews={reviews}/>;
      break;
  }

  return (
    <Fragment>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(TabsItems).map((tab) => (
            <li key={tab} className={`film-nav__item${tab === current ? ' film-nav__item--active' : ''}`}>
              <a href="#" className="film-nav__link" onClick={(evt) => tabClickHandler(evt, tab)}>{tab}</a>
            </li>
          ))}
        </ul>
      </nav>

      {currentTab}
    </Fragment>
  );
}

export default FilmTabs;
