import React, { Component } from "react";
import { Row, Col } from "antd";
import { GithubOutlined } from '@ant-design/icons';

interface Props { }
interface State { }

export const FOOTER_HEIGHT = 30;

export class Footer extends Component<Props, State> {
  renderGithubLink = () => {
    return (
      <a
        href="https://github.com/dbsdenis/csv-editor-online"
        target="_blank"
        rel="noopener noreferrer"
        className="GitHubIcon"
        title="Go to CSV Editor Online page on GitHub"
      >
        <GithubOutlined />
      </a>
    );
  }

  renderLemonUnitLink = () => {
    return (
      <a
        href="https://github.com/dbsdenis"
        target="_blank"
        rel="noopener noreferrer"
        className="LemonUnitIcon"
        title="See my profile"
      >
        <img src="https://avatars.githubusercontent.com/u/2111170?v=4" alt="Denilson Silva" />
      </a>
    );
  }

  render() {
    return (
      <footer className="Footer">
        <Row>
          <Col span={12}>
            {this.renderLemonUnitLink()}
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            {this.renderGithubLink()}
          </Col>
        </Row>
      </footer>
    )
  }
}