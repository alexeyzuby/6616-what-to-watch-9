function LoadingScreen(): JSX.Element {
  return (
    <p
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        margin: '0',
        transform: 'translate(-50%, -50%)',
      }}
    >
      Loading...
    </p>
  );
}

export default LoadingScreen;
