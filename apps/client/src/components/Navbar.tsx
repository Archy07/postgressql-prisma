import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Mi Tienda</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/productos" className="hover:text-blue-300">Productos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;