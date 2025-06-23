import React from 'react';

function TermsConditions() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Terms & Conditions</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600">
                            By accessing and using Vision Media's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Website</h2>
                        <p className="text-gray-600 mb-4">
                            You agree to use our website for lawful purposes only and in a way that does not:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Infringe upon the rights of others</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Interfere with the proper functioning of the website</li>
                            <li>Attempt to gain unauthorized access to any part of the website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Product Information</h2>
                        <p className="text-gray-600 mb-4">
                            While we strive to provide accurate product information:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Product images are for illustrative purposes only</li>
                            <li>Actual colors may vary slightly from what is shown on screen</li>
                            <li>Product specifications are subject to change without notice</li>
                            <li>Prices are subject to change without prior notice</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Orders and Payment</h2>
                        <p className="text-gray-600 mb-4">
                            By placing an order, you:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Confirm that all information provided is accurate and complete</li>
                            <li>Agree to pay the full amount specified for the order</li>
                            <li>Authorize us to process your payment</li>
                            <li>Understand that all orders are subject to acceptance and availability</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                        <p className="text-gray-600">
                            All content on this website, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                            <li>Text, graphics, logos, images</li>
                            <li>Software, design, and layout</li>
                            <li>Trademarks and service marks</li>
                            <li>Are the property of Vision Media and are protected by intellectual property laws</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-600">
                            Vision Media shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                            <li>Use or inability to use our services</li>
                            <li>Unauthorized access to or alteration of your data</li>
                            <li>Any other matter relating to our services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
                        <p className="text-gray-600">
                            For any questions regarding these Terms & Conditions, please contact us:
                        </p>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-600">Email: <a href="mailto:sales@visionmediaonline.in" className="text-blue-600 hover:text-blue-800">sales@visionmediaonline.in</a></p>
                            <p className="text-gray-600">Phone: <a href="tel:+918100280400" className="text-blue-600 hover:text-blue-800">+91 8100280400</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TermsConditions; 