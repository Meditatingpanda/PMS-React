import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Container, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./SalesExecutives.module.css";
import { RiCloseLine } from "react-icons/ri";
import moment from "moment";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: `5px solid ${red[50]}`,
  boxShadow: 24,
  p: 4,
};

function createData(name, Manufacturer, price, stocks, discount) {
  return { name, Manufacturer, price, stocks, discount };
}

function SalesExecutives() {
  const addLocalStorage = (data) => {
    localStorage.salesManData = JSON.stringify(data);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateData, SetUpdateData] = useState({});

  const [rows, setRows] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newId, setNewId] = useState(null);
  let arr = [];
  let tempArr = [];
  let newRows = [5];
  const keys = ["name", "Manufacturer", "price", "stocks", "discount"];
  useEffect(() => {
    if (rows.length !== 0) {
      addLocalStorage(rows);
    }
  }, [rows]);
  useEffect(() => {
    let valueData = JSON.parse(localStorage.getItem("salesManData") || "[]");
    setRows(valueData);
  }, []);
  const handleDelete = (id) => {
    setRows(rows.filter((key, keyId) => keyId !== id));
    addLocalStorage(rows.filter((key, keyId) => keyId !== id));
  };
  const handleAddToInventory = () => {
    arr[2] = moment(arr[2], "YYYY-MM-DD").format("DD-MM-YYYY");
    setRows([...rows, createData(...arr)]);
    // setOpen(false);
    setIsOpen(false);
  };
  const handleUpdate = (id) => {
    SetUpdateData({ ...rows[id] });
    setNewId(id);
  };
  const handleUpdateDetails = () => {
    for (let i = 0; i < 5; i++) {
      if (!tempArr[i]) {
        tempArr[i] = updateData[`${keys[i]}`];
      }
    }
    tempArr[2] = moment(tempArr[2], "YYYY-MM-DD").format("DD-MM-YYYY");
    newRows = [...rows];
    newRows[newId] = createData(...tempArr);

    setRows([...newRows]);
    setIsOpen1(false);
    //setUpdate(false);
  };
  return (
    <div className={styles.container}>
      <Container>
        <Typography variant="h3" className="text-red-500 text-center">
          Sales Executives
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 5 }}
          onClick={() => setIsOpen(true)}
        >
          + ADD NEW SALES EXECUTIEVE
        </Button>

        <TableContainer component={Paper} sx={{ minWidth: 400 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">DOB</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Experience(in Years)</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.Manufacturer}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stocks}</TableCell>
                  <TableCell align="right">{row.discount}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        handleUpdate(id);
                        // setUpdate(true);
                        setIsOpen1(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleDelete(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* THis is for modal Section */}

      {isOpen ? (
        <>
          <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={styles.centered}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Add Executive Details</h5>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                <RiCloseLine style={{ marginBottom: "-3px" }} />
              </button>
              <div className={styles.modalContent}>
                <div className={styles.inputNames}>
                  <span className={styles.inputsContainer}>
                    <label className={styles.inputLabel} htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className={styles.input}
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      onChange={(e) => (arr[0] = e.target.value)}
                    />
                  </span>
                  <span className={styles.inputsContainer}>
                    <label className={styles.inputLabel} htmlFor="firstName">
                      Last Name
                    </label>
                    <input
                      className={styles.input}
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                      onChange={(e) => (arr[1] = e.target.value)}
                    />
                  </span>
                </div>
                <span className={styles.inputsContainer}>
                  <label className={styles.inputLabel} htmlFor="Dob">
                    DOB
                  </label>
                  <input
                    className={styles.input}
                    id="Dob"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={arr[2]}
                    required
                    onChange={(e) => (arr[2] = e.target.value)}
                  />
                </span>
                <span className={styles.inputsContainer}>
                  <label className={styles.inputLabel} htmlFor="Gender">
                    Gender(M/F/O)
                  </label>
                  <input
                    className={styles.input}
                    id="Gender"
                    type="text"
                    placeholder="Gender"
                    required
                    onChange={(e) => (arr[3] = e.target.value)}
                  />
                </span>
                <span className={styles.inputsContainer}>
                  <label className={styles.inputLabel} htmlFor="exp">
                    Experience
                  </label>
                  <input
                    className={styles.input}
                    id="exp"
                    type="number"
                    placeholder={0}
                    required
                    onChange={(e) => (arr[4] = e.target.value)}
                  />
                </span>
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleAddToInventory}
                  >
                    Add To The Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            sx={{ position: "absolute", right: 15 }}
            className="text-red-500 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 5 }}
            className="text-red-500"
          >
            Add Executive Details
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              variant="outlined"
              label="First Name"
              onChange={(e) => (arr[0] = e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Last Name"
              onChange={(e) => (arr[1] = e.target.value)}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mt: 5,
              mb: 5,
            }}
          >
            <div className="flex flex-col text-gray-600">
              <label for="dob">DOB</label>
              <input
                type="date"
                id="dob"
                onChange={(e) => (arr[2] = e.target.value)}
                className="border-2 rounded pl-2"
              />
            </div>

            <TextField
              variant="outlined"
              label="Gender(M/F/O)"
              sx={{ width: "25%" }}
              onChange={(e) => (arr[3] = e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Experience"
              sx={{ width: "25%" }}
              type="number"
              defaultValue={0}
              onChange={(e) => (arr[4] = e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleAddToInventory}
              color="error"
            >
              ADD TO TEAM
            </Button>
          </Box>
        </Box>
      </Modal> */}

      {/* Modal for product update */}
      {isOpen1 ? (
        <>
          <div className={styles.darkBG} onClick={() => setIsOpen1(false)} />
          <div className={styles.centered}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Add Executive Details</h5>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen1(false)}
              >
                <RiCloseLine style={{ marginBottom: "-3px" }} />
              </button>
              <div className={styles.modalContent}>
                <div className={styles.inputNames}>
                  <span className={styles.inputsContainer}>
                    <label className={styles.inputLabel} htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className={styles.input}
                      id="firstName"
                      type="text"
                      required
                      placeholder={updateData.name}
                      onChange={(e) => (tempArr[0] = e.target.value)}
                    />
                  </span>
                  <span className={styles.inputsContainer}>
                    <label className={styles.inputLabel} htmlFor="firstName">
                      Last Name
                    </label>
                    <input
                      className={styles.input}
                      id="lastName"
                      type="text"
                      required
                      placeholder={updateData.Manufacturer}
                      onChange={(e) => (tempArr[1] = e.target.value)}
                    />
                  </span>
                </div>
                <span className={styles.inputsContainer}>
                  <label className={styles.inputLabel} htmlFor="Dob">
                    DOB
                  </label>
                  <input
                    className={styles.input}
                    id="Dob"
                    type="date"
                    required
                    placeholder={updateData.price}
                    onChange={(e) => (tempArr[2] = e.target.value)}
                  />
                </span>
                <span className={styles.inputsContainer}>
                  <label className={styles.inputLabel} htmlFor="Gender">
                    Gender(M/F/O)
                  </label>
                  <input
                    className={styles.input}
                    id="Gender"
                    type="text"
                    required
                    placeholder={updateData.stocks}
                    onChange={(e) => (tempArr[3] = e.target.value)}
                  />
                </span>
                <span className={styles.inputsContainer}>
                  <label className={styles.inputLabel} htmlFor="exp">
                    Experience
                  </label>
                  <input
                    className={styles.input}
                    id="exp"
                    type="number"
                    placeholder={0}
                    required
                    placeholder={updateData.discount}
                    onChange={(e) => (tempArr[4] = e.target.value)}
                  />
                </span>
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleUpdateDetails}
                  >
                    Update Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Modal
        open={update}
        onClose={() => setUpdate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            sx={{ position: "absolute", right: 15 }}
            className="text-red-500 cursor-pointer"
            onClick={() => setUpdate(false)}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 5 }}
            className="text-red-500"
          >
            Add Executive Details
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              variant="outlined"
              label="First Name"
              defaultValue={updateData.name}
              onChange={(e) => (tempArr[0] = e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Last Name"
              defaultValue={updateData.Manufacturer}
              onChange={(e) => (tempArr[1] = e.target.value)}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mt: 5,
              mb: 5,
            }}
          >
            <div className="flex flex-col text-gray-600">
              <label for="dob">DOB</label>
              <input
                type="date"
                id="dob"
                //value={updateData.price}
                onChange={(e) => (tempArr[2] = e.target.value)}
                className="border-2 rounded pl-2"
              />
            </div>
            {/* <TextField
              variant="outlined"
              label="DOB"
              sx={{ width: "25%" }}
              type="number"
              defaultValue={updateData.price}
              onChange={(e) => (tempArr[2] = e.target.value)}
            /> */}
            <TextField
              variant="outlined"
              label="Gender(M/F/O)"
              sx={{ width: "25%" }}
              defaultValue={updateData.stocks}
              onChange={(e) => (tempArr[3] = e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Experience(in Years)	"
              sx={{ width: "25%" }}
              type="number"
              defaultValue={updateData.discount}
              onChange={(e) => (tempArr[4] = e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleUpdateDetails}
              color="error"
            >
              Update Details
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SalesExecutives;
