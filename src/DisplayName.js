export default function ShowName({ children, x, y }) {
  const style = {
    backgroundColor: "white",
    borderRadius: "2%",
  };
  return <div style={style}>{children}</div>;
}
