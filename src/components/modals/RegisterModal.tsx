import useRegisterModal from "@/hooks/useRegisterModal";
import ModalContainer from "./modal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();



  return (
    <ModalContainer
      title="Log in or sign up"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    />
  );
};

export default RegisterModal;
