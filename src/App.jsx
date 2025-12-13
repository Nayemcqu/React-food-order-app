import Header from "./components/Header";
import Meals from "./components/meals";
import { CartContextProvider } from "./store/CartContex";
function App() {
  return (
    <CartContextProvider>

      <Header/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
