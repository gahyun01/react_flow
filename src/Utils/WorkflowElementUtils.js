import { v4 as uuidv4 } from "uuid";
// `uuidv4`는 고유한 ID를 생성하는 라이브러리에서 `v4` 함수를 가져옵니다. 이 함수는 랜덤 UUID를 생성합니다.

import _ from "lodash";
// `lodash` 라이브러리에서 `_`를 가져옵니다. `lodash`는 다양한 유용한 유틸리티 함수를 제공하는 라이브러리입니다.

import { getIncomers, getOutgoers } from "react-flow-renderer";
// `react-flow-renderer`에서 `getIncomers`와 `getOutgoers` 함수를 가져옵니다. 이 함수들은 각각 노드의 입력과 출력을 가져오는 데 사용됩니다.

const position = { x: 0, y: 0 };
// 노드의 기본 위치를 `(0, 0)`으로 설정합니다.

const getTitleAndDescription = (type) => {
  switch (type) {
    case "email":
      return { title: "Email", description: "Send email to contacts." };
    case "sms":
      return { title: "Sms", description: "Send sms to contacts." };
    case "waitThenCheck":
      return { title: "New Rule", description: "Check behaviour of the Rule" };
    case "end":
      return { title: "End", description: "Process ends" };
    default:
      return null;
  }
};
// `getTitleAndDescription` 함수는 `type`에 따라 노드의 제목과 설명을 반환합니다.
// 예를 들어, "email" 타입의 경우 "Email" 제목과 "Send email to contacts" 설명을 반환합니다.

const getUpdatedElementsAfterActionNodeAddition = ({
  elements,
  newNodeId,
  targetNodeId,
  onAddNodeCallback,
}) => {
  const clonedElements = _.cloneDeep(elements);
  // `elements` 배열을 깊은 복사(cloneDeep)하여 원본 배열을 변경하지 않도록 합니다.

  const newEdge = {
    id: uuidv4(),
    source: newNodeId,
    target: targetNodeId,
    type: "condition",
    data: { onAddNodeCallback },
  };
  // 새로운 엣지 객체를 생성합니다. 이 엣지는 `newNodeId`에서 `targetNodeId`로 가는 "condition" 타입의 엣지입니다.

  clonedElements.push(newEdge);
  // 새로운 엣지를 복사된 `clonedElements` 배열에 추가합니다.

  return clonedElements;
};
// 이 함수는 액션 노드가 추가될 때 새로운 엣지를 생성하고, 이를 기존 요소에 추가하여 업데이트된 요소를 반환합니다.

const getUpdatedElementsAfterEndNodeAddition = () => {};
// `getUpdatedElementsAfterEndNodeAddition` 함수는 아직 구현되지 않았습니다. 끝 노드가 추가될 때 필요한 로직을 처리하는 함수로 추측됩니다.

const getUpdatedElementsAfterRuleNodeAdditon = ({
  elements,
  newNodeId,
  targetNodeId,
  onAddNodeCallback,
}) => {
  const clonedElements = _.cloneDeep(elements);
  // `elements` 배열을 깊은 복사하여 원본 배열을 변경하지 않도록 합니다.

  const emptyNode1Id = uuidv4();
  const emptyNode2Id = uuidv4();
  const mergeNodeId = uuidv4();
  // 새로운 빈 노드 및 병합 노드에 대한 고유 ID를 생성합니다.

  const emptyNode1 = {
    id: emptyNode1Id,
    type: "empty",
    data: {},
    position,
    height: 6,
  };
  const emptyNode2 = {
    id: emptyNode2Id,
    type: "empty",
    data: {},
    position,
    height: 6,
  };
  const mergeNode = {
    id: mergeNodeId,
    type: "empty",
    data: {},
    position,
    height: 6,
  };
  // `emptyNode1`, `emptyNode2`, `mergeNode`를 각각 빈 타입으로 생성하며, 각 노드의 ID, 위치, 높이를 설정합니다.

  const ruleNodeToEmptyNodeEdge1 = {
    id: uuidv4(),
    source: newNodeId,
    target: emptyNode1Id,
    type: "condition",
    data: { onAddNodeCallback },
  };
  const emptyNode1ToMergeNodeEdge = {
    id: uuidv4(),
    source: emptyNode1Id,
    target: mergeNodeId,
    type: "condition",
    data: { onAddNodeCallback, isAddButtonHidden: true },
  };
  const ruleNodeToEmptyNodeEdge2 = {
    id: uuidv4(),
    source: newNodeId,
    target: emptyNode2Id,
    type: "condition",
    data: { onAddNodeCallback },
  };
  const emptyNode2ToMergeNodeEdge = {
    id: uuidv4(),
    source: emptyNode2Id,
    target: mergeNodeId,
    type: "condition",
    data: { onAddNodeCallback, isAddButtonHidden: true },
  };
  const mergeNodeEdge = {
    id: uuidv4(),
    source: mergeNodeId,
    target: targetNodeId,
    type: "condition",
    data: { onAddNodeCallback },
    mergeNodeOfParentId: newNodeId,
  };
  // 여러 엣지를 생성합니다. 새로운 노드와 빈 노드 간, 빈 노드와 병합 노드 간, 병합 노드와 타겟 노드 간의 엣지를 생성합니다.

  clonedElements.push(
    ...[
      emptyNode1,
      emptyNode2,
      ruleNodeToEmptyNodeEdge1,
      emptyNode1ToMergeNodeEdge,
      ruleNodeToEmptyNodeEdge2,
      emptyNode2ToMergeNodeEdge,
      mergeNode,
      mergeNodeEdge,
    ]
  );
  // 생성한 빈 노드, 병합 노드 및 엣지들을 `clonedElements` 배열에 추가합니다.

  console.error({ clonedElements });
  return clonedElements;
};
// 이 함수는 규칙 노드가 추가될 때, 빈 노드와 병합 노드를 생성하고 연결하는 엣지들을 추가하여 업데이트된 요소를 반환합니다.

