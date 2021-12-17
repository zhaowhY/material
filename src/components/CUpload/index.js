// 上传组件
import React, { Component } from 'react';
import { Upload, message } from '@jd/find-react';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { Dragger } = Upload;
class CustomUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  handleChange = info => {
    const { onChange, onBlur } = this.props;
    const { status } = info.file;
    let fileList = [...info.fileList];

    if (status === 'error') {
      message.error('文件上传失败');
    }
    // if (status === 'uploading') {
    // }

    if (status !== 'uploading') {
      const successData = [];
      fileList = fileList.filter(file => file.status === 'done').map(file => {
        if (file.response) {
          const { data: { attachmentName, attachmentPath, attachmentId } } = file.response;
          // eslint-disable-next-line no-param-reassign
          file.url = `${window.GLOBAL_CONFIG.fileBaseUrl}${attachmentId}`;
          // eslint-disable-next-line no-param-reassign
          file.name = attachmentName;
          const idx = attachmentPath.lastIndexOf('.') || 0;
          successData.push({ fileUrl: attachmentPath, fileName: attachmentName, fileType: attachmentPath.slice(idx) });
        }
        return file;
      });
      onChange && onChange(successData);
    }
    this.setState({ fileList });
    if (onBlur) onBlur(); // form表单校验函数同步
  };

  beforeUpload = (file) => {
    const { fileList } = this.state;
    // 1KB = 1024 size = 1024
    if (fileList.length >= 3) {
      message.error('最多上传三个附件');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      message.error('文件大小不能超过5M');
      return false;
    }
  }

  render() {
    this.uploadProps = {
      name: 'file',
      accept: '.rar, .zip, .doc, .docx, .pdf, .jpg, .png, .xls, .xlsx',
      multiple: false,
      action: 'http:// test.com',
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload
    };
    const { value } = this.props;
    const { fileList } = this.state;
    return (
      <div className={styles['comp-upload']}>
        <Dragger
          {...this.uploadProps}
          fileList={fileList}
          value={value}
        >
          <p>
            <PlusOutlined className="ant-upload-drag-icon" />
          </p>
          <p style={{ color: 'rgba(153,153,153,1)' }}>上传</p>
        </Dragger>
        <p className={styles.tips}>
          格式：.rar, .zip, .doc, .docx, .pdf, .jpg, .png, .xls, .xlsx, 文件小于5MB。
        </p>
      </div>
    );
  }
}

export default CustomUpload;
