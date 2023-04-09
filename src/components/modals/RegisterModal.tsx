import useRegisterModal from "@/hooks/useRegisterModal";
import ModalContainer from "./modal";
import { useState } from "react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  return (
    <ModalContainer
      title="Register"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    />
  );
};

export default RegisterModal;
