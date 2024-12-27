import React from "react"; // React 라이브러리를 불러옵니다. React 컴포넌트 작성에 사용됩니다.
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  MiniMap,
} from "react-flow-renderer"; 
// react-flow-renderer에서 ReactFlow, ReactFlowProvider, Controls, MiniMap 컴포넌트를 불러옵니다. 
// ReactFlow는 플로우 다이어그램(그래프)을 렌더링하는 주요 컴포넌트입니다.

import { nodeTypes } from "./Nodes"; // 커스텀 노드 타입 정의를 포함한 파일을 불러옵니다.
import { edgeTypes } from "./Edges"; // 커스텀 엣지 타입 정의를 포함한 파일을 불러옵니다.
import { getLayoutedElements } from "./Utils/WorkflowLayoutUtils"; 
// 노드와 엣지를 레이아웃(배치)하는 유틸리티 함수를 불러옵니다.

import "./Automation.css"; // 이 컴포넌트에 필요한 CSS 파일을 불러옵니다.


// Automation 컴포넌트를 정의합니다.
export const Automation = (props) => {
  const { elements } = props; 
  // props로 전달된 `elements`는 노드 및 엣지 데이터입니다.

  const [layoutElements, setLayoutElements] = React.useState([]); 
  // 상태 관리: 레이아웃된 요소를 저장할 상태 변수. 초기값은 빈 배열.

  React.useEffect(() => {
    setLayoutElements(getLayoutedElements(elements)); 
    // `elements`가 변경될 때마다 레이아웃된 요소를 업데이트합니다.
  }, [elements]); 
  // `elements`가 변경될 때만 이 useEffect가 실행됩니다.

  const layoutNodes = layoutElements.filter((x) => x.position); 
  // 레이아웃된 요소 중에서 position(좌표)이 있는 노드만 필터링합니다.
  const layoutEdges = layoutElements.filter((x) => !x.position); 
  // 레이아웃된 요소 중에서 position(좌표)이 없는 엣지(연결선)만 필터링합니다.

  return (
    <div className="AutomationCanvas">
      {/* 다이어그램을 렌더링할 컨테이너 */}
      <ReactFlowProvider>
        {/* ReactFlowProvider는 ReactFlow 컴포넌트에 필요한 컨텍스트를 제공합니다. */}
        <ReactFlow
          nodes={layoutNodes} 
          // 다이어그램의 노드를 전달합니다.
          edges={layoutEdges} 
          // 다이어그램의 엣지를 전달합니다.
          nodesDraggable={false} 
          // 노드를 드래그할 수 없도록 설정.
          nodesConnectable={false} 
          // 노드 간 연결을 허용하지 않도록 설정.
          nodeTypes={nodeTypes} 
          // 커스텀 노드 타입을 전달.
          edgeTypes={edgeTypes} 
          // 커스텀 엣지 타입을 전달.
          zoomOnScroll={false} 
          // 스크롤로 줌이 되지 않도록 설정.
          zoomOnPinch={false} 
          // 핀치로 줌이 되지 않도록 설정.
          panOnScroll 
          // 스크롤로 다이어그램 이동 가능.
          defaultPosition={[500, 50]} 
          // 다이어그램의 초기 위치를 설정.
          panOnDrag 
          // 드래그로 다이어그램 이동 가능.
          preventScrolling 
          // 페이지 스크롤을 방지.
        >
          <Controls showInteractive={false} className="Controls" />
          {/* 줌 및 이동 버튼과 같은 컨트롤러를 렌더링. showInteractive는 사용자 상호작용을 숨김. */}
          <MiniMap />
          {/* 다이어그램의 전체 미리보기를 보여주는 미니맵 컴포넌트 */}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

// Layout 컴포넌트를 정의합니다.
const Layout = (props) => (
  <ReactFlowProvider>
    {/* ReactFlowProvider를 한 번 더 사용하여 Automation 컴포넌트를 감쌉니다. */}
    <Automation {...props} />
    {/* Automation 컴포넌트에 모든 props를 전달. */}
  </ReactFlowProvider>
);

export default Layout; 
// Layout 컴포넌트를 기본 내보내기로 설정합니다.
