import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-violet-900">
      <h1 className="text-3xl text-center font-bold mb-6 text-violet-700">
        Privacy Policy
      </h1>

      <p className="mb-4">
        At Stock Pathshala, we respect your privacy and are committed to
        protecting the personal information you share with us. This Privacy
        Policy outlines how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">
        1. Information Collection
      </h2>
      <p className="mb-4">
        We collect your mobile number solely for login and verification
        purposes. No additional personal data is collected without your consent.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">2. Use of Information</h2>
      <p className="mb-4">
        Your data is used only to verify your identity and give you access to
        our platform. We do not sell or share your information with third
        parties.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">3. Data Security</h2>
      <p className="mb-4">
        We implement standard security measures to protect your data from
        unauthorized access or misuse.
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-6">4. Changes to Policy</h2>
      <p className="mb-4">
        We may update this policy occasionally. Continued use of our app after
        updates means you agree to the revised policy.
      </p>

      <a
        href="https://www.stockpathshala.com/"
        target="_blank"
        className="mt-10 text-sm text-violet-600 hover:text-violet-900 cursor-pointer flex justify-center"
      >
        If you have any questions regarding this policy, please contact our
        support team.
      </a>
    </div>
  );
};

export default Privacy;
