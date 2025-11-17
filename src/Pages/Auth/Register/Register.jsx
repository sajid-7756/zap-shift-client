import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Social login/SocialLogin";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log("after register", data);

    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        //1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        //2. post it in imagebb
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMAGE_HOST_KEY
            }`,
            formData
          )
          .then((res) => {
            console.log("after image upload", res.data.data.url);
            //3. store it to an object
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };
            //4.update profile with using updateUserProfile function
            updateUserProfile(userProfile)
              .then(() => {
                console.log("User profile updated");
              })
              .catch((err) => toast.error(err.message));
          })
          .catch((err) => console.log(err));

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
                <span className="label-text">Name</span>
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
