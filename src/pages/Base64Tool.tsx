import { useState } from "react";
import { Copy, Download, Trash2 } from "lucide-react";
import { encodeBase64, decodeBase64 } from "../utils/base64Utils";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const result = encodeBase64(input);
      setOutput(result);
      setError(null);
    } catch {
      setError("Encoding failed.");
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeBase64(input);
      setOutput(result);
      setError(null);
    } catch {
      setError("Invalid Base64 string.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "base64-output.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
      
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>
          Base64 Encoder / Decoder
        </h2>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          Encode text to Base64 or decode Base64 strings directly in your browser.
        </p>
      </div>

      {/* Editor Layout */}
      <div className="tool-layout">

        {/* Input Panel */}
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Input</span>
            <div style={{ flex: 1 }} />
            <button className="btn btn-ghost" onClick={handleClear}>
              <Trash2 size={12}/> Clear
            </button>
          </div>

          <div className="tool-panel-body">
            <textarea
              className="code-editor"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or Base64..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Output</span>

            {error && (
              <span className="status-pill status-error">
                {error}
              </span>
            )}

            <div style={{ flex: 1 }} />

            <button
              className="btn btn-ghost"
              onClick={handleCopy}
              disabled={!output}
            >
              <Copy size={12}/> {copied ? "Copied!" : "Copy"}
            </button>

            <button
              className="btn btn-ghost"
              onClick={handleDownload}
              disabled={!output}
            >
              <Download size={12}/> Download
            </button>
          </div>

          <div className="tool-panel-body">
            <textarea
              className="code-editor"
              value={output}
              readOnly
              placeholder="Result will appear here..."
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn btn-primary" onClick={handleEncode}>
          Encode
        </button>

        <button className="btn btn-secondary" onClick={handleDecode}>
          Decode
        </button>
      </div>
    </div>
  );
}