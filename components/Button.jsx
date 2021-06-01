import Link from "next/link";
export const Button = ({ width, inverted, children, onClick, link, title }) => {
  const buttonStyle = { width: width || "initial" };
  return (
    <>
      {link ? (
        <Link href={link}>
          <button title={title} style={buttonStyle} className={`button${inverted ? " invertedbutton":""}`}>
            {children}
          </button>
        </Link>
      ) : (
        <button
          title={title}
          style={buttonStyle}
          className={`button${inverted ? " invertedbutton":""}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      <style>{`
      .invertedbutton{
        background: transparent !important;
        color: #fff;
      }
      .invertedbutton:hover{
        background: #fff !important;
        color: #192a48;
      }
      `}</style>
    </>
  );
};
