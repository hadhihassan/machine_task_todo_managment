
export default function Modal({ isOpen, children, onClose }) {

    if (!isOpen) return null

    return (
        <div className="fixed z-10 inset-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <div className="inline-block  modal-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-3/4 sm:p-10">
                <button onClick={onClose} className="float-right mt-4 mr-4 text-sm text-black hover:text-gray-800">
                    close
                </button>
                {children}
            </div>
        </div>
    </div>
    )
}