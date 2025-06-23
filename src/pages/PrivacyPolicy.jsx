import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Privacy Policy</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                        <p className="text-gray-600 mb-4">
                            We collect information that you provide directly to us, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Name and contact information</li>
                            <li>Billing and shipping address</li>
                            <li>Payment information</li>
                            <li>Order history</li>
                            <li>Account credentials</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-600 mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Process and fulfill your orders</li>
                            <li>Communicate with you about your orders</li>
                            <li>Send you marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Prevent fraud and enhance security</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
                        <p className="text-gray-600">
                            We do not sell or rent your personal information to third parties. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                            <li>Service providers who assist in our operations</li>
                            <li>Payment processors for secure transactions</li>
                            <li>Shipping partners to deliver your orders</li>
                            <li>Law enforcement when required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                        <p className="text-gray-600 mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Lodge a complaint with supervisory authorities</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-600">
                            If you have any questions about our Privacy Policy, please contact us at:
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

export default PrivacyPolicy; 