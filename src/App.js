import { useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchCart } from "./redux/reducers/cartReducer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/reducers/authReducer";
import Navbar from "./components/Navbar/Navbar";
import CartPage from "./pages/CartPage/CartPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { fetchProducts } from "./redux/reducers/productsReducer";

function App() {
  const auth = getAuth();
  const { setAuthUser, clearUser } = authActions;
  const dispatch = useDispatch();

  // Authenticate the user if he is already logged in and set the user in the auth context.
  useEffect(() => {
    // ✅ subscribe to Firebase auth state

    dispatch(fetchProducts());
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in
        const userData = await getDoc(doc(db, "users", firebaseUser.uid));
        console.log(firebaseUser?.uid);
        const { name, email } = userData.data();
        dispatch(
          setAuthUser({
            name,
            email,
            uid: firebaseUser.uid,
          })
        );
        dispatch(fetchCart(firebaseUser.uid));
      } else {
        // User is logged out
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // cleanup
    //eslint-disable-next-line
  }, []);
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
    </div>
  );
}

export default App;
