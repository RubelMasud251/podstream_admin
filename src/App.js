import { useState } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Themes";
import Sidebar from "./componets/Sidebar";
import Navbar from "./componets/Navbar";
import Notification from "./componets/Notification";
import PodsCast from "./pages/PodsCast";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UploadPodcast from "./pages/UploadPodcast";
import EditPodCast from "./pages/EditPodCast";
import PopUp from "./pages/PopUp";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Notification />
      <BrowserRouter>
        <Container>
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
          />

          <Frame>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Routes>
              <Route path="/" element={<PodsCast />}></Route>
              <Route path="/upload_podcast" element={<UploadPodcast />}></Route>
              <Route path="/popup" element={<PopUp />}></Route>
              <Route path="/edit_podcast/:id" element={<EditPodCast />}></Route>
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2.5;
`;
