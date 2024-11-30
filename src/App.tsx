import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import AddProduct from "./features/products/components/addProducts";
import PromptBuilder from "./features/generator/components/promptBuilder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<AddProduct />} />
          <Route path="generate" element={<PromptBuilder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
