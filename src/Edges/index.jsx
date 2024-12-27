import * as Edge from "./Edges";
// "./Edges" 파일 내의 모든 내보낸(exported) 모듈을 "Edge"라는 이름으로 가져옵니다.
// 이를 통해 "Edge" 객체를 사용하여 모듈의 특정 컴포넌트나 함수에 접근할 수 있습니다.

export const edgeTypes = {
  condition: Edge.Condition,
};
// edgeTypes라는 객체를 생성하고, 이를 외부로 내보냅니다(export).
// - "condition"이라는 키를 추가하고, "./Edges"에서 가져온 "Edge.Condition"을 해당 키의 값으로 설정.
// 이 객체는 특정한 타입의 간선(edge) 렌더링에 사용됩니다.
