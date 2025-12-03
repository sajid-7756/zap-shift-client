import React from "react";
import { FaUserShield } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserManagementTable = ({ user, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { displayName, email, photoURL, role } = user || {};

  // const handleMakeUser = (user) => {
  //   const roleInfo = { role: "admin" };
  //   axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
  //     console.log(res.data);
  //     if (res.data.modifiedCount) {
  //       Swal.fire({
  //         position: "top-end",
  //         text: `${user.displayName} marked as an Admin .`,
  //         icon: "success",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       refetch();
  //     }
  //   });
  // };
  // const handleRemoveAdmin = (user) => {
  //   const roleInfo = { role: "user" };
  //   axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
  //     console.log(res.data);
  //     if (res.data.modifiedCount) {
  //       Swal.fire({
  //         position: "top-end",
  //         text: `${user.displayName} marked as an User .`,
  //         icon: "success",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       refetch();
  //     }
  //   });
  // };

  const handleUser = (user, role) => {
    const roleInfo = { role };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          text: `${user.displayName} marked as an ${role} .`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleMakeUser = () => {
    handleUser(user, "admin");
  };

  const handleRemoveAdmin = () => {
    handleUser(user, "user");
  };

  return (
    <>
      <tr key={user._id}>
        <th>{index + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{displayName}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>{email}</td>
        <td>{role}</td>
        <th>
          <div className="flex gap-3">
            {user.role === "admin" ? (
              <button
                onClick={() => handleRemoveAdmin()}
                className="btn btn-error btn-sm flex items-center gap-2"
              >
                <MdAdminPanelSettings size={18} />
                Remove Admin
              </button>
            ) : (
              <button
                onClick={() => handleMakeUser()}
                className="btn btn-success btn-sm flex items-center gap-2"
              >
                <FaUserShield size={18} />
                Make Admin
              </button>
            )}
          </div>
        </th>
        <th>
          <button className="btn btn-ghost btn-xs">Other Action</button>
        </th>
      </tr>
    </>
  );
};

export default UserManagementTable;
