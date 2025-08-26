"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('Form Data:', data);
        alert(`Form Data:\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`);
        setSubmitted(true);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            {submitted ? (
                <p className="text-green-600 font-bold text-center">
                    Thank you! Your message has been sent.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" name="message" rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}


