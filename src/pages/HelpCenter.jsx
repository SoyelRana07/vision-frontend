import React from 'react';

function HelpCenter() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Help Center</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">How do I place an order?</h3>
                                <p className="text-gray-600">Browse our products, add items to your cart, and proceed to checkout. Follow the simple steps to complete your purchase.</p>
                            </div>

                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">What payment methods do you accept?</h3>
                                <p className="text-gray-600">We accept various payment methods including credit/debit cards, UPI, and net banking.</p>
                            </div>

                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">How can I track my order?</h3>
                                <p className="text-gray-600">Once your order is shipped, you'll receive a tracking number via email. You can also track your order status in your account dashboard.</p>
                            </div>

                            <div className="border-b pb-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">What is your return policy?</h3>
                                <p className="text-gray-600">We offer a 7-day return policy for most products. Please check our Return Policy page for detailed information.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">Need more help? Our support team is here for you:</p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="mr-2">📞</span>
                                    <a href="tel:+918100280400" className="text-blue-600 hover:text-blue-800">+91 8100280400</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📱</span>
                                    <a href="tel:+919831463859" className="text-blue-600 hover:text-blue-800">+91 9831463859</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">✉️</span>
                                    <a href="mailto:sales@visionmediaonline.in" className="text-blue-600 hover:text-blue-800">sales@visionmediaonline.in</a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default HelpCenter; 