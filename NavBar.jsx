import { Link, Outlet } from "react-router-dom";
import { useSearch } from "../main_files/MainPage/SearchContext";

function NavBar() {
  const { search, setSearch } = useSearch();

  return (
    <div>
      <header>
        <div className="nav_div">
          <p>DEV@Deakin</p>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            value={search}
          />
          
          <div className="nav_but">
            <Link to="/">
              <img src="./images/home.png" alt="Home icon" />
            </Link>
            <Link to="/find-question">
              <button>Find Question</button>
            </Link>
            <Link to="/post">
              <button>Post</button>
            </Link>
            <Link to="/plans">
              <button>Plans</button> {/* New Plans Button */}
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;
