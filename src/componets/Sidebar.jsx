import React from "react";
import styled from "styled-components";
import {
  HomeRounded,
  CloseRounded,
  LightModeRounded,
  DarkModeRounded,
  CloudUploadRounded,
  LogoutRounded,
} from "@mui/icons-material";
import LogoImage from "../Images/Logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ setMenuOpen, menuOpen, setDarkMode, darkMode }) => {
  const menuItems = [
    {
      id: 1,
      link: "/",
      name: "PodsCasts",
      icon: <HomeRounded />,
    },
    {
      id: 2,
      link: "/upload_podcast",
      name: "Upload PodsCast",
      icon: <CloudUploadRounded />,
    },
  ];

  const button = [
    {
      id: 1,
      fun: () => setDarkMode(!darkMode),
      name: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightModeRounded /> : <DarkModeRounded />,
    },
    {
      id: 2,
      fun: () => console.log("Upload"),
      name: "Log Out",
      icon: <LogoutRounded />,
    },
  ];
  return (
    <MenuContainer menuOpen={menuOpen} onClick={() => setMenuOpen(false)}>
      <Flex>
        <Link to="/">
          <Logo>
            <Image src={LogoImage} alt="logo" />
            PodsStream
          </Logo>
        </Link>
        <Close onClick={() => setMenuOpen(false)}>
          <CloseRounded />
        </Close>
      </Flex>
      {menuItems.map((item) => (
        <Link
          to={item.link}
          key={item.id}
          className="no-underline"
          style={{ textDecoration: "none" }}
        >
          <Elements>
            {item.icon}
            <NavText>{item.name}</NavText>
          </Elements>
        </Link>
      ))}

      <HR />

      {button.map((item) => (
        <Elements onClick={item.fun} key={item.id}>
          {item.icon}
          <NavText>{item.name}</NavText>
        </Elements>
      ))}
    </MenuContainer>
  );
};

export default Sidebar;

const MenuContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 100;
    width: 100%;
    max-width: 250px;
    left: ${({ menuOpen }) => (menuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 15px 0px;
`;

const Image = styled.img`
  height: 40px;
`;
const Close = styled.div`
  cursor: pointer;
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const Elements = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 16px;
  justify-content: flex-start;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};

  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;

const NavText = styled.div`
  padding: 12px 0px;
`;

const HR = styled.hr`
  width: 100%;
`;
