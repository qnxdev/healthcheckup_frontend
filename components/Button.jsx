export const Button = ({ width, inverted, children, onClick }) => {
  return (
    <>
      <button className="button" onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
            .button{
                width: ${width || 'initial'};
            }
      `}</style>
    </>
  );
};
