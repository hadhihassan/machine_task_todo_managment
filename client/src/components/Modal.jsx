
export default function Modal({ isOpen, children, onClose }) {

    if (!isOpen) return null

    return (
        <><div className="fixed z-10 overflow-y-auto top-0 w-full left-0 " id="modal">
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    {children}
                    <div className="bg-gray-100 px-4 py-3 text-right">
                        <button type="button" className="py-2 px-4 bg-black text-white rounded hover:bg-black mr-2" onClick={onClose}><i className="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </div>
        </div></>
    )
}