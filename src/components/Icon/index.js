export function Icon({ name, size = 1, onClick }) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/icons/${name}.png`}
      alt={name}
      style={{
        height: `${size}rem`,
        width: `${size}rem`,
      }}
      onClick={onClick}
    ></img>
  );
}