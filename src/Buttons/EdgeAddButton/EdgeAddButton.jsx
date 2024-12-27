import { AddButton } from "../AddButton/AddButton"; 
// AddButton 컴포넌트를 import 합니다. 이전에 정의한 원형 플러스(+) 버튼입니다.

import { Menu, Dropdown } from "antd"; 
// Ant Design 라이브러리에서 Menu와 Dropdown 컴포넌트를 import 합니다.
// Menu는 드롭다운 메뉴 항목을 정의하고, Dropdown은 해당 메뉴를 드롭다운 형식으로 표시합니다.

import "./EdgeAddButton.scss"; 
// EdgeAddButton 컴포넌트의 스타일을 정의한 SCSS 파일을 import 합니다.

// EdgeAddButton 컴포넌트를 정의합니다.
const EdgeAddButton = (props) => {
  const { style, data, id } = props; 
  // props에서 스타일, 데이터, 그리고 ID를 가져옵니다.

  // 드롭다운 메뉴의 내용을 정의합니다.
  const content = (
    <Menu 
      onClick={(event) => 
        data.onAddNodeCallback({ id, type: event.key })
      }
      // 메뉴 항목 클릭 시, data에 정의된 onAddNodeCallback 함수를 호출합니다.
      // 해당 함수는 현재 ID와 클릭된 메뉴 항목의 키(`event.key`)를 전달받습니다.
    >
      <Menu.Item key="email">Email</Menu.Item> 
      {/* "Email" 메뉴 항목, key 값은 "email". */}
      <Menu.Item key="sms">SMS</Menu.Item> 
      {/* "SMS" 메뉴 항목, key 값은 "sms". */}
      <Menu.Item key="waitThenCheck">Rule</Menu.Item> 
      {/* "Rule" 메뉴 항목, key 값은 "waitThenCheck". */}
      <Menu.Item key="end">End</Menu.Item> 
      {/* "End" 메뉴 항목, key 값은 "end". */}
    </Menu>
  );

  return (
    <div className="EdgeAddButton" style={style}> 
      {/* 스타일 속성을 적용한 EdgeAddButton의 컨테이너 */}
      <Dropdown overlay={content} trigger={["click"]}> 
        {/* Dropdown 컴포넌트를 사용하여 `content`를 드롭다운 메뉴로 설정합니다. */}
        {/* trigger 속성은 "click"으로 설정되어, 버튼을 클릭하면 드롭다운이 열립니다. */}
        <AddButton {...props} /> 
        {/* AddButton 컴포넌트를 렌더링하며, props를 전달받아 버튼을 표시합니다. */}
      </Dropdown>
    </div>
  );
};

export default EdgeAddButton; 
// EdgeAddButton 컴포넌트를 기본 내보내기로 설정합니다.
