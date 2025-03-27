import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { EditorMode } from "../App";

interface Props {
  onModeChange: (mode: EditorMode) => void;
  onFileUpload: (content: string) => void;
  onExportCSV: () => void;
  mode: EditorMode;
}

interface State { }

export const NAVIGATION_HEIGHT = 64;
export const CONFIG_BAR_HEIGHT = 40;

export class Navigation extends Component<Props, State> {
  // Referência para o input de arquivo oculto
  fileInputRef = React.createRef<HTMLInputElement>();

  renderLogo = () => {
    return (
      <div className="logo">
        CSV Editor
      </div>
    );
  }

  // Função para acionar o clique no input de arquivo oculto
  handleImportClick = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  // Função para processar o arquivo selecionado
  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          this.props.onFileUpload(event.target.result as string);
        }
      };
      
      reader.readAsText(file);
      
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      e.target.value = '';
    }
  }

  render() {
    const menuItems: MenuProps['items'] = [
      {
        key: EditorMode.CSV,
        label: EditorMode.CSV,
        onClick: () => this.props.onModeChange(EditorMode.CSV)
      },
      {
        key: EditorMode.GRID,
        label: EditorMode.GRID,
        onClick: () => this.props.onModeChange(EditorMode.GRID)
      },
      {
        key: EditorMode.JSON,
        label: EditorMode.JSON,
        onClick: () => this.props.onModeChange(EditorMode.JSON)
      },
      {
        key: 'divider',
        type: 'divider'
      },
      {
        key: 'import',
        label: (
          <span onClick={this.handleImportClick}>
            <UploadOutlined /> Importar
          </span>
        )
      },
      {
        key: 'export',
        label: (
          <span onClick={this.props.onExportCSV}>
            <DownloadOutlined /> Exportar
          </span>
        )
      }
    ];

    return (
      <Layout.Header>
        {this.renderLogo()}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.props.mode]}
          style={{ lineHeight: `${NAVIGATION_HEIGHT}px` }}
          items={menuItems}
        />
        {/* Input de arquivo oculto */}
        <input 
          type="file"
          ref={this.fileInputRef}
          style={{ display: 'none' }}
          onChange={this.handleFileChange}
          accept=".csv,.txt"
        />
      </Layout.Header>
    )
  }
}