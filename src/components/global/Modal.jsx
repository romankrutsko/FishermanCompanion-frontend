import React from 'react'

function Modal({ children, isOpen, onClose, title }) {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
            <div className="relative bg-white rounded-lg border border-gray-300 shadow-lg px-4 py-6 sm:p-8 w-full sm:max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal