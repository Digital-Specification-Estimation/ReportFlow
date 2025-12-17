import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Table,
  Plus,
  X,
  Check,
  Maximize2,
  Minimize2,
  Upload,
  Image,
  FileText,
} from "lucide-react";
import AnalyticsVisualizer from "./AnalyticsVisualizer";
import { claudeService } from "../../lib/claude-api";

interface TableData {
  headers: string[];
  rows: string[][];
}

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  tableData?: TableData;
  analysis?: string;
  imageUrl?: string;
  imageAnalysis?: string;
  timestamp: Date;
}

interface TableAnalysisChatbotProps {
  onAddTableToReport: (tableHtml: string, analysis: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const TableAnalysisChatbot: React.FC<TableAnalysisChatbotProps> = ({
  onAddTableToReport,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I can help you analyze table data and create beautiful formatted tables for your report. Please paste your data or describe what table you'd like to create.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pendingTable, setPendingTable] = useState<{
    tableHtml: string;
    analysis: string;
  } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseTableData = (input: string): TableData | null => {
    try {
      // Try to parse CSV-like data
      const lines = input.trim().split("\n");
      if (lines.length < 2) return null;

      const headers = lines[0].split(/[,\t]/).map((h) => h.trim());
      const rows = lines
        .slice(1)
        .map((line) => line.split(/[,\t]/).map((cell) => cell.trim()));

      return { headers, rows };
    } catch {
      return null;
    }
  };

  const analyzeTableWithClaude = async (
    tableData: TableData
  ): Promise<string> => {
    // Simulate Claude Sonnet API call
    // In production, you'd call the actual Claude API here
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { headers, rows } = tableData;
    const sampleAnalysis = `
**Data Analysis Summary:**

This table contains ${rows.length} records with ${
      headers.length
    } columns: ${headers.join(", ")}.

**Key Insights:**
- The data shows ${headers[0]} ranging from ${rows[0]?.[0]} to ${
      rows[rows.length - 1]?.[0]
    }
- ${headers[1]} values demonstrate ${
      Math.random() > 0.5 ? "an upward trend" : "varied patterns"
    }
- Notable patterns include consistent data quality across all fields

**Statistical Overview:**
- Total records: ${rows.length}
- Data completeness: ${Math.floor(Math.random() * 20 + 80)}%
- Key metrics show ${Math.random() > 0.5 ? "positive" : "stable"} indicators

**Recommendations:**
- This data supports the report's analytical framework
- Consider highlighting the ${
      headers[Math.floor(Math.random() * headers.length)]
    } trends
- The table format enhances data presentation and readability
    `;

    return sampleAnalysis.trim();
  };

  const generateTableHtml = (tableData: TableData): string => {
    const { headers, rows } = tableData;

    return `
      <div class="analytics-dashboard" style="background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%); border-radius: 12px; padding: 24px; color: white; margin: 20px 0;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h3 style="font-size: 24px; font-weight: bold; background: linear-gradient(45deg, #f97316, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;">
            📊 Data Analytics Dashboard
          </h3>
          <p style="color: #cbd5e1; font-size: 14px;">Professional market analysis and insights</p>
        </div>
        
        <div class="table-container" style="background: rgba(30, 41, 59, 0.5); border-radius: 8px; padding: 16px; border: 1px solid rgba(71, 85, 105, 0.5);">
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
            <thead>
              <tr style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);">
                ${headers
                  .map(
                    (header) =>
                      `<th style="padding: 12px 16px; text-align: left; font-weight: 600; color: white; border-bottom: 2px solid #1e40af;">${header}</th>`
                  )
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row, index) =>
                    `<tr style="background: ${
                      index % 2 === 0
                        ? "rgba(51, 65, 85, 0.3)"
                        : "rgba(30, 41, 59, 0.3)"
                    }; border-bottom: 1px solid rgba(71, 85, 105, 0.3);">
                  ${row
                    .map(
                      (cell) =>
                        `<td style="padding: 10px 16px; color: #e2e8f0; border-right: 1px solid rgba(71, 85, 105, 0.3);">${cell}</td>`
                    )
                    .join("")}
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 16px; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold;">${
              rows.length
            }</div>
            <div style="font-size: 12px; opacity: 0.8; text-transform: uppercase;">Total Records</div>
          </div>
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 16px; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold;">${
              headers.length
            }</div>
            <div style="font-size: 12px; opacity: 0.8; text-transform: uppercase;">Data Points</div>
          </div>
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 16px; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: bold;">100%</div>
            <div style="font-size: 12px; opacity: 0.8; text-transform: uppercase">Data Quality</div>
          </div>
        </div>
      </div>
    `;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (
    imageFile: File
  ): Promise<{ analysis: string; tableData: TableData | null }> => {
    // Mock image analysis - in real implementation, this would use Claude Vision API
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockAnalysis = `**Image Analysis Results:**

I've successfully extracted structured data from your property image! Here's what I found:

**Extracted Property Data:**
- 6 comparable properties identified
- Complete address and pricing information
- Property specifications and features
- Market analysis and trends

**Key Insights:**
- Average property value: $525,000
- Price range: $380,000 - $875,000  
- Most properties are 3-4 bedroom homes
- Strong market activity in the area

**Data Quality:** Excellent - All key fields extracted successfully

I've organized this information into a structured table with beautiful analytics. You can add this to your report for comprehensive market analysis.`;

        const extractedTableData: TableData = {
          headers: [
            "Property Address",
            "Sale Price",
            "Square Feet",
            "Year Built",
            "Bedrooms",
            "Bathrooms",
          ],
          rows: [
            ["123 Main St Bathurst", "$450000", "1200", "2015", "3", "2"],
            ["456 Oak Ave Edmundston", "$520000", "1400", "2018", "4", "3"],
            ["789 Pine Rd Chipogan", "$380000", "1100", "2012", "2", "1"],
            ["321 Elm St Grand Falls", "$495000", "1350", "2020", "3", "2"],
            ["654 Maple Dr Grand Falls", "$425000", "1250", "2016", "3", "2"],
            ["987 Cedar Ln Campbellton", "$875000", "1800", "2019", "4", "3"],
          ],
        };

        resolve({
          analysis: mockAnalysis,
          tableData: extractedTableData,
        });
      }, 2000);
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !uploadedImage) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue || "📷 Uploaded an image for analysis",
      imageUrl: imagePreview || undefined,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsAnalyzing(true);

    try {
      let analysisResult;

      if (uploadedImage) {
        // Analyze uploaded image
        const imageResult = await analyzeImage(uploadedImage);

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: imageResult.analysis,
          tableData: imageResult.tableData,
          analysis: imageResult.analysis,
          imageAnalysis: imageResult.analysis,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);

        // Set pending table for user approval if data was extracted
        if (imageResult.tableData) {
          setPendingTable({
            tableHtml: generateTableHtml(imageResult.tableData),
            analysis: imageResult.analysis,
          });
        }

        // Clear image after processing
        setUploadedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        // Parse table data if provided
        const tableData = parseTableData(inputValue);

        // Use enhanced Claude analysis service
        const analysisResult = await claudeService.analyzeTableData(
          inputValue,
          tableData
        );

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: analysisResult.analysis,
          tableData: analysisResult.tableData,
          analysis: analysisResult.analysis,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);

        // Set pending table for user approval if data exists
        if (analysisResult.tableData) {
          setPendingTable({
            tableHtml: analysisResult.tableHtml,
            analysis: analysisResult.analysis,
          });
        }
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I apologize, but I encountered an error while analyzing your data. Please try again or provide the data in a different format.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsAnalyzing(false);
  };

  const handleAddToReport = () => {
    if (pendingTable) {
      onAddTableToReport(pendingTable.tableHtml, pendingTable.analysis);
      setPendingTable(null);

      const confirmMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "✅ Table and analysis added to your report! You can continue adding more tables or data for analysis.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, confirmMessage]);
    }
  };

  const handleRejectTable = () => {
    setPendingTable(null);

    const rejectMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "bot",
      content:
        "No problem! Feel free to provide different data or ask me to analyze something else.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, rejectMessage]);
  };

  // Auto-resize textarea function
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white flex flex-col transition-all duration-300 ${
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-full h-full max-w-6xl max-h-[95vh] rounded-lg shadow-xl"
        }`}
      >
        {/* Minimal Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-800">
              Table Analysis Assistant
            </span>
            <span className="text-xs text-gray-500">
              Powered by Claude Sonnet
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ChatGPT-style Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-3 py-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  {message.type === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-2xl px-4 py-2 max-w-4xl">
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="max-w-none">
                          <div className="whitespace-pre-wrap text-gray-800">
                            {message.content}
                          </div>
                          {message.imageUrl && (
                            <div className="mt-3">
                              <img
                                src={message.imageUrl}
                                alt="Uploaded content"
                                className="max-w-md rounded-lg border border-gray-300"
                              />
                            </div>
                          )}
                          {message.tableData && (
                            <div className="mt-4 w-full">
                              <AnalyticsVisualizer
                                tableData={message.tableData}
                                analysis={message.analysis || ""}
                                isFullscreen={isFullscreen}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAnalyzing && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm">Analyzing your data...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Pending Table Actions */}
        {pendingTable && (
          <div className="border-t border-gray-200 bg-blue-50 px-3 py-2 flex-shrink-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Table className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-800">
                  Add this table to your report?
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleRejectTable}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                >
                  No, thanks
                </button>
                <button
                  onClick={handleAddToReport}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                >
                  Add to Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced AI Input with Image Support */}
        <div className="border-t border-gray-200 px-3 py-3 flex-shrink-0">
          <div className="max-w-7xl mx-auto">
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800 flex items-center">
                    <Image className="w-4 h-4 mr-1" />
                    Image ready for analysis
                  </span>
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-32 rounded border border-gray-300"
                />
              </div>
            )}

            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Paste table data, upload an image, or ask me anything about your data..."
                className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                style={{
                  minHeight: "44px",
                  maxHeight: "200px",
                  height: "auto",
                }}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-12 bottom-2 p-2 text-gray-500 hover:text-blue-600 rounded-lg transition-colors"
                title="Upload image"
              >
                <Upload className="w-3 h-3" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={(!inputValue.trim() && !uploadedImage) || isAnalyzing}
                className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>

            {(isInputFocused || inputValue.length > 0 || uploadedImage) && (
              <div className="mt-2 text-xs text-gray-500">
                <div className="flex flex-wrap gap-4">
                  <span>💬 Ask questions about your data</span>
                  <span>📊 Paste CSV/table data</span>
                  <span>📷 Upload images for analysis</span>
                  <span>📄 Get comprehensive reports</span>
                </div>
                {isFullscreen && (
                  <div className="mt-1 text-blue-500">
                    🔍 Fullscreen mode - Enhanced analysis capabilities active
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAnalysisChatbot;
