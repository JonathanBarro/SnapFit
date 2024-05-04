// function Button() {
//   return (
//     <>
//       <button className="bg-regal-blue px-5 py-2 text-white">Boton</button>
//     </>
//   );
// }

const Button = (props) => {
    const {name} = props
  return (
    <>
      <button className="bg-regal-blue px-5 py-2 text-white">{name}</button>
    </>
  );
};

export default Button;
