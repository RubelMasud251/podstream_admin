import React from "react";
import styled from "styled-components";
import { Menu } from "@mui/icons-material";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <NavDiv>
      <MenuBtn onClick={() => setMenuOpen(true)}>
        <Menu />
      </MenuBtn>
      <div class="flex -space-x-2 overflow-hidden justify-end w-full">
        <img
          class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </NavDiv>
  );
};

export default Navbar;

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
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
  @media (max-width: 1100px) {
    display: block;
  }
`;
