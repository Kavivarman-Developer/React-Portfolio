import React, { useState } from "react";

const ContactForm = () => {

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false)
        // navigate to content section on home after short delay

    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={handleClose}
                    />

                    <div className="relative z-10 w-full max-w-md">
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-md bg-gradient-to-r from-indigo-600 to-teal-400 flex items-center justify-center text-white font-bold">CV</div>
                                    <h3 className="text-lg font-semibold text-slate-900">Contact</h3>
                                </div>
                                <button
                                    aria-label="Close"
                                    onClick={handleClose}
                                    className="text-slate-500 hover:text-slate-700 rounded-md p-1"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="px-6 py-6">
                                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Email</label>
                                        <input type="email" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="name@company.com" />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Subject</label>
                                        <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="How can we help?" />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Message</label>
                                        <textarea rows={4} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Your message..." />
                                    </div>

                                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium">Send message</button>
                                </form>
                                <div className="mt-4 text-center text-sm text-slate-500">
                                    <a href="mailto:info@company.com" className="underline">info@company.com</a> • <a href="tel:2124567890" className="underline">212-456-7890</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default ContactForm
