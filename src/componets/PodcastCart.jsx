import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const PodcastCart = ({ singlePodcast }) => {
  const { guest, _id, category, link, thumbnail } = singlePodcast || {};
  const [deleted, setDeleted] = useState(false);

  const handleDeletePodCast = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://podscast-server.vercel.app/delete_podcast/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              setDeleted(true);
              Swal.fire({
                title: "Deleted!",
                text: "Your podCast has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  if (deleted) {
    return null; // Don't render anything if the podcast is deleted
  }

  return (
    <PodcastCartContainer>
      <Link to={link} style={{ textDecoration: "none" }}>
        <PodcastImg src={thumbnail} alt="Img"></PodcastImg>
        <PodcastDetails>
          <GuestName>
            <span className="font-semibold">Guest</span>: {guest}
          </GuestName>
          <PodCastCategory>
            <span className="font-semibold">Category</span>: {category}
          </PodCastCategory>
        </PodcastDetails>
      </Link>
      <Action>
        <Link to={`/edit_podcast/${_id}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={() => handleDeletePodCast(_id)}>Delete</Button>
      </Action>
    </PodcastCartContainer>
  );
};

export default PodcastCart;

const PodcastCartContainer = styled.div`
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: auto;
  background-color: ${({ theme }) => theme.card};
`;

const PodcastImg = styled.img`
  height: 120px;
  width: 100%;
  border-radius: 3px;
`;

const PodcastDetails = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  padding: 10px;
`;

const GuestName = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap; /* Prevents text from wrapping */
  overflow: hidden; /* Hides any text that overflows */
`;

const PodCastCategory = styled.div`
  font-size: 14px;
`;

const Action = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin: 10px 10px 5px 10px;
`;

const Button = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.bgLight};
  padding: 3px 20px;
  border-radius: 5px;
  font-weight: 600px;
  cursor: pointer;
`;
