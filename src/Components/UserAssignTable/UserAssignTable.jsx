import React from "react";

const UserAssignTable = ({
  parcel,
  index,
  assignRiderModalRef,
  setSelectedParcel,
}) => {
  const { parcelName, cost, createdAt, senderDistrict } = parcel || {};

  const handleShowModal = (parcel) => {
    assignRiderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{parcelName}</td>
        <td>{cost}</td>
        <td>{createdAt}</td>
        <td>{senderDistrict}</td>
        <td>
          <button
            onClick={() => handleShowModal(parcel)}
            className="btn btn-primary text-black"
          >
            Find Riders
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserAssignTable;