const getUpdatedElementsAfterNodeAddition = ({
  elements,
  targetEdgeId,
  type,
  onDeleteNodeCallback,
  onNodeClickCallback,
  onAddNodeCallback,
}) => {
  const newNodeId = uuidv4();
  // 새로운 노드의 ID를 생성합니다.

  const { title, description } = getTitleAndDescription(type);
  // `getTitleAndDescription` 함수를 사용하여 노드의 제목과 설명을 가져옵니다.

  const newNode = {
    id: newNodeId,
    type,
    data: {
      title,
      description,
      onNodeClickCallback,
      onDeleteNodeCallback,
    },
    position,
  };
  // 새로운 노드 객체를 생성합니다. 노드의 타입, 제목, 설명, 콜백 함수 등을 포함합니다.

  const clonedElements = _.cloneDeep(elements);
  // `elements` 배열을 깊은 복사하여 원본 배열을 변경하지 않도록 합니다.

  const targetEdgeIndex = clonedElements.findIndex(
    (x) => x.id === targetEdgeId
  );
  const targetEdge = elements[targetEdgeIndex];
  const { target: targetNodeId } = targetEdge;
  // 타겟 엣지를 찾아서 해당 타겟 노드의 ID를 가져옵니다.

  const updatedTargetEdge = { ...targetEdge, target: newNodeId };
  clonedElements[targetEdgeIndex] = updatedTargetEdge;
  // 타겟 엣지의 타겟을 새로 생성한 노드 ID로 업데이트합니다.

  clonedElements.push(newNode);
  // 새로 생성한 노드를 `clonedElements` 배열에 추가합니다.

  switch (type) {
    case "end":
      return getUpdatedElementsAfterEndNodeAddition();
    case "waitThenCheck":
      return getUpdatedElementsAfterRuleNodeAdditon({
        elements: clonedElements,
        newNodeId,
        targetNodeId,
        onAddNodeCallback,
      });
    default:
      return getUpdatedElementsAfterActionNodeAddition({
        elements: clonedElements,
        newNodeId,
        newNode,
        targetNodeId,
        onAddNodeCallback,
      });
  }
};
// `getUpdatedElementsAfterNodeAddition` 함수는 새로운 노드를 추가할 때, 노드의 타입에 따라 적절한 처리를 합니다.
// "end" 타입인 경우 `getUpdatedElementsAfterEndNodeAddition()`을 호출하고,
// "waitThenCheck" 타입인 경우 `getUpdatedElementsAfterRuleNodeAdditon()`을 호출하며,
// 그 외의 경우 `getUpdatedElementsAfterActionNodeAddition()`을 호출하여 새로운 엣지를 추가합니다.

export { getUpdatedElementsAfterNodeAddition };
// `getUpdatedElementsAfterNodeAddition` 함수를 외부로 내보냅니다.
