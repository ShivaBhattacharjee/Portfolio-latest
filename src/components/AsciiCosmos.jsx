"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

export default function AsciiCosmos() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);

    // ASCII Effect
    const effect = new AsciiEffect(renderer, " .:-+*=%@#", {
      invert: true,
      resolution: 0.15,
    });
    effect.setSize(container.clientWidth, container.clientHeight);
    effect.domElement.style.color = "hsl(var(--foreground))";
    effect.domElement.style.backgroundColor = "transparent";
    effect.domElement.style.fontSize = "6px";
    effect.domElement.style.lineHeight = "6px";
    effect.domElement.style.letterSpacing = "3px";
    container.appendChild(effect.domElement);

    // Lighting
    const pointLight1 = new THREE.PointLight(0xffffff, 3, 200);
    pointLight1.position.set(30, 30, 30);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 200);
    pointLight2.position.set(-30, -20, 20);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Main wormhole / cosmic portal - torus knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(12, 3.5, 128, 32);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.8,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    scene.add(torusKnot);

    // Orbiting asteroids
    const asteroids = [];
    const asteroidGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({
      roughness: 0.6,
      metalness: 0.4,
      flatShading: true,
    });

    for (let i = 0; i < 8; i++) {
      const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 22 + Math.random() * 6;
      const speed = 0.3 + Math.random() * 0.4;
      const yOffset = (Math.random() - 0.5) * 15;
      asteroids.push({ mesh: asteroid, angle, radius, speed, yOffset });
      scene.add(asteroid);
    }

    // Star field particles
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 300; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
      );
    }
    starsGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    const starsMat = new THREE.PointsMaterial({ size: 0.5 });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // Small moon orbiting close
    const moonGeo = new THREE.SphereGeometry(2, 16, 16);
    const moonMat = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0.2,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);

    setIsLoaded(true);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotate the cosmic knot
      torusKnot.rotation.x = t * 0.2;
      torusKnot.rotation.y = t * 0.3;
      torusKnot.rotation.z = t * 0.1;

      // Orbit asteroids
      asteroids.forEach((a) => {
        const currentAngle = a.angle + t * a.speed;
        a.mesh.position.x = Math.cos(currentAngle) * a.radius;
        a.mesh.position.z = Math.sin(currentAngle) * a.radius;
        a.mesh.position.y = a.yOffset + Math.sin(t * 0.5 + a.angle) * 3;
        a.mesh.rotation.x = t * 1.5;
        a.mesh.rotation.y = t * 2;
      });

      // Moon orbit
      moon.position.x = Math.cos(t * 0.6) * 18;
      moon.position.y = Math.sin(t * 0.4) * 10;
      moon.position.z = Math.sin(t * 0.6) * 18;

      // Gentle star rotation
      stars.rotation.y = t * 0.02;
      stars.rotation.x = t * 0.01;

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 8 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      effect.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      effect.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      cancelAnimationFrame(animId);
      effect.render(scene, camera);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(effect.domElement)) {
        container.removeChild(effect.domElement);
      }
      renderer.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      asteroidGeo.dispose();
      asteroidMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden"
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease-in" }}
    />
  );
}
