// 筛选对象中有效值
export default filterEmpty = (obj) => {
  const filterObj = {};
  Object.entries(obj).forEach(item => {
    const [key, value] = item;
    if (value || value === 0) {
      filterObj[key] = value;
    }
  });
  return filterObj;
};