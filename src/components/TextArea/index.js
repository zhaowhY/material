import React, {
  useState, useImperativeHandle, useMemo, useEffect
} from 'react';
import { Input } from '@jd/find-react';
import styles from './index.module.less';

function TextArea({
  rows = 4, maxLength = 200, onChange, tipsText, avalue = null,
  ...props
}, ref) {
  const [value, setValue] = useState('');

  useEffect(() => {
    avalue && setValue(avalue);
  }, [avalue]);

  const handleChange = (e) => {
    e.target.value = e.target.value.slice(0, maxLength);
    setValue(e.target.value);
    if (typeof onChange === 'function') onChange(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    handleChange
  }));

  const textNumber = useMemo(() => {
    const len = String(value).length;
    return len >= maxLength ? maxLength : len;
  }, [value]);

  const tipBtns = ['该事件非常紧急，请尽快办理。', '请尽快签收事件。'];

  const handleClickTip = (text) => {
    setValue(text.slice(0, maxLength));
    if (typeof onChange === 'function') onChange(text.slice(0, maxLength));
  };

  return (
    <div className={styles['text-area']}>
      <Input.TextArea rows={rows} maxLength={maxLength} value={value} {...props} onChange={handleChange} />
      {maxLength !== Infinity && <span className={styles['text-area-number']}>
        {textNumber}
        /
        {maxLength}
      </span>}
      {tipsText === 1
        && <>
          {tipBtns.map((item, idx) => <div
            key={idx}
            className={styles['text-area-choiceText']}
            style={{ marginRight: 8 }}
            onClick={() => handleClickTip(`${value}${item}`)}
          >
            {item}
          </div>)}
        </>}
    </div>
  );
}

export default React.forwardRef(TextArea);
