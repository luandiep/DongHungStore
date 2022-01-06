import "./App.css";
import Footder from "./Footder";
import Header from "./Header";
import ProductScreen from "./Screen/ProductScreen";
import HomeScreeen from "./Screen/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartScreen from "./Screen/CartScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreeen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/cart/:id/*" element={<CartScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
          </Routes>
        </main>
        <Footder />
      </div>
    </BrowserRouter>
  );
}

export default App;
