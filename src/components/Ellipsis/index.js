import React, {
  useEffect, useRef, useState
} from 'react';
import { Tooltip } from '@jd/find-react';
import { getType } from '@/utils/globalFunc';
import styles from './index.module.less';

export default ({
  rows = 1,
  title = '',
  className = '',
  tooltipProps = {},
  ...props
}) => {
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);
  const contentRef3 = useRef(null);
  const containerRef = useRef(null);
  const [content, setContent] = useState(title);
  const [visible, setVisible] = useState(false);
  const [containerStyle, setContainerStyle] = useState({});

  const [contentStyles, setContentStyles] = useState({});
  const [isEllipsis, setIsEllipsis] = useState(false);

  useEffect(() => {
    // 重置初始变量
    setContent(title);
    setVisible(false);
    setContentStyles({});
    setIsEllipsis(false);
  }, [title]);

  useEffect(() => {
    // eslint-disable-next-line
    if (!Number(rows) || Number(rows) < 1) rows = 1;

    if (rows === 1
      || !['Number', 'String'].includes(
        getType(title)
      )) {
      setContainerStyle({
        width: containerRef.current.offsetWidth
      });
      setContentStyles({
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        display: 'block',
      });
      if (contentRef1.current.offsetWidth
          <= contentRef3.current.offsetWidth) setIsEllipsis(true);
      setVisible(true);
      return;
    }

    const contentWidth = contentRef2.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth * rows;

    console.log(111111, content, contentWidth, containerWidth);
    // 从宽度减少内容
    if (contentWidth > containerWidth) {
      setIsEllipsis(true);
      const suffixLen = content.slice(-3) === '...' ? 3 : 0;
      const len = Math.floor(content.length * (containerWidth / contentWidth));
      setContent(`${content.slice(0, len - 1 - suffixLen)}...`);
      return;
    }

    // 从高度减少内容
    const { lineHeight, height } = window.getComputedStyle(contentRef1.current);
    const contentHeight = Number(height.slice(0, -2));
    const containerHeight = Number(lineHeight.slice(0, -2)) * rows;
    console.log(22222, contentHeight, containerHeight);

    if (contentHeight > containerHeight) {
      setContent(`${content.slice(0, -4)}...`);
      return;
    }
    setVisible(true);
  }, [content, rows]);
  return (
    <div
      style={containerStyle}
      className={`${styles.ellipsis} ${className}`}
      ref={containerRef}
      {...props}
    >
      <div
        ref={contentRef1}
        className={styles.ellipsis__content1}
        style={{
          visibility: visible ? 'visible' : 'hidden',
        }}
      >

        {isEllipsis ? <Tooltip title={title} placement="right" {...tooltipProps}>
          <div
            style={{ display: 'inline-block', ...contentStyles }}
            ref={contentRef3}
          >
            {content}
          </div>
        </Tooltip> : <div
          style={{ display: 'inline-block', ...contentStyles }}
          ref={contentRef3}
        >
          {content}
        </div>}

      </div>
      <div
        ref={contentRef2}
        className={styles.ellipsis__content2}
        style={{
          visibility: 'hidden',
        }}
      >
        {!visible && content}
      </div>
    </div>
  );
};
