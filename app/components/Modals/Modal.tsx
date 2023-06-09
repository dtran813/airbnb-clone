'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  body,
  footer,
  actionLabel,
  secondaryActionLabel,
  disabled,
  onClose,
  onSubmit,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => onClose(), 300); // for animation
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        handleClose();
      }
    }
    window.addEventListener('keydown', handleEscapeKey);

    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        onClick={handleClose} // Close when clicking on backdrop
      >
        <div
          className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5 h-full md:h-auto my-6 mx-auto"
          onClick={(event) => {
            event.stopPropagation(); // Prevent closing when clicking on the actual modal
          }}
        >
          {/* CONTENT */}
          <div
            className={`transform duration-300 h-full ${
              showModal
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
          >
            <div className="relative bg-white w-full h-full md:h-auto flex flex-col transform border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <button
                className="p-1 border-0 hover:opacity-70 transition absolute top-6 left-9 z-50"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                {/* HEADER */}
                <div className="relative flex justify-center items-center p-6 rounded-t border-b-[1px]">
                  <div className="text-lg font-semibold">{title}</div>
                </div>

                {/* BODY */}
                <div className="relative p-6 flex-auto">{body}</div>

                <div
                  className={`w-full flex items-center gap-4 px-6 ${
                    secondaryActionLabel ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                  {secondaryActionLabel && (
                    <Button
                      outline
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                    />
                  )}
                </div>
              </form>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
