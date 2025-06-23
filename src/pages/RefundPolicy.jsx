import React from 'react';

function RefundPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Refund Policy</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return & Refund Policy</h2>
                        <p className="text-gray-600 mb-4">
                            At Vision Media, we strive to ensure complete customer satisfaction. Our return and refund policy is designed to make your shopping experience as smooth as possible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eligibility for Returns</h2>
                        <p className="text-gray-600 mb-4">
                            You may return items within 7 days of delivery if:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>The product is damaged or defective</li>
                            <li>The product received is different from what was ordered</li>
                            <li>The product is in its original condition with all tags and packaging intact</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return Process</h2>
                        <p className="text-gray-600 mb-4">
                            To initiate a return:
                        </p>
                        <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                            <li>Contact our customer service within 7 days of delivery</li>
                            <li>Provide your order number and reason for return</li>
                            <li>Pack the item securely with all original packaging and tags</li>
                            <li>Ship the item back to our warehouse</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Process</h2>
                        <p className="text-gray-600 mb-4">
                            Once we receive and inspect your return:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Refunds will be processed within 7-10 business days</li>
                            <li>The refund will be issued to your original payment method</li>
                            <li>Shipping charges are non-refundable unless the return is due to our error</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Non-Returnable Items</h2>
                        <p className="text-gray-600 mb-4">
                            The following items are not eligible for returns:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Customized or personalized products</li>
                            <li>Products that have been used or damaged after delivery</li>
                            <li>Products without original packaging or tags</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-600">
                            For any questions regarding returns or refunds, please contact us:
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

export default RefundPolicy; 