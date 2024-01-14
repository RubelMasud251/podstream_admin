import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PodcastCart from "../componets/PodcastCart";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const PodsCast = () => {
  const [allPodsCast, setAllPodsCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://podscast-server.vercel.app/podCasts")
      .then((res) => {
        setAllPodsCast(res.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center h-screen items-center flex justify-center">
        <ScaleLoader color="#be1adb" />
      </div>
    );
  }

  return (
    <PodsCastContainer>
      <FilterContainer>
        <Topic>PodsCasts</Topic>
        <PodsCasts>
          {allPodsCast.map((singlePodcast) => (
            <PodcastCart
              key={singlePodcast._id}
              singlePodcast={singlePodcast}
            ></PodcastCart>
          ))}
        </PodsCasts>
      </FilterContainer>
    </PodsCastContainer>
  );
};

export default PodsCast;

const PodsCastContainer = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768) {
    padding: 6px 10px;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
  font-weight: 600px;
  @media (max-width: 768) {
    font-size: 18px;
  }
`;
// const Span = styled.div`
//   color: ${({ theme }) => theme.primary};
//   font-size: 16px;
//   font-weight: 400px;
//   @media (max-width: 768) {
//     font-size: 14px;
//   }
// `;
const PodsCasts = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Loading = styled.div`
  color: ${({ theme }) => theme.text_primary};
`;
