import React, { useState } from "react";

const useInput = () => {
  // 2. value는 useState로 관리하고,
  const [value, setValue] = useState("");

  // 3. 핸들러 로직도 구현합니다.
  const handler = (e) => {
    setValue(e.target.value);
  };

  // 1. 이 훅은 [ ] 을 반환하는데, 첫번째는 value, 두번째는 핸들러를 반환합니다.
  return [value, handler, setValue];
};

export default useInput;
