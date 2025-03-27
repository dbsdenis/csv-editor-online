import React, { Component } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { EditorMode } from "../App";
import FileUpload from "./FileUpload";

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
  renderLogo = () => {
    return (
      <div className="logo">
        CSV Editor
      </div>
    );
  }

  renderFileUploadOverlay = () => {
    return (
      <FileUpload onFileUploaded={this.props.onFileUpload} />
    );
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
          <Dropdown
            trigger={['click']}
            dropdownRender={() => (
              <div style={{ background: '#fff', padding: '8px', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                <FileUpload onFileUploaded={this.props.onFileUpload} />
              </div>
            )}
          >
            <span>
              <UploadOutlined /> Import
            </span>
          </Dropdown>
        )
      },
      {
        key: 'export',
        label: (
          <span onClick={this.props.onExportCSV}>
            <DownloadOutlined /> Export
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
      </Layout.Header>
    )
  }
}