import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateDefaultTemplate } from "@/utils/templateGenerator";

const TemplatePreview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Display the template HTML
    const templateHTML = generateDefaultTemplate();
    const container = document.getElementById("template-container");
    if (container) {
      container.innerHTML = templateHTML;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold mt-4 mb-2">Template Preview</h1>
        <p className="text-gray-600 mb-4">
          This is what the beautiful cover page template looks like. To use it
          in a real report, you need to delete all existing reports and create a
          completely fresh one.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div
          id="template-container"
          className="word-page-wrapper bg-white shadow-lg"
          style={{
            width: "8.5in",
            minHeight: "11in",
            padding: "0",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
};

export default TemplatePreview;
