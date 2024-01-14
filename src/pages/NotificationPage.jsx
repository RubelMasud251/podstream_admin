import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { IoCloudUpload } from "react-icons/io5";
import { useEffect, useState } from "react";

const NotificationPage = () => {
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
      if (res.data.success) {
        const imglink = res.data.data.display_url;
        console.log(imglink);

        const notificationInfo = {
          imglink,
        };

        // post the database
        axios
          .patch(
            `https://podscast-server.vercel.app/update_notification/65a2c121a6e9544e226d44c5`,
            notificationInfo
          )
          .then((res) => {
            if (res.data.acknowledged) {
              toast("Notification uploaded Successfully!");
              reset();
              setLoading(false);
            }
          });
      }
    });
  };
  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-4/6 mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {" "}
          Notification
        </h2>
        <div className="w-full mb-2 rounded-md border-2 border-dashed border-purple-400 py-6 cursor-pointer flex flex-col justify-center ">
          <div className="justify-center text-center flex">
            <IoCloudUpload size={60} />
          </div>
          <input
            type="file"
            defaultValue={Notification.imglink}
            className="w-fit mx-auto  text-ellipsis "
            {...register("image", { required: true })}
          />
        </div>
        {errors.image && (
          <small className="text-red-500 block">File is required</small>
        )}

        {loading ? (
          <div className="text-center   justify-center flex mt-4">
            <div className="w-fit  px-16 rounded-md h-10 py-1 bg-purple-600">
              <ScaleLoader color="#fff" />
            </div>
          </div>
        ) : (
          <input
            type="submit"
            value="Notification Update"
            disabled={loading}
            className="px-2 py-2 cursor-pointer rounded-md text-white bg-purple-600 text-center justify-center mx-auto block mt-4"
          />
        )}
      </form>
    </MainContainer>
  );
};

export default NotificationPage;

const MainContainer = styled.div`
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
`;
