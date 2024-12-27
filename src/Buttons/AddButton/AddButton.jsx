import { Button } from "antd"; 
// Ant Design UI 라이브러리에서 Button 컴포넌트를 불러옵니다.

import { PlusOutlined } from "@ant-design/icons"; 
// Ant Design 아이콘 라이브러리에서 'PlusOutlined' 아이콘(+)을 불러옵니다.

// AddButton 컴포넌트를 정의합니다.
export const AddButton = (props) => {
  const { onClick } = props; 
  // props에서 onClick 이벤트 핸들러를 가져옵니다.

  return (
    <Button
      shape="circle" 
      // 버튼 모양을 원형으로 설정.
      size="small" 
      // 버튼 크기를 작게 설정.
      icon={<PlusOutlined />} 
      // 버튼 내부에 플러스(+) 아이콘을 렌더링.
      onClick={() => onClick(props)} 
      // 버튼 클릭 시 props로 전달된 onClick 함수가 실행되도록 설정.
    />
  );
};
