import React from "react"; // React 라이브러리를 불러옵니다. React 컴포넌트 작성에 사용됩니다.
import _ from "lodash"; // Lodash 라이브러리를 불러옵니다. 데이터 복사 및 기타 유틸리티 함수 제공.
import Layout from "./Automation"; // Automation 파일에서 Layout 컴포넌트를 불러옵니다.
import { getIncomers, getOutgoers } from "react-flow-renderer"; // 노드의 입력/출력 연결을 가져오는 react-flow-renderer의 함수 불러오기.
import { initialElements } from "./Data/Elements1"; // 초기 요소 데이터를 포함하는 파일에서 데이터를 불러옵니다.
import { getUpdatedElementsAfterNodeAddition } from "./Utils/WorkflowElementUtils"; // 노드 추가 시 업데이트된 요소를 반환하는 유틸리티 함수 불러오기.
import "antd/dist/antd.css"; // Ant Design의 기본 CSS를 가져옵니다.
import "./index.scss"; // 프로젝트의 커스텀 스타일을 포함하는 SCSS 파일 불러오기.

const App = () => {
  // App 컴포넌트를 정의합니다.
  const [elements, setElements] = React.useState([]); 
  // React 상태로 요소 배열을 관리합니다. 초기값은 빈 배열입니다.

  // 노드 추가 콜백 함수
  const onAddNodeCallback = ({ id, type }) => {
    setElements((elements) =>
      // getUpdatedElementsAfterNodeAddition 함수를 호출하여 요소를 업데이트.
      getUpdatedElementsAfterNodeAddition({
        elements, // 현재 요소들
        targetEdgeId: id, // 대상 엣지 ID
        type, // 노드 타입
        onDeleteNodeCallback, // 노드 삭제 콜백 함수 전달
        onNodeClickCallback, // 노드 클릭 콜백 함수 전달
        onAddNodeCallback, // 자기 자신 콜백 함수 전달
      })
    );
  };

  // 노드 삭제 콜백 함수
  const onDeleteNodeCallback = (id) => {
    setElements((elements) => {
      const clonedElements = _.cloneDeep(elements); // 요소를 깊은 복사합니다.
      const incomingEdges = clonedElements.filter((x) => x.target === id); // 삭제될 노드로 들어오는 엣지들 찾기
      const outgoingEdges = clonedElements.filter((x) => x.source === id); // 삭제될 노드에서 나가는 엣지들 찾기
      const updatedIncomingEdges = incomingEdges.map((x) => ({
        // 들어오는 엣지의 타겟을 나가는 엣지의 타겟으로 변경
        ...x,
        target: outgoingEdges[0].target,
      }));
      const filteredElements = clonedElements.filter(
        (x) =>
          x.id !== id && // 삭제할 노드 제외
          x.target !== incomingEdges[0]?.target && // 연결된 들어오는 엣지 제거
          x.source !== outgoingEdges[0]?.source // 연결된 나가는 엣지 제거
      );
      filteredElements.push(...updatedIncomingEdges); // 업데이트된 엣지 추가
      return filteredElements; // 업데이트된 요소 반환
    });
  };

  // 노드 클릭 콜백 함수
  const onNodeClickCallback = (id) => {
    setElements((elements) => {
      const currentNode = elements.find((x) => x.id === id); // 클릭된 노드를 찾기
      const nodes = elements.filter((x) => x.position); // 모든 노드 필터링
      const edges = elements.filter((x) => !x.position); // 모든 엣지 필터링
      console.error({
        incomers: getIncomers(currentNode, nodes, edges), // 클릭된 노드의 들어오는 연결
        outgoers: getOutgoers(currentNode, nodes, edges), // 클릭된 노드의 나가는 연결
      });
      return elements; // 요소는 그대로 반환
    });
    alert(`You clicked the "${id}" node`); // 클릭된 노드의 ID를 표시
  };

  // 컴포넌트가 마운트될 때 실행되는 useEffect
  React.useEffect(() => {
    const nodes = initialElements
      .filter((x) => !x.target) // 엣지가 아닌 노드만 필터링
      .map((x) => ({
        ...x,
        data: { ...x.data, onDeleteNodeCallback, onNodeClickCallback }, // 노드 데이터에 콜백 함수 추가
      }));
    const edges = initialElements
      .filter((x) => x.target) // 엣지인 요소만 필터링
      .map((x) => ({ ...x, data: { ...x.data, onAddNodeCallback } })); // 엣지 데이터에 콜백 함수 추가
    setElements([...nodes, ...edges]); // 상태를 노드와 엣지로 초기화
  }, []); // 의존성 배열이 빈 상태이므로 컴포넌트가 처음 렌더링될 때만 실행

  // 컴포넌트 렌더링
  return (
    <div className="App">
      <Layout elements={elements} /> 
      {/* Layout 컴포넌트에 요소 데이터를 전달 */}
    </div>
  );
};

export default App; // App 컴포넌트를 기본 내보내기로 설정
