import axios from 'axios';

/**
 * 文件下载工具函数
 * @param {string} fileUrl 文件链接
 * @param {string} name 文件名称
 *
 * URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
 * blob:http://localhost:3000/f76cc4c9-a2ac-4ac1-9e85-b9760be05206
 */
export const downloadFile = async (fileUrl, name) => {
  try {
    const res = await axios.get(fileUrl, { responseType: 'blob' });
    const downloadUrl = window.URL.createObjectURL(
      new Blob([res.data], { type: res.data.type })
    );
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.log(error);
  }
};
