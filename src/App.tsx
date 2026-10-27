import { type FormEvent, useState } from 'react'
import { Loader, Placeholder } from "@aws-amplify/ui-react"
import "./App.css";
import { Amplify } from 'aws-amplify';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';
import outputs from "../amplify_outputs.json";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";


import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

export default function App() {

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const { data, errors } = await amplifyClient.queries.askTrip({
        // interests: [formData.get("interests")?.toString() || "" ],
        interests: (formData.get("interests")?.toString() ?? "").split(",").map((s) => s.trim()).filter(Boolean),

      });
      if (!errors){
        setResult(data?.body || data?.error || "No response from Bedrock.");


      } else {
        console.error("Error from Bedrock:", errors); 
        setResult(errors.map((e) => e.message).join("\n"));
      }

    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">Travel Planner
          <span className="header-subtitle">Powered by AWS Bedrock</span>
        </h1>
        <p className="description">Plan your perfect trip with the help of AI-powered travel recommendations.</p>
        <p className="instructions">Enter your travel preferences below as Interest1, Interest2, Interest3 to get started.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter your travel interests (e.g., beaches, hiking, museums)"
            className="wide-input"
            id="interests"
            name="interests"
          />
          <button type="submit" className="Search-button">Plan My Trip</button>
        </div>

      </form>

      <div className="result-container">
        {loading ? (
          <div>
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          <div className="result">
            {result && <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
}
          </div>
        )}
      </div>
    </div>
  )
}
