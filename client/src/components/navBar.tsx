import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setisLogged, setUser, setTeam } from "../redux/store/user";
import { RootState } from "../redux/store";

function NavBar() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  const handleLogout = () => {
    dispatch(setisLogged(false));
    dispatch(setUser(null));
    dispatch(setTeam([]));
    localStorage.removeItem("userData");
  };

  return (
    <nav className="bg-yellow-300 p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          PokéApp
        </Link>
        {isLogged && (
          <>
            <div className="mt-4 md:flex-row md:flex space-x-4 text-xl">
              <NavLink to="/" className="text-black">
                📚 PokéDex
              </NavLink>
              <NavLink to="/user" className="text-black">
                👤 Usuário
              </NavLink>
              <a
                href="https://pokeapp-jpqjh6z35-http-gabrielalves.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
              >
                🕹️ PokéGame
              </a>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="text-black" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
