import React from "react";
import styled from "styled-components";

const NotificationPage = () => {
  return <MainContainer></MainContainer>;
};

export default NotificationPage;

const MainContainer = styled.div`
  color: ${({ theme }) => theme.text_primary};
`;
