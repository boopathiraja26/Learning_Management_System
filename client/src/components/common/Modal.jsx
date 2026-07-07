const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-600"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;