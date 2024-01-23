import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "../Style/style.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

function VendorList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageData, setPerPageData] = useState([]);
  console.log("perPageData", perPageData);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [userDetails, setUserDetails] = useState([]);
  // console.log("userDetails", userDetails);

  const getDetails = async () => {
    const fetchData = await fetch(
      "https://vendor-list-pqch.onrender.com/details"
    );
    let result = await fetchData.json();
    console.log("allData", result);
    setUserDetails(result.length > 0 ? result : "");
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    const limitedDataPerPage = userDetails?.slice(startIndex, endIndex);
    setPerPageData(limitedDataPerPage);
  }, [startIndex, endIndex, userDetails]);

  const handleDelete = async (id) => {
    let deleteData = await fetch(
      `https://vendor-list-pqch.onrender.com/delete/${id}`,
      {
        method: "Delete",
      }
    );

    deleteData = await deleteData.json();
    if (deleteData.acknowledged === true) {
      toast.success("record is deleted");
      getDetails();
    }
  };

  return (
    <>
      <div className="table-container">
        {perPageData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account No.</th>
                <th>Bank Name</th>
                <th>Address 1</th>
                <th>Address 2</th>
                <th>City</th>
                <th>Country</th>
                <th>Zip Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {perPageData.map((users, index) => (
                <tr key={index}>
                  <td>{users.name}</td>
                  <td>{users.accountNo}</td>
                  <td>{users.bankName}</td>
                  <td>{users.address1}</td>
                  <td>{users.address2}</td>
                  <td>{users.city}</td>
                  <td>{users.country}</td>
                  <td>{users.zipCode}</td>
                  <td style={{ display: "flex" }}>
                    <IconButton
                      variant="outlined"
                      onClick={() => handleDelete(users._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link to={"/update/" + users._id} className="edit-button">
                      <IconButton>
                        <EditNoteIcon />
                      </IconButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Record Found
          </h1>
        )}
      </div>
      {/* <Pagination allUsersDetails={userDetails} /> */}
      <div className="pagination-container">
        <Button
          variant="outlined"
          className="pagination-item"
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          <SkipPreviousIcon />
        </Button>
        <Button
          variant="outlined"
          className="pagination-item"
          style={{ cursor: "none", color: "#000" }}
        >
          {currentPage}
        </Button>
        <Button
          variant="outlined"
          className="pagination-item"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <SkipNextIcon />
        </Button>
      </div>
    </>
  );
}

export default VendorList;
