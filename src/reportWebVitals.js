// 웹 성능 데이터를 측정하는 함수
const reportWebVitals = (onPerfEntry) => {
  // onPerfEntry가 존재하고, 그것이 함수일 경우에만 실행
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // web-vitals 라이브러리를 동적으로 불러옵니다.
    import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // CLS(Cumulative Layout Shift): 누적 레이아웃 이동 측정
        getCLS(onPerfEntry);
        // FID(First Input Delay): 첫 번째 사용자 입력 지연 시간 측정
        getFID(onPerfEntry);
        // FCP(First Contentful Paint): 첫 번째 콘텐츠 렌더링 시간 측정
        getFCP(onPerfEntry);
        // LCP(Largest Contentful Paint): 가장 큰 콘텐츠 렌더링 시간 측정
        getLCP(onPerfEntry);
        // TTFB(Time to First Byte): 첫 번째 바이트를 받기까지 걸리는 시간 측정
        getTTFB(onPerfEntry);
      }
    );
  }
};

// reportWebVitals 함수를 기본 내보내기로 설정
export default reportWebVitals;
