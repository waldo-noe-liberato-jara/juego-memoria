/**
 * Icono con soporte para propiedades SVG estándar.
 * @param {React.SVGProps<SVGSVGElement>} props - Propiedades del SVG.
 */
const TrophyIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth="32"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M176 464h160" />
      <path d="M256 464V336" />
      <path d="M384 224c0-50.64-.08-134.63-.12-160a16 16 0 00-16-16l-223.79.26a16 16 0 00-16 15.95c0 30.58-.13 129.17-.13 159.79 0 64.28 83 112 128 112S384 288.28 384 224z" />
      <path d="M128 96H48v16c0 55.22 33.55 112 80 112" />
      <path d="M384 96h80v16c0 55.22-33.55 112-80 112" />
    </svg>
  );
};

export default TrophyIcon;
