import { useState } from "react";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";

import NavbarIcon from "../Navbar/NavbarIcon";
import SellForm from "./SellForm";
import { styles } from "../../helpers/styles";

Modal.setAppElement("#root");

const ModalElement = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const saveDataHandler = inputedData => {
    const data = {
      ...inputedData,
    };
    console.log(data);
  };

  return (
    <>
      <button onClick={toggleModal} className="border-none">
        <NavbarIcon icon={<BiMoneyWithdraw size={27} />} info="Sell 💵" />
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        closeTimeoutMS={300}
        className={styles.MODAL_STYLE}
        overlayClassName={styles.OVERLAY_MODAL_STYLE}>
        <SellForm onSaveData={saveDataHandler} />
        <IoCloseOutline
          onClick={toggleModal}
          size={30}
          className="cursor-pointer absolute right-2 top-2"
        />
      </Modal>
    </>
  );
};

export default ModalElement;
