import { useState } from "react";

interface DisputeForm {
  orderId: string;
  description: string;
  evidence: File | null;
}

const FileDispute = () => {
  const [formData, setFormData] = useState<DisputeForm>({
    orderId: "",
    description: "",
    evidence: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setFormData((prev) => ({ ...prev, evidence: files[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
<div className="min-h-screen flex w-full items-center justify-center p-4 relative">
      <div
        className="max-w-4xl w-full bg-white shadow-lg rounded-lg px-8 py-10
        animate-fadeInUp transition-all duration-700 fixed top-52 -z-10 md:top-40"
      >
        <h2 className="text-3xl font-Montserrat font-bold mb-8 text-center text-gray-800">
          File a Dispute Report
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 font-OpenSans">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Order ID
            </label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Order ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Issue Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={5}
              placeholder="Describe the issue clearly"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Upload Evidence (optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue hover:bg-gray-300 transition-colors duration-300 text-white hover:text-blue text-lg font-bold py-3 rounded-md"
          >
            Submit Dispute
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileDispute;
