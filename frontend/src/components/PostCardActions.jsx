import * as React from "react";
import {Fragment} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ModalDispatchContext, useModalDispatch} from "../context/modal/modalContext";
import {Modals} from "./Modals";

export const PostCardActions = ({handleEdit, handleDelete}) => {
  const handleOpenModal = React.useContext(ModalDispatchContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const editHandler = (e) => {
    handleClose()
    handleEdit(e)
  }

  const deleteHandler = (e) => {
    handleClose()
    handleOpenModal({
      componentName: Modals.AlertDialog,
      staticProps: {
        message: "Are you sure you want to delete this post?",
        onAccept: () => {
          handleDelete(e)
        }
      }
    })
  }

  return (
    <Fragment>
      <IconButton
        aria-label="settings"
        aria-controls={open ? 'action-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={editHandler}>Edit</MenuItem>
        <MenuItem onClick={deleteHandler}>Delete</MenuItem>
      </Menu>
    </Fragment>
  )
}