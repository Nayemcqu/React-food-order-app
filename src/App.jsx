import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/meals";
import { CartContextProvider } from "./store/CartContex";
import { UserProgressContextProvider } from "./store/UserProgressContext";
function App() {
  return (
    <CartContextProvider>
<UserProgressContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
   </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
