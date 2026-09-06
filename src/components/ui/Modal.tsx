'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 m-4 z-50"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;