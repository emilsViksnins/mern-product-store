import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom"; // Ensure Routes is imported
import HomePage from './pages/HomePage.jsx'; // Import the actual pages
import CreatePage from './pages/CreatePage';
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.300", "gray.900")}>
     <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
