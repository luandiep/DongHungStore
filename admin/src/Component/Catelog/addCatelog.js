import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ToggleButton from "@mui/material/ToggleButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addcatalog, listcatelog } from "../../action/catalogActions";
import { useDispatch } from "react-redux";
export default function Addcatelog() {
  const [open, setOpen] = React.useState(false);
  const [name, setname] = React.useState({});
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    dispatch(addcatalog(name));
    dispatch(listcatelog());
    handleClose();
  };

  return (
    <>
      <ToggleButton onClick={handleClickOpen} value="check" size="small">
        <AddIcon />
      </ToggleButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm danh mục sản phẩm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setname({ ...name, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSave}>lưu</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
