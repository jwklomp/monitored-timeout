import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, showModal, content }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => showModal(false, null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {content}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
