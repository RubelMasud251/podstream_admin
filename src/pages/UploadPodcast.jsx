import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { IoCloudUpload } from "react-icons/io5";

const UploadPodcast = () => {
  const [Categories, setCategories] = useState([]);

  const url =
    "https://api.imgbb.com/1/upload?key=9111c34f5b459b762cfa32ade144b0ec";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios.post(url, formData).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        const thumbnail = res.data.data.display_url;
        console.log(thumbnail);

        const PodCast = {
          thumbnail,
          guest: data.guest,
          link: data.link,
          category: data.category,
        };

        // post the database
        axios
          .post("https://podscast-server.vercel.app/upload_podcast", PodCast)
          .then((res) => {
            if (res.data.insertedId) {
              toast("PodCast uploaded Successfully!");
              reset();
              setLoading(false);
            }
          });
      }
    });
  };

  useEffect(() => {
    axios.get("https://podscast-server.vercel.app/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <FormContainer className="">
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-4/6 mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {" "}
          PodsCast Info:{" "}
        </h2>
        <div className="w-full mb-2 rounded-md border-2 border-dashed border-purple-400 py-6 cursor-pointer flex flex-col justify-center ">
          <div className="justify-center text-center flex">
            <IoCloudUpload size={60} />
          </div>
          <input
            type="file"
            className="w-fit mx-auto  text-ellipsis "
            {...register("image", { required: true })}
          />
        </div>
        {errors.image && (
          <small className="text-red-500 block">File is required</small>
        )}

        <Label>Guest Name:</Label>
        <input
          type="text"
          placeholder="Guest_Name"
          className="block w-full outline-none bg-transparent rounded-md border border-purple-400 py-1.5 pl-2 pr-10 sm:text-sm sm:leading-6 "
          {...register("guest", { required: true, maxLength: 80 })}
        />
        {errors.guest && (
          <small className="text-red-500 block">Guest Name is required</small>
        )}

        <Label>Video Link:</Label>
        <input
          type="text"
          placeholder="Video_Link"
          className="block w-full outline-none bg-transparent rounded-md border border-purple-400 py-1.5 pl-2 pr-10 sm:text-sm sm:leading-6 "
          {...register("link", { required: true, maxLength: 100 })}
        />
        {errors.link && (
          <small className="text-red-500 block">Video Link is required</small>
        )}

        <Label>Category:</Label>
        <select
          {...register("category", { required: true })}
          className="block w-full outline-none bg-transparent rounded-md border border-purple-400 py-1.5 pl-2 pr-20 sm:text-sm sm:leading-6 mb-2"
        >
          {Categories.map((category) => (
            <Option key={category._id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </select>

        {loading ? (
          <div className="text-center   justify-center flex mt-4">
            <div className="w-fit  px-16 rounded-md h-10 py-1 bg-purple-600">
              <ScaleLoader color="#fff" />
            </div>
          </div>
        ) : (
          <input
            type="submit"
            value="Upload PodsCast"
            disabled={loading}
            className="px-2 py-2 cursor-pointer rounded-md text-white bg-purple-600 text-center justify-center mx-auto block mt-4"
          />
        )}
      </form>
    </FormContainer>
  );
};

export default UploadPodcast;

const FormContainer = styled.div`
  color: ${({ theme }) => theme.text_primary};
  justify-content: center;
  overflow-y: scroll;
  margin: 30px;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const Option = styled.option`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  margin: 0px;
  padding: 0px;
`;
