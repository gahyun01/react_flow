import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";
// React Flow 라이브러리에서 간선(edge)을 렌더링하기 위한 유틸리티 함수들을 가져옵니다.
// - `getBezierPath`: 간선을 곡선 형태로 그리기 위한 경로 데이터를 생성.
// - `getEdgeCenter`: 간선의 중간 지점을 계산.
// - `getMarkerEnd`: 간선의 끝에 표시되는 화살표(marker)를 설정.

import EdgeAddButton from "../Buttons/EdgeAddButton/EdgeAddButton";
// Edge에 새 노드를 추가하기 위한 버튼 컴포넌트를 가져옵니다.

import "./Style.scss";
// 해당 컴포넌트에 적용할 스타일 시트를 가져옵니다.

const [buttonWidth, buttonHeight] = [100, 40];
// 버튼의 가로와 세로 크기를 각각 100px, 40px로 설정합니다.

export const Condition = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    arrowHeadType,
    markerEndId,
    data,
  } = props;
  // 부모로부터 전달된 `props`를 구조 분해 할당합니다.
  // - `id`: edge의 고유 식별자.
  // - `sourceX`, `sourceY`: 간선의 출발 지점의 x, y 좌표.
  // - `targetX`, `targetY`: 간선의 도착 지점의 x, y 좌표.
  // - `sourcePosition`, `targetPosition`: 노드에서 간선이 연결되는 위치 (상단, 하단, 좌측, 우측).
  // - `arrowHeadType`: 화살표의 타입.
  // - `markerEndId`: 화살표 끝의 ID.
  // - `data`: 간선에 추가 정보를 포함하는 객체.

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  // `getBezierPath`를 사용해 간선의 곡선 경로 데이터를 계산합니다.

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  // 화살표 끝부분의 스타일(모양)을 설정합니다.

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  // `getEdgeCenter`를 사용해 간선의 중간 지점(x, y 좌표)을 계산합니다.

  const { isAddButtonHidden } = data;
  // `data` 객체에서 `isAddButtonHidden` 값을 추출합니다.
  // - `isAddButtonHidden`: 버튼 표시 여부를 결정하는 플래그.

  return (
    <>
      <path
        id={id}
        d={edgePath}
        markerEnd={markerEnd}
        className="react-flow__edge-path"
      />
      {/* 
      - 간선을 SVG의 `path` 엘리먼트로 그립니다.
      - `d` 속성: 간선의 경로 데이터를 설정.
      - `markerEnd`: 간선 끝에 화살표를 추가.
      - `className`: 스타일링을 위한 클래스 이름.
      */}

      {isAddButtonHidden ? null : (
        <>
          <foreignObject
            width={buttonWidth}
            height={buttonHeight}
            x={edgeCenterX - buttonWidth / 2}
            y={edgeCenterY - buttonHeight / 2}
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            {/* 
            - foreignObject: SVG 안에 HTML 요소를 포함하기 위한 엘리먼트.
            - `width`, `height`: 버튼의 크기.
            - `x`, `y`: 버튼의 위치를 edge의 중간에 배치.
            - `requiredExtensions`: XHTML 지원을 명시.
            */}
            <EdgeAddButton
              {...props}
              onClick={() => {}}
              style={{ width: buttonWidth, height: buttonHeight }}
            />
            {/* 
            - `EdgeAddButton` 컴포넌트를 렌더링.
            - `props`와 `style`을 전달해 버튼을 구성.
            - 현재 `onClick`은 빈 함수로 설정.
            */}
          </foreignObject>
        </>
      )}
    </>
  );
  // `isAddButtonHidden` 값이 `true`인 경우 버튼을 숨기고, 그렇지 않으면 `EdgeAddButton`을 표시합니다.
};
