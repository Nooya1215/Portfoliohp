import React, { useEffect, useRef } from 'react';
import '../assets/css/Cursor.css';

export default function Cursor() {
  const circleRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const currentScale = useRef(0);
  const currentAngle = useRef(0);
  const speed = 0.37;

  useEffect(() => {
    const circleElement = circleRef.current;

    // 마우스 움직임 이벤트 핸들러
    function onMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;

    // 애니메이션 루프 함수
    function tick() {
      // 커서 위치 부드럽게 이동
      circle.current.x += (mouse.current.x - circle.current.x) * speed;
      circle.current.y += (mouse.current.y - circle.current.y) * speed;
      const translateTransform = `translate(${circle.current.x}px, ${circle.current.y}px)`;

      // 마우스 이동 변화량 계산
      const deltaMouseX = mouse.current.x - previousMouse.current.x;
      const deltaMouseY = mouse.current.y - previousMouse.current.y;
      previousMouse.current.x = mouse.current.x;
      previousMouse.current.y = mouse.current.y;

      // 마우스 속도 계산 (최대 150으로 제한)
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
      // 속도 기반 스케일 값 계산
      const scaleValue = (mouseVelocity / 150) * 0.5;
      // 현재 스케일 값 보간(부드러운 변화)
      currentScale.current += (scaleValue - currentScale.current) * speed;
      const scaleTransform = `scale(${1 + currentScale.current}, ${1 - currentScale.current})`;

      // 회전 각도 계산
      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
      if (mouseVelocity > 20) {
        currentAngle.current = angle;
      }
      const rotateTransform = `rotate(${currentAngle.current}deg)`;

      // 최종 변환 적용 (이동 -> 회전 -> 스케일)
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

      animationFrameId = window.requestAnimationFrame(tick);
    }

    tick();

    // 컴포넌트 언마운트 시 이벤트 제거 및 애니메이션 정리
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="circle" ref={circleRef} />
  );
}
