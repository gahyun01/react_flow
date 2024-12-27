import { AddButton } from "../AddButton/AddButton"; 
// AddButton 컴포넌트를 "../AddButton/AddButton" 경로에서 가져옵니다. 
// AddButton은 원형 플러스(+) 버튼을 렌더링하는 컴포넌트입니다.

import "./NodeAddButton.scss"; 
// NodeAddButton 컴포넌트의 스타일을 정의한 SCSS 파일을 import 합니다.

// NodeAddButton 컴포넌트를 정의합니다.
const NodeAddButton = (props) => {
  return (
    <div className="NodeAddButton"> 
      {/* NodeAddButton의 컨테이너 div로, SCSS에서 정의한 스타일을 적용합니다. */}
      <AddButton {...props} /> 
      {/* AddButton 컴포넌트를 렌더링하며, props를 그대로 전달합니다. */}
    </div>
  );
};

export default NodeAddButton; 
// NodeAddButton 컴포넌트를 기본 내보내기로 설정합니다.
