import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const WelcomeNotification = () => {
  useEffect(() => {
    Swal.fire({
      title: "Welcome to the Admin Panel",
      html: '<img src="https://t3.ftcdn.net/jpg/00/87/97/06/360_F_87970620_Tdgw6WYdWnrZHn2uQwJpVDH4vr4PINSc.jpg" alt="Welcome Image" style="max-width:100%; height:auto;">',
      showCloseButton: true,
      showCancelButton: false,
    });
  }, []);

  return <></>;
};

export default WelcomeNotification;
