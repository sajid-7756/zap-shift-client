import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Social login/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    console.log("after register", data);

    const profileImg = data.photo[0]; //1. Get file from form
    console.log(profileImg);

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg); // 2. store image in formdata

        axios //3.post this to imagebb
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMAGE_HOST_KEY
            }`,
            formData
          )
          .then((res) => {
            const photoURL = res.data.data.url;

            //create user in db
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL,
            };

            axiosSecure.post("/users", userInfo).then((res) => {
              // console.log(res.data)
              if (res.data.insertedId) {
                console.log("user added in db");
              }
            });

            const updatedData = {
              //4. store in a object
              displayName: data.name,
              photoURL,
            };

            updateUserProfile(updatedData) //5.update profile with data
              .then(() => {
                console.log("Profile updated");
              })
              .catch((err) => console.log(err));
          });

        toast.success("Register success");
        navigate(location?.state || "/");
      })
      .catch((err) => toast.error(err.code));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl text-center text-primary">
            Create Account
          </h2>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                className="input input-bordered w-full"
                placeholder="Name"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("photo", {
                  required: "File is required",
                })}
                type="file"
                className="file-input w-full"
              />
              {errors.photo && (
                <p className="text-error text-sm mt-1">{errors.file.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                    message:
                      "Must include uppercase, lowercase & special character",
                  },
                })}
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full text-black">
                Register
              </button>
            </div>
            <p className="text-gray-600">
              Already have an account?
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
