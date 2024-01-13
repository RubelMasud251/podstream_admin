import React from "react";
import styled from "styled-components";
import { CiMenuFries } from "react-icons/ci";
import ToggleButton from "react-toggle-button";
import "../styled/index.css";
import { LogoutOutlined } from "@mui/icons-material";

const Navbar = ({ setMenuOpen, setDarkMode, darkMode, handleLogout }) => {
  return (
    <NavDiv>
      <MenuBtn onClick={() => setMenuOpen(true)}>
        <CiMenuFries />
      </MenuBtn>

      <div className="flex  gap-4 justify-end items-center w-full">
        <button onClick={() => setDarkMode(!darkMode)}>
          <ToggleButton
            value={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
          />
        </button>
        <div className="user-dropdown-wrapper">
          <div className="h-full py-2">
            <img
              className="user-img w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <Dropdown>
            <div className="user-dropdown bg-transparent text-center flex flex-col gap-3">
              <img
                className="user-img w-12 h-12 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="">
                <h4 className="text-xl">Admin Email</h4>
              </div>
              <hr />
              <button className="font-bold">
                <LogoutOutlined />
                Sign Out
              </button>
            </div>
          </Dropdown>
        </div>
      </div>
    </NavDiv>
  );
};

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 40px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
`;

const MenuBtn = styled.div`
  cursor: pointer;
  display: none;
  font-size: 30px;
  font-weight: bolder;
  @media (max-width: 1100px) {
    display: block;
  }
`;

const Dropdown = styled.div`
  color: ${({ theme }) => theme.text_primary};
  z-index: 100 !important;
`;

export default Navbar;
