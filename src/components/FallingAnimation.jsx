"use client"
// components/FallingAnimation.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FallingAnimation = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 清除之前可能存在的元素
    containerRef.current.innerHTML = '';
    
    // 容器设置
    const container = containerRef.current;
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '300px';
    container.style.overflow = 'hidden';
    container.style.backgroundColor = '#f0f0f0';
    
    // 创建地面
    const ground = document.createElement('div');
    ground.style.position = 'absolute';
    ground.style.bottom = '0';
    ground.style.width = '100%';
    ground.style.height = '1px';
    ground.style.backgroundColor = '#333';
    container.appendChild(ground);
    
    // 创建多个掉落物体
    const createFallingObject = (index) => {
      // 随机属性
      const size = Math.floor(Math.random() * 40) + 20; // 20-60px
      const startX = Math.floor(Math.random() * (container.clientWidth - size));
      const startY = -100 - (index * 30); // 起始高度，错开掉落时间
      const color = `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;
      const duration = 1 + Math.random() * 2; // 掉落时间
      const bounceHeight = 100 + Math.random() * 200; // 反弹高度
      
      // 创建DOM元素
      const shape = document.createElement('div');
      shape.style.position = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.backgroundColor = color;
      shape.style.left = `${startX}px`;
      shape.style.top = `${startY}px`;
      
      // 随机形状：圆形、方形或三角形
      const shapeType = Math.floor(Math.random() * 3);
      if (shapeType === 0) {
        // 圆形
        shape.style.borderRadius = '50%';
      } else if (shapeType === 1) {
        // 方形已经是默认的
      } else {
        // 三角形
        shape.style.backgroundColor = 'transparent';
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size/2}px solid transparent`;
        shape.style.borderRight = `${size/2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid ${color}`;
      }
      
      container.appendChild(shape);
      
      // 计算底部位置（考虑元素高度）
      const bottomPosition = container.clientHeight - size - 20; // 20是地面高度
      
      // 使用GSAP创建掉落和反弹动画
      const tl = gsap.timeline({
        repeat: 0,
        onComplete: () => {
          // 保持在底部或稍微随机移动
          gsap.to(shape, {
            x: `+=${Math.random() * 40 - 20}`,
            rotation: Math.random() * 20 - 10,
            duration: 2,
            ease: "power1.inOut"
          });
        }
      });
      
      // 掉落动画
      tl.to(shape, {
        y: bottomPosition,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "power1.in"
      })
      // 反弹动画（多次反弹，每次高度减小）
      .to(shape, {
        y: bottomPosition - bounceHeight,
        duration: duration * 0.4,
        ease: "power2.out"
      })
      .to(shape, {
        y: bottomPosition,
        duration: duration * 0.3,
        ease: "power2.in"
      })
      .to(shape, {
        y: bottomPosition - bounceHeight * 0.5,
        duration: duration * 0.3,
        ease: "power2.out"
      })
      .to(shape, {
        y: bottomPosition,
        duration: duration * 0.2,
        ease: "power2.in"
      })
      .to(shape, {
        y: bottomPosition - bounceHeight * 0.2,
        duration: duration * 0.2,
        ease: "power2.out"
      })
      .to(shape, {
        y: bottomPosition,
        duration: duration * 0.1,
        ease: "power2.in"
      });
      
      // 添加旋转效果
      gsap.to(shape, {
        rotation: Math.random() * 720 - 360,
        duration: duration * 1.5,
        ease: "power1.inOut"
      });
      
      return shape;
    };
    
    // 创建多个掉落物体
    const totalObjects = 15;
    const objects = [];
    
    for (let i = 0; i < totalObjects; i++) {
      setTimeout(() => {
        objects.push(createFallingObject(i));
      }, i * 300); // 每300ms创建一个新物体
    }
    
    return () => {
      // 清理动画
      objects.forEach(obj => {
        gsap.killTweensOf(obj);
      });
    };
  }, []);
  
  return (
    <div ref={containerRef} className="falling-animation-container"></div>
  );
};

export default FallingAnimation;