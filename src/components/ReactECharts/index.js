import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default (({
  onEvents = {}, style = {}, className = '', option = {}
}) => {
  const chart = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    chart.current = echarts.init(chartRef.current);
    Object.entries(onEvents).forEach(([key, value]) => {
      if (Object.prototype.toString.call(value) === '[object Function]') {
        chart.current.on(key, value);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chart.current.setOption(option);
  }, [option]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%', boxSizing: 'border-box', height: '100%', ...style
      }}
      className={className}
    >
    </div>
  );
});
