import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import CartPage from "./pages/CartPage/CartPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { setAuthUser } from "./redux/reducers/authReducer";

function App() {
  // const auth = getAuth();
  // const dispatch = useDispatch();

  // Authenticate the user if he is already logged in and set the user in the auth context.
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(setAuthUser({ user }));
  //     }
  //   });
  // }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/signup", element: <RegisterPage /> },
        { path: "/signin", element: <LoginPage /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/myorders", element: <OrdersPage /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
