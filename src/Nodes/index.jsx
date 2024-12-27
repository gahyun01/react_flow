import * as Node from "./Nodes";
// "./Nodes" 파일에서 모든 컴포넌트를 가져와서 `Node`라는 객체로 저장합니다.
// 이를 통해 `Node.Source`, `Node.Action` 등으로 접근할 수 있습니다.

export const nodeTypes = {
  // 다양한 노드 타입과 각각의 컴포넌트를 매핑하는 객체를 정의합니다.

  source: Node.Source,
  // "source" 타입의 노드는 `Node.Source` 컴포넌트와 연결됩니다.

  email: Node.Action,
  // "email" 타입의 노드는 `Node.Action` 컴포넌트와 연결됩니다.

  sms: Node.Action,
  // "sms" 타입의 노드도 `Node.Action` 컴포넌트와 동일하게 연결됩니다.

  waitThenCheck: Node.Condition,
  // "waitThenCheck" 타입의 노드는 `Node.Condition` 컴포넌트와 연결됩니다.

  end: Node.End,
  // "end" 타입의 노드는 `Node.End` 컴포넌트와 연결됩니다.

  empty: Node.Empty,
  // "empty" 타입의 노드는 `Node.Empty` 컴포넌트와 연결됩니다.
};
