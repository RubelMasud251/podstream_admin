import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = ({ handleLogin }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when submitting the form
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    console.log(loginInfo);
    try {
      const response = await fetch("https://podscast-server.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        handleLogin(responseData);
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 lg:w-2/6 mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-4">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label>Email</label>
            <input
              placeholder="admin email"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset  sm:text-sm sm:leading-6"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="text-red-500 block">email is required</small>
            )}
          </div>

          <div className="mb-8">
            <label>Password</label>
            <input
              placeholder="password"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset  sm:text-sm sm:leading-6"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <small className="text-red-500 block">password is required</small>
            )}
          </div>

          <div className="">
            <input
              className={`flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              value={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
