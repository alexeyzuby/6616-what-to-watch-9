import {Fragment} from 'react';

type RatingInputProps = {
  value: number,
  checked: boolean,
  onChange: (value: number) => void;
}

function RatingInput({value, checked, onChange}: RatingInputProps): JSX.Element {
  return (
    <Fragment>
      <input
        className="rating__input"
        id={`star-${value}`}
        type="radio"
        name="rating"
        value={value}
        checked={checked}
        onChange={({target}) => onChange(Number(target.value))}
      />
      <label className="rating__label" htmlFor={`star-${value}`}>{`Rating ${value}`}</label>
    </Fragment>
  );
}

export default RatingInput;
