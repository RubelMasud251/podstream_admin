import React from "react";
import styled from "styled-components";
import {
  HomeRounded,
  CloseRounded,
  CloudUploadRounded,
  NotificationAdd,
} from "@mui/icons-material";
import LogoImage from "../Images/Logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ setMenuOpen, menuOpen }) => {
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
    {
      id: 3,
      link: "/notification",
      name: "Notification",
      icon: <NotificationAdd />,
    },
  ];

  return (
    <MenuContainer menuOpen={menuOpen} onClick={() => setMenuOpen(false)}>
      <Flex>
        <Link to="/">
          <Logo>
            <Image src={LogoImage} alt="logo" />2 Sents Podcast
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
    </MenuContainer>
  );
};

export default Sidebar;

const MenuContainer = styled.div`
  padding: 0px 10px;
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
  padding: 10px 12px;
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
  border-radius: 9999px;
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
  padding: 0px 12px;
  justify-content: flex-start;
  border-radius: 9999px;
  transition: 0.3s ease-out;
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
