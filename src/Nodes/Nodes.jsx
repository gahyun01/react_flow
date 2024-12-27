import { BaseNode, EmptyBaseNode } from "./Base";
// `BaseNode`와 `EmptyBaseNode`를 "./Base" 파일에서 가져옵니다.
// `BaseNode`는 기본적인 노드 컴포넌트를, `EmptyBaseNode`는 비어 있는 노드 컴포넌트를 나타냅니다.

import { Handle, Position } from "react-flow-renderer";
// `react-flow-renderer` 라이브러리에서 `Handle`과 `Position`을 가져옵니다.
// `Handle`은 노드의 연결 지점을 나타내며, `Position`은 위치를 지정하는데 사용됩니다.

import "./Style.scss";
// 스타일을 정의한 SCSS 파일을 가져옵니다. 각 노드와 포트 등의 스타일이 정의됩니다.

const handleNodeClick = (props) => {
  const { data, id } = props;
  data.onNodeClickCallback(id);
};
// `handleNodeClick` 함수는 노드가 클릭될 때 호출됩니다.
// `props`에서 `data`와 `id`를 구조 분해 할당하여 사용하고,
// `data.onNodeClickCallback(id)`를 호출하여 클릭된 노드의 ID를 콜백 함수에 전달합니다.

const onCloseIconClick = (event, props) => {
  event.stopPropagation();
  const { data, id } = props;
  data.onDeleteNodeCallback(id);
};
// `onCloseIconClick` 함수는 닫기 아이콘이 클릭될 때 호출됩니다.
// `event.stopPropagation()`은 이벤트 버블링을 막아, 다른 이벤트가 트리거되지 않도록 합니다.
// `data.onDeleteNodeCallback(id)`를 호출하여 해당 노드를 삭제하는 콜백 함수를 실행합니다.

export const Source = (props) => (
  <div className="NodeWrapper">
    <BaseNode
      {...props}
      onNodeClick={() => handleNodeClick(props)}
      onCloseIconClick={(event) => onCloseIconClick(event, props)}
    />
    <Handle type="source" position={Position.Bottom} className="NodePort" />
  </div>
);
// `Source` 컴포넌트는 "출발점" 역할을 하는 노드입니다.
// `BaseNode`를 렌더링하며, 클릭 시 `handleNodeClick`을 호출하고,
// 닫기 아이콘 클릭 시 `onCloseIconClick`을 호출합니다.
// `Handle`을 사용하여 노드의 하단에 "source" 타입의 포트를 추가합니다.

export const Action = (props) => (
  <div className="NodeWrapper">
    <Handle type="target" position={Position.Top} className="NodePort" />
    <BaseNode
      {...props}
      onNodeClick={() => handleNodeClick(props)}
      onCloseIconClick={(event) => onCloseIconClick(event, props)}
    />
    <Handle type="source" position={Position.Bottom} className="NodePort" />
  </div>
);
// `Action` 컴포넌트는 "동작"을 나타내는 노드입니다.
// `Handle`을 사용하여 노드의 상단에 "target" 타입의 포트, 하단에 "source" 타입의 포트를 추가합니다.
// `BaseNode`는 클릭 및 닫기 아이콘 이벤트를 처리합니다.

export const Condition = (props) => (
  <div className="NodeWrapper">
    <Handle type="target" position={Position.Top} className="NodePort" />
    <BaseNode
      {...props}
      additionalClassName="ConditionNode"
      onNodeClick={() => handleNodeClick(props)}
      onCloseIconClick={(event) => onCloseIconClick(event, props)}
    />
    <Handle
      id="condition_0"
      type="source"
      position={Position.Bottom}
      className="NodePort"
    />
    <Handle
      id="condition_1"
      type="source"
      position={Position.Bottom}
      className="NodePort"
    />
  </div>
);
// `Condition` 컴포넌트는 "조건"을 나타내는 노드입니다.
// 상단에 "target" 포트가 하나 있고, 하단에 두 개의 "source" 포트를 추가합니다.
// `BaseNode`에 `additionalClassName="ConditionNode"`를 추가하여 스타일을 차별화합니다.
// 클릭 및 닫기 아이콘 이벤트는 `handleNodeClick`과 `onCloseIconClick`으로 처리됩니다.

export const End = (props) => (
  <div className="NodeWrapper">
    <Handle type="target" position={Position.Top} className="NodePort" />
    <BaseNode {...props} disabled={true} />
  </div>
);
// `End` 컴포넌트는 "끝"을 나타내는 노드입니다.
// 상단에 "target" 포트가 하나 있고, `BaseNode`는 비활성화(`disabled={true}`) 상태로 렌더링됩니다.

export const Empty = (props) => (
  <div className="NodeWrapper">
    <Handle
      type="target"
      position={Position.Top}
      className="NodePort"
      // style={{ opacity: 0 }}
    />
    <EmptyBaseNode {...props} disabled={true} />
    <Handle
      type="source"
      position={Position.Bottom}
      className="NodePort"
      style={{ opacity: 0 }}
    />
  </div>
);
// `Empty` 컴포넌트는 비어 있는 노드를 나타냅니다.
// `EmptyBaseNode`는 비활성화된 상태로 렌더링되며, 포트는 투명(opaque)으로 처리됩니다.
// `Handle`은 상단과 하단에 각각 "target"과 "source" 포트를 추가합니다. 하단 포트는 `style={{ opacity: 0 }}`로 투명하게 만들어 사용되지 않도록 합니다.
