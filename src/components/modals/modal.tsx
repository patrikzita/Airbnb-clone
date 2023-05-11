import React from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  IconButton,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 568,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
};

const ModalContainer = ({ isOpen, onClose, title, body }: ModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      disableEnforceFocus
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#f4f4f4",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingInline: 1,
              paddingY: 2,
            }}
          >
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              fontWeight={700}
              fontSize={16}
            >
              {title}
            </Typography>
            <div></div>
          </Box>
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {body}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalContainer;
