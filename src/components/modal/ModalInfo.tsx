import React, { FC } from 'react';

interface ModalProps {
  onClose: () => void;
  title?: string;
  message?: string | string[];
}

export const ModalInfo: FC<ModalProps> = ({ onClose, title, message }) => {
  let messagesToRender;

  if (message) {
    if (Array.isArray(message)) {
      messagesToRender = message.map((msg, index) => (
        <p key={index} className="font-semibold sm:text-sm">
          {msg}
        </p>
      ));
    } else {
      messagesToRender = <p className="font-semibold sm:text-sm">{message}</p>;
    }
  }

  return (
    <div className="modal bg-dark-300 max-w-[600px] mx-auto border-2 border-red-500 rounded-lg">
      <div className=" flex gap-3 flex-col items-center justify-center text-justify mr-4 ml-4 mb-4 mt-2">
        <span
          className="close cursor-pointer text-3xl font-semibold sm:text-xl self-end"
          onClick={onClose}
        >
          &times;
        </span>

        <div>
          <span className="text-3xl font-semibold sm:text-xl text-center block">
            {title}
          </span>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        {messagesToRender}
      </div>
    </div>
  );
};
