import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, showModal, content }) =>
  isShowing
    ? ReactDOM.createPortal(
      <React.Fragment>
        <div
          aria-hidden="true"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Session expiration</h5>
              </div>
              <div className="modal-body">
                {content}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => showModal(false, null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
    : null;

export default Modal;
