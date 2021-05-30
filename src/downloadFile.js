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


// 其他下载介绍
// file-saver 会等文件都下载完毕之后，在弹出下载框， 无法利用浏览器自身特性，显示下载进度
// 不用window.URL.createObjectURL, 会出现无法自定义文件名的情况，文件名为连接后缀