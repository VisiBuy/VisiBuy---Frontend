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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return; // Ensure files exist
    setFormData((prev) => ({ ...prev, evidence: files[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dispute Submitted:", formData);
  };

  return (
    <div className="max-w-4xl w-full pt-4 mx-auto bg-white shadow-md rounded-md px-6 py-6 lg:px-12 lg:py-12">
      <h2 className="text-2xl font-Montserrat font-bold mb-4">File a Dispute</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="font-OpenSans">
          <label className="block text-sm font-medium">Order ID</label>
          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        
        <div className="font-OpenSans">
          <label className="block text-sm font-medium">Issue Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="font-OpenSans">
          <label className="block text-sm font-medium">
            Upload Evidence (optional)
          </label>
          <input type="file" onChange={handleFileChange} className="w-full" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue font-Montserrat font-semibold text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit Dispute
        </button>
      </form>
    </div>
  );
};

export default FileDispute;
