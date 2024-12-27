import dagre from "dagre";
// `dagre`는 그래프 레이아웃을 계산하는 라이브러리로, 이 코드는 그래프 노드의 배치(layout)를 계산하기 위해 사용됩니다.

import _ from "lodash";
// `lodash`는 다양한 유틸리티 함수들을 제공하는 라이브러리로, 이 코드에서는 깊은 복사(cloneDeep) 등의 기능을 사용합니다.

import { isNode } from "react-flow-renderer";
// `react-flow-renderer`에서 `isNode` 함수를 가져옵니다. 이 함수는 요소가 노드인지 확인하는 데 사용됩니다.

const nodeWidth = 250;
const nodeHeight = 80;
// 기본적으로 노드의 너비는 250, 높이는 80으로 설정됩니다. (각각 `nodeWidth`, `nodeHeight`)

const getLayoutedElements = (_elements) => {
  const elements = _.cloneDeep(_elements);
  // 입력받은 `_elements` 배열을 깊은 복사하여 `elements`라는 새 배열에 저장합니다.
  // 원본 배열을 수정하지 않기 위해 복사본을 사용합니다.

  const dagreGraph = new dagre.graphlib.Graph();
  // `dagre.graphlib.Graph`는 다이어그램 레이아웃을 계산하는 데 사용되는 그래프 객체입니다.
  
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  // 그래프의 기본 엣지(선)에 대한 라벨을 빈 객체로 설정합니다.

  dagreGraph.setGraph({ rankdir: "TB" });
  // 그래프의 레이아웃 방향을 설정합니다. `"TB"`는 "Top to Bottom"을 의미하며,
  // 그래프 노드들이 위에서 아래로 배치되도록 합니다.

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: el.width || nodeWidth,
        height: el.height || nodeHeight,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  // `elements` 배열을 순회하면서 각 요소가 노드인지 확인한 후,
  // 노드는 `dagreGraph`에 노드로 추가하고, 엣지는 소스와 타겟을 연결하는 엣지로 추가합니다.
  // 노드에는 기본적으로 너비와 높이를 설정하고, 엣지는 소스에서 타겟으로 연결됩니다.

  dagre.layout(dagreGraph);
  // `dagre.layout` 함수는 그래프 레이아웃을 계산하여 노드들을 적절히 배치합니다.

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      // 노드의 위치 정보를 `dagreGraph.node(el.id)`를 통해 가져옵니다.

      el.targetPosition = "top";
      el.sourcePosition = "bottom";
      // 노드의 입력과 출력을 설정합니다.
      // 입력은 "top" 위치로, 출력은 "bottom" 위치로 설정합니다.

      el.position = {
        x:
          nodeWithPosition.x - (el.width || nodeWidth) / 2 + Math.random() / 1000,
        // 노드의 `x` 위치는 `dagreGraph.node(el.id).x` 값을 기준으로, 노드의 너비의 절반을 빼고,
        // 그 후 작은 무작위 값을 더하여 노드가 겹치지 않도록 합니다.

        y: nodeWithPosition.y - (el.height || nodeHeight) / 2,
        // 노드의 `y` 위치는 `dagreGraph.node(el.id).y` 값을 기준으로, 노드의 높이의 절반을 빼서 배치합니다.
      };
    }
    return el;
  });
};
// 이 `map` 함수는 각 요소를 처리하여 레이아웃이 계산된 후, 노드의 `position` 속성에 x, y 값을 업데이트합니다.
// 노드의 위치는 다그레(Dagre) 라이브러리에서 계산된 위치로 설정됩니다.
// 엣지는 변하지 않으며, 노드의 위치만 업데이트됩니다.

export { getLayoutedElements };
// `getLayoutedElements` 함수를 외부로 내보냅니다. 이 함수는 레이아웃이 계산된 요소들을 반환합니다.
