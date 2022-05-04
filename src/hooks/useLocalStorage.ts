import { useCallback, useEffect, useState } from "react";

/**
 * フック
 */
export const useLocalStorage = (key: string, defaultValue?: string) => {
  const [_value, _setValue] = useState<undefined | string>(undefined);

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value === null) {
      _setValue(defaultValue);
    } else {
      _setValue(value);
    }
  }, [defaultValue, key]);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setValue = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      _setValue(value);
    },
    [key, _setValue]
  );

  return [_value, setValue] as const;
};
