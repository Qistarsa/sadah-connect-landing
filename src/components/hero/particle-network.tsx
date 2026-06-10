'use client';

import * as React from 'react';
import * as THREE from 'three';

/**
 * Animated "network constellation" background — drifting particles linked by
 * lines that fade with distance, with a subtle cursor-attraction. Rendered with
 * vanilla three.js into an absolutely-positioned, pointer-events-none layer so
 * it sits behind the hero copy without intercepting clicks.
 *
 * Performance / politeness:
 *  - paused when scrolled out of view (IntersectionObserver) or the tab is
 *    hidden (visibilitychange);
 *  - honours `prefers-reduced-motion` by painting a single static frame;
 *  - capped particle count + pixel ratio; disposes all GPU resources on unmount.
 */
export function ParticleNetwork({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;
    let aspect = width / height;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Orthographic world: y ∈ [-1, 1], x ∈ [-aspect, aspect]. Camera at origin.
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 100);
    camera.position.z = 10;

    // ── Particles ──────────────────────────────────────────────────────────
    const COUNT = Math.max(36, Math.min(120, Math.round((width * height) / 14000)));
    const LINK = 0.34; // world-unit distance under which two nodes connect
    const MOUSE_LINK = 0.46;
    const SPEED = 0.05; // world units / second

    const posX = new Float32Array(COUNT);
    const posY = new Float32Array(COUNT);
    const velX = new Float32Array(COUNT);
    const velY = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      posX[i] = (Math.random() * 2 - 1) * aspect;
      posY[i] = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      velX[i] = Math.cos(a) * SPEED;
      velY[i] = Math.sin(a) * SPEED;
    }

    const pointPos = new Float32Array(COUNT * 3);
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPos, 3));

    const pointMat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color('#7c3aed') },
        uSize: { value: 3.4 },
        uOpacity: { value: 0.9 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        uniform float uSize; uniform float uPixelRatio;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * uPixelRatio;
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform float uOpacity;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.18, d);
          gl_FragColor = vec4(uColor, a * uOpacity);
        }`,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    points.renderOrder = 1; // dots paint on top of the lines
    scene.add(points);

    // ── Links ──────────────────────────────────────────────────────────────
    const maxPairs = (COUNT * (COUNT - 1)) / 2 + COUNT; // + cursor links
    const linePos = new Float32Array(maxPairs * 2 * 3);
    const lineAlpha = new Float32Array(maxPairs * 2);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('aAlpha', new THREE.BufferAttribute(lineAlpha, 1));
    const lineMat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color('#7c3aed') },
        uOpacity: { value: 0.6 },
      },
      vertexShader: `
        attribute float aAlpha; varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform float uOpacity; varying float vAlpha;
        void main() { gl_FragColor = vec4(uColor, vAlpha * uOpacity); }`,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.renderOrder = 0;
    scene.add(lines);

    // ── Cursor ─────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, influence: 0, target: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      mouse.target = inside ? 1 : 0;
      if (inside) {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.x = nx * aspect;
        mouse.y = ny;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const writePoints = () => {
      for (let i = 0; i < COUNT; i++) {
        pointPos[i * 3] = posX[i];
        pointPos[i * 3 + 1] = posY[i];
        pointPos[i * 3 + 2] = 0;
      }
      (pointGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    };

    const buildLines = () => {
      let v = 0; // running vertex count
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = posX[i] - posX[j];
          const dy = posY[i] - posY[j];
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const a = 1 - dist / LINK;
            linePos[v * 3] = posX[i]; linePos[v * 3 + 1] = posY[i]; linePos[v * 3 + 2] = 0; lineAlpha[v] = a; v++;
            linePos[v * 3] = posX[j]; linePos[v * 3 + 1] = posY[j]; linePos[v * 3 + 2] = 0; lineAlpha[v] = a; v++;
          }
        }
      }
      if (mouse.influence > 0.01) {
        for (let i = 0; i < COUNT; i++) {
          const dx = posX[i] - mouse.x;
          const dy = posY[i] - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_LINK) {
            const a = (1 - dist / MOUSE_LINK) * mouse.influence;
            linePos[v * 3] = posX[i]; linePos[v * 3 + 1] = posY[i]; linePos[v * 3 + 2] = 0; lineAlpha[v] = a; v++;
            linePos[v * 3] = mouse.x; linePos[v * 3 + 1] = mouse.y; linePos[v * 3 + 2] = 0; lineAlpha[v] = a; v++;
          }
        }
      }
      lineGeo.setDrawRange(0, v);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    };

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const step = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      mouse.influence += (mouse.target - mouse.influence) * Math.min(1, dt * 4);
      for (let i = 0; i < COUNT; i++) {
        posX[i] += velX[i] * dt;
        posY[i] += velY[i] * dt;
        if (posX[i] > aspect) { posX[i] = aspect; velX[i] = -velX[i]; }
        if (posX[i] < -aspect) { posX[i] = -aspect; velX[i] = -velX[i]; }
        if (posY[i] > 1) { posY[i] = 1; velY[i] = -velY[i]; }
        if (posY[i] < -1) { posY[i] = -1; velY[i] = -velY[i]; }
      }
      writePoints();
      buildLines();
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // First paint (also the only paint under reduced-motion).
    writePoints();
    buildLines();
    renderer.render(scene, camera);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(() => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      aspect = width / height;
      camera.left = -aspect;
      camera.right = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      for (let i = 0; i < COUNT; i++) {
        if (posX[i] > aspect) posX[i] = aspect;
        if (posX[i] < -aspect) posX[i] = -aspect;
      }
      if (!running) {
        writePoints();
        buildLines();
        renderer.render(scene, camera);
      }
    });
    ro.observe(container);

    return () => {
      stop();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      ro.disconnect();
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden />;
}
