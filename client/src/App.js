import './App.css';
import Navbar from "./Components/Navbar";
import VendorForm from "./Components/VendorForm";
import VendorList from "./Components/VendorList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorEdit from "./Components/EditForm";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<VendorList />} />
        <Route path="/form" element={<VendorForm />} />
        <Route path="/update/:id" element={<VendorEdit />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
