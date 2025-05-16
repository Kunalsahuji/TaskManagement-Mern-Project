// import React, { useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// const Navbar = () => {
//     const location = useLocation();
//     const { user, logout } = useContext(AuthContext);

//     return (
//         <nav className="flex justify-between items-center bg-blue-500 p-4 text-white">
//             <div>
//                 <Link to="/" className="font-bold text-lg hover:text-gray-200">
//                     Task Manager
//                 </Link>
//             </div>
//             <div>
//                 {user ? (
//                     <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
//                         Logout
//                     </button>
//                 ) : (
//                     <>
//                         {location.pathname === "/" ? (
//                             <Link to="/login" className="px-4 py-2 hover:text-gray-200">
//                                 Login
//                             </Link>
//                         ) : (
//                             <Link to="/" className="px-4 py-2 hover:text-gray-200">
//                                 Register
//                             </Link>
//                         )}
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="flex justify-between items-center bg-blue-500 p-4 text-white">
            <Link to="/" className="font-bold text-lg hover:text-gray-200">
                Task Manager
            </Link>
            <div>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="px-4 py-2 hover:text-gray-200">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
