import React from 'react';
import { Upload, Button, message } from 'antd';

interface FileUploadProps {
  onFileUploaded: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const beforeUpload = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        onFileUploaded(e.target.result as string);
        message.success(`${file.name} uploaded successfully`);
      }
    };
    
    reader.onerror = () => {
      message.error(`${file.name} file upload failed.`);
    };
    
    reader.readAsText(file);
    
    // Return false to prevent automatic upload
    return false;
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      showUploadList={false}
      accept=".csv,.txt"
    >
      <Button type="text" size="small">
        Select File
      </Button>
    </Upload>
  );
};

export default FileUpload;