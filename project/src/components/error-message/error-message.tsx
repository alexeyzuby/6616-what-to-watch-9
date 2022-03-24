import {useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const {error} = useAppSelector((state) => state);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: '999',
          bottom: '30px',
          left: '30px',
          padding: '4px 8px',
          fontSize: '14px',
          backgroundColor: '#d96666',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
