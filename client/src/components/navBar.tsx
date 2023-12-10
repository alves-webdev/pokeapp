
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setisLogged, setUser, setTeam } from '../redux/store/user';

function NavBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {

    dispatch(setisLogged(false));
    dispatch(setUser(null));
    dispatch(setTeam([]));
    localStorage.removeItem('userData'); 

  };

  return (
    <nav className="bg-yellow-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">PokéApp</Link>

        <div className="space-x-4 text-xl">
          <NavLink to="/" className="text-black">🏠 Home</NavLink>
          <NavLink to="/user" className="text-black">👤 User</NavLink>
        </div>

        <div>
          <button className="text-black" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
