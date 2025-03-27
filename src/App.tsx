import React, { Component } from "react";
// @ts-ignore
import * as csvString from "csv-string";

import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

import { SourceItems } from "./editors/types";
import { CSVEditor } from "./editors/CSVEditor";
import { JSONEditor } from "./editors/JSONEditor";
import { DataGridEditor } from "./editors/DataGridEditor";

import "./App.css";

export enum EditorMode {
  CSV = "CSV",
  GRID = "GRID",
  JSON = "JSON"
}

interface AppProps { }

interface AppState {
  mode: EditorMode;
  source: SourceItems;
}

const modeToComponentMap = Object.freeze({
  [EditorMode.CSV]: CSVEditor,
  [EditorMode.JSON]: JSONEditor,
  [EditorMode.GRID]: DataGridEditor,
})

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      mode: EditorMode.CSV,
      source: []
    }
  }

  handleModeChange = (mode: EditorMode) => this.setState({ mode })

  handleSourceChange = (source: SourceItems) => this.setState({ source })

  handleFileUpload = (content: string) => {
    // Determine the current delimiter (from local storage or default)
    const delimiter = localStorage.getItem('delimiter') || ';';
    
    // Parse the CSV content
    const sourceItems = csvString.parse(content, delimiter);
    
    // Update the state
    this.setState({ source: sourceItems });
  }

  handleExportCSV = () => {
    // Determine the current delimiter (from local storage or default)
    const delimiter = localStorage.getItem('delimiter') || ';';
    
    // Convert data to CSV string
    const csvContent = csvString.stringify(this.state.source, delimiter);
    
    // Create a blob from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'exported_data.csv');
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  render() {
    const EditorComponent = modeToComponentMap[this.state.mode] || <div>Error</div>;

    return (
      <div>
        <Navigation
          mode={this.state.mode}
          onModeChange={this.handleModeChange}
          onFileUpload={this.handleFileUpload}
          onExportCSV={this.handleExportCSV}
        />
        <main className="Editor" >
          <EditorComponent
            onSourceChange={this.handleSourceChange}
            source={this.state.source}
          />
        </main>
        <Footer />
      </div>
    )
  }
}