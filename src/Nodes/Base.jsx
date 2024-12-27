/* eslint-disable default-case */
// ESLint의 'default-case' 규칙을 비활성화합니다. 이는 switch 문에서 default 케이스를 강제하지 않겠다는 의미입니다.

import * as colors from "@contactlab/ds-tokens/constants/colors";
// "@contactlab/ds-tokens/constants/colors"에서 모든 색상 관련 상수를 가져옵니다.

import {
  DatabaseOutlined,
  MailOutlined,
  CommentOutlined,
  CheckCircleOutlined,
  FlagOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// Ant Design의 아이콘 컴포넌트를 가져옵니다. 각각 데이터베이스, 이메일, 코멘트, 체크, 플래그, 닫기 아이콘을 의미합니다.

import "./Style.scss";
// 스타일(CSS)을 정의한 "Style.scss" 파일을 가져옵니다.

export const BaseNode = ({
  type,
  data,
  selected,
  disabled,
  onNodeClick,
  onCloseIconClick,
  additionalClassName,
}) => {
  // `BaseNode`라는 React 컴포넌트를 정의합니다.
  // 이 컴포넌트는 노드의 종류, 데이터, 선택 여부, 비활성화 상태 등을 포함한 여러 속성을 받습니다.

  const content = (
    <>
      {getIconSrc(type)}
      {/* type에 따라 적절한 아이콘 컴포넌트를 렌더링합니다. */}
      <div className="NodeContent">
        <div className="NodeTitle">{data.title}</div>
        {/* data.title 값을 노드의 제목으로 렌더링합니다. */}
        <p className="NodeDesc">{data.description}</p>
        {/* data.description 값을 노드의 설명으로 렌더링합니다. */}
      </div>
    </>
  );

  return (
    <div
      data-selected={selected}
      // 선택 여부를 나타내는 속성을 추가합니다.

      aria-disabled={disabled}
      // 비활성화 상태를 스크린 리더 등 접근성 도구에서 인식하도록 추가합니다.

      className={`NodeInnerWrapper ${additionalClassName}`}
      // 기본 클래스 이름인 "NodeInnerWrapper"에 추가 클래스 이름을 포함시킵니다.

      style={{ color: getColor(type) }}
      // 노드의 색상을 `type`에 따라 설정된 색상으로 지정합니다.

      {...(onNodeClick && { onClick: () => onNodeClick(type, data) })}
      // `onNodeClick` 콜백이 존재하면, 해당 콜백을 클릭 이벤트에 연결합니다.
    >
      {content}
      {/* 위에서 정의한 콘텐츠를 렌더링합니다. */}
      <CloseOutlined className="closeIcon" onClick={onCloseIconClick} />
      {/* 닫기 아이콘을 렌더링하며, 클릭 시 `onCloseIconClick` 콜백이 실행됩니다. */}
    </div>
  );
};

export const EmptyBaseNode = () => {
  // 빈 노드를 렌더링하기 위한 컴포넌트를 정의합니다.
  return <div className="EmptyNodeInnerWrapper"></div>;
  // 비어 있는 div 요소를 렌더링하며, "EmptyNodeInnerWrapper" 클래스 이름을 사용합니다.
};

// --- Helpers
const getColor = (type) => {
  // 노드의 `type`에 따라 색상을 반환하는 헬퍼 함수입니다.
  switch (type) {
    case "source":
      return colors.success;
      // "source" 타입의 경우 성공 색상을 반환합니다.
    case "email":
      return colors.accent;
      // "email" 타입의 경우 강조 색상을 반환합니다.
    case "sms":
      return colors.accent;
      // "sms" 타입의 경우 강조 색상을 반환합니다.
    case "waitThenCheck":
      return colors.warning;
      // "waitThenCheck" 타입의 경우 경고 색상을 반환합니다.
    case "end":
      return colors.base;
      // "end" 타입의 경우 기본 색상을 반환합니다.
    default:
      return colors.base;
      // 기본적으로 기본 색상을 반환합니다.
  }
};

const getIconSrc = (type) => {
  // 노드의 `type`에 따라 적절한 아이콘 컴포넌트를 반환하는 헬퍼 함수입니다.
  const color = getColor(type);
  // `type`에 따라 색상을 가져옵니다.

  switch (type) {
    case "source":
      return <DatabaseOutlined className="NodeIcon" style={{ color }} />;
      // "source" 타입의 경우 데이터베이스 아이콘을 반환합니다.
    case "email":
      return <MailOutlined className="NodeIcon" style={{ color }} />;
      // "email" 타입의 경우 이메일 아이콘을 반환합니다.
    case "sms":
      return <CommentOutlined className="NodeIcon" style={{ color }} />;
      // "sms" 타입의 경우 코멘트 아이콘을 반환합니다.
    case "waitThenCheck":
      return <CheckCircleOutlined className="NodeIcon" style={{ color }} />;
      // "waitThenCheck" 타입의 경우 체크 아이콘을 반환합니다.
    case "end":
      return <FlagOutlined className="NodeIcon" style={{ color }} />;
      // "end" 타입의 경우 플래그 아이콘을 반환합니다.
  }
};
