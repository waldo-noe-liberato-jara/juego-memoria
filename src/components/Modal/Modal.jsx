import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import Portal from "../Portal";
import "./Modal.css";

const Modal = ({ show = false, onClose, children, duration = 300 }) => {
  const [mountPortal, setMountPortal] = useState(show);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (show) {
      setMountPortal(true);
    }
  }, [show]);

  const handleExited = () => {
    if (!show) {
      setMountPortal(false);
    }
  };

  if (!mountPortal) {
    return null;
  }

  return (
    <Portal id="modal-root">
      <CSSTransition
        in={show}
        timeout={duration}
        classNames="modal"
        unmountOnExit
        nodeRef={nodeRef}
        onExited={handleExited}
        appear={true}
      >
        <div
          ref={nodeRef}
          style={{ transitionDuration: `${duration}ms` }}
          className="fixed inset-0 flex items-center justify-center bg-black z-50 w-full min-h-screen"
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative modal-content"
            style={{ transitionDuration: `${duration}ms` }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;