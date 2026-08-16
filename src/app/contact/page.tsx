// components/ContactPage.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Navigation,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!isMounted) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      lenis.destroy();
      window.removeEventListener("resize", checkDevice);
    };
  }, [isMounted]);

  // Helper to create glow texture
  const createGlowTexture = (color: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.2, color);
    gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  };

  // Multicolor Glowing 3D Background
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !isMounted) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);

    // Multicolor palette
    const colors = [
      "#a5fcc5", // Green
      "#3b82f6", // Blue
      "#8b5cf6", // Purple
      "#f59e0b", // Amber
      "#ef4444", // Red
      "#06b6d4", // Cyan
      "#ec4899", // Pink
      "#14b8a6", // Teal
    ];

    // Create glowing orbs
    const orbs: THREE.Mesh[] = [];
    const orbCount = isMobile ? 5 : isTablet ? 8 : 12;

    for (let i = 0; i < orbCount; i++) {
      const size = 0.3 + Math.random() * 0.8;
      const geometry = new THREE.SphereGeometry(size, 64, 64);
      const color = colors[Math.floor(Math.random() * colors.length)];

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.6 + Math.random() * 0.4,
        shininess: 100,
        specular: new THREE.Color(0xffffff),
        transparent: true,
        opacity: 0.7,
      });

      const orb = new THREE.Mesh(geometry, material);
      orb.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8 - 4,
      );

      orb.userData = {
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmplitude: 0.5 + Math.random() * 2,
        initialY: orb.position.y,
        initialX: orb.position.x,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        color: color,
        pulseSpeed: 0.5 + Math.random() * 1,
      };
      orbs.push(orb);
      scene.add(orb);
    }

    // Create glowing rings
    const glowingRings: THREE.Mesh[] = [];
    const ringCount = isMobile ? 4 : isTablet ? 6 : 10;

    for (let i = 0; i < ringCount; i++) {
      const geometry = new THREE.TorusGeometry(
        0.6 + Math.random() * 2,
        0.03 + Math.random() * 0.05,
        32,
        200,
      );
      const color = colors[Math.floor(Math.random() * colors.length)];

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.4 + Math.random() * 0.6,
        shininess: 120,
        specular: new THREE.Color(0xffffff),
        transparent: true,
        opacity: 0.5 + Math.random() * 0.3,
      });

      const ring = new THREE.Mesh(geometry, material);
      ring.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 3,
      );
      ring.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      ring.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015,
        },
        floatSpeed: 0.4 + Math.random() * 0.6,
        floatAmplitude: 0.5 + Math.random() * 1.5,
        initialY: ring.position.y,
        initialX: ring.position.x,
        color: color,
      };
      glowingRings.push(ring);
      scene.add(ring);
    }

    // Create glowing particles with glow texture
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 200 : isTablet ? 400 : 600;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 18;
      posArray[i + 1] = (Math.random() - 0.5) * 18;
      posArray[i + 2] = (Math.random() - 0.5) * 12 - 4;

      const color = new THREE.Color(
        colors[Math.floor(Math.random() * colors.length)],
      );
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
      sizesArray[i / 3] = Math.random() * 3;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3),
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizesArray, 1),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
      map: createGlowTexture("rgba(255,255,255,0.8)"),
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create floating crystal/diamond shapes
    const crystals: THREE.Mesh[] = [];
    const crystalCount = isMobile ? 3 : isTablet ? 5 : 8;
    const crystalGeometries = [
      new THREE.OctahedronGeometry(0.2, 0),
      new THREE.IcosahedronGeometry(0.2, 0),
      new THREE.DodecahedronGeometry(0.2, 0),
    ];

    for (let i = 0; i < crystalCount; i++) {
      const geometry =
        crystalGeometries[Math.floor(Math.random() * crystalGeometries.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.5,
        shininess: 200,
        specular: new THREE.Color(0xffffff),
        wireframe: Math.random() > 0.6,
        transparent: true,
        opacity: 0.6,
      });

      const crystal = new THREE.Mesh(geometry, material);
      crystal.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 4,
      );
      crystal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      crystal.scale.setScalar(0.5 + Math.random() * 2);

      crystal.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmplitude: 0.5 + Math.random() * 2,
        initialY: crystal.position.y,
        color: color,
      };
      crystals.push(crystal);
      scene.add(crystal);
    }

    // Create central glow sphere
    const centralGlowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const centralGlowMaterial = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.8,
      shininess: 150,
      specular: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.4,
    });
    const centralGlow = new THREE.Mesh(
      centralGlowGeometry,
      centralGlowMaterial,
    );
    centralGlow.position.set(0, 0, -2);
    scene.add(centralGlow);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Multicolor point lights
    const pointLights: THREE.PointLight[] = [];
    const lightColors = [
      0x22c55e, 0x3b82f6, 0x8b5cf6, 0xf59e0b, 0xef4444, 0x06b6d4,
    ];

    lightColors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 0.8, 15);
      const angle = (i / lightColors.length) * Math.PI * 2;
      light.position.set(
        Math.cos(angle) * 5,
        Math.sin(angle) * 3,
        Math.sin(angle) * 3,
      );
      pointLights.push(light);
      scene.add(light);
    });

    camera.position.z = 10;
    camera.position.y = 1;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      targetX += (mouseX * 0.3 - targetX) * 0.05;
      targetY += (mouseY * 0.3 - targetY) * 0.05;
      camera.position.x += (targetX * 2 - camera.position.x) * 0.03;
      camera.position.y += (targetY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Animate orbs with pulse
      orbs.forEach((orb) => {
        orb.rotation.x += orb.userData.rotationSpeed;
        orb.rotation.y += orb.userData.rotationSpeed * 0.7;
        orb.position.y =
          orb.userData.initialY +
          Math.sin(elapsedTime * orb.userData.floatSpeed) *
            orb.userData.floatAmplitude;
        orb.position.x =
          orb.userData.initialX +
          Math.cos(elapsedTime * orb.userData.floatSpeed * 0.7) *
            orb.userData.floatAmplitude *
            0.5;

        const pulse =
          1 + Math.sin(elapsedTime * orb.userData.pulseSpeed) * 0.15;
        orb.scale.setScalar(pulse);
        (orb.material as THREE.MeshPhongMaterial).emissiveIntensity =
          0.5 + Math.sin(elapsedTime * orb.userData.pulseSpeed) * 0.3;
      });

      // Animate glowing rings
      glowingRings.forEach((ring) => {
        ring.rotation.x += ring.userData.rotationSpeed.x;
        ring.rotation.y += ring.userData.rotationSpeed.y;
        ring.rotation.z += ring.userData.rotationSpeed.z;
        ring.position.y =
          ring.userData.initialY +
          Math.sin(elapsedTime * ring.userData.floatSpeed) *
            ring.userData.floatAmplitude;
        ring.position.x =
          ring.userData.initialX +
          Math.cos(elapsedTime * ring.userData.floatSpeed * 0.7) *
            ring.userData.floatAmplitude *
            0.5;
      });

      // Animate crystals
      crystals.forEach((crystal) => {
        crystal.rotation.x += crystal.userData.rotationSpeed.x;
        crystal.rotation.y += crystal.userData.rotationSpeed.y;
        crystal.rotation.z += crystal.userData.rotationSpeed.z;
        crystal.position.y =
          crystal.userData.initialY +
          Math.sin(elapsedTime * crystal.userData.floatSpeed) *
            crystal.userData.floatAmplitude;
      });

      // Animate central glow
      centralGlow.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.3);
      centralGlowMaterial.emissiveIntensity = 0.6 + Math.sin(elapsedTime) * 0.4;

      // Rotate particles
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      // Rotate point lights
      pointLights.forEach((light, i) => {
        const angle =
          (i / pointLights.length) * Math.PI * 2 + elapsedTime * 0.3;
        light.position.x = Math.cos(angle) * 5;
        light.position.z = Math.sin(angle) * 3;
        light.intensity = 0.5 + Math.sin(elapsedTime + i) * 0.3;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 250);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();

      // Cleanup all geometries and materials
      orbs.forEach((orb) => {
        orb.geometry.dispose();
        (orb.material as THREE.Material).dispose();
      });
      glowingRings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      crystals.forEach((crystal) => {
        crystal.geometry.dispose();
        (crystal.material as THREE.Material).dispose();
      });
      centralGlowGeometry.dispose();
      centralGlowMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      pointLights.forEach((light) => light.dispose());
    };
  }, [isMobile, isTablet, isMounted]);

  // GSAP Animations
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".hero-scroll", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1,
      });

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".info-item", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.from(".form-input", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".map-section", {
        scrollTrigger: {
          trigger: ".map-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, formRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    const mailtoLink = `mailto:hello@company.com?subject=${subject}&body=${body}`;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    gsap.to(".submit-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const locations = [
    {
      name: "Main Office",
      address: "Baramunda, Bhubaneswar",
      city: "Odisha",
      pin: "751003",
    },
  ];

  if (!isMounted) {
    return <div className="relative min-h-screen bg-white" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-white"
    >
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Contact Section */}
      <section className="contact-section relative z-10 container mx-auto px-4 pb-16 md:pb-24 pt-60">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* Left Column - Contact Info */}
            <div className="contact-card space-y-6 md:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
                  <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent">
                    Contact Us
                  </span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-xl max-w-md leading-relaxed">
                  Have a question or want to work together? We'd love to hear
                  from you and discuss your project.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <a
                  href="mailto:hello@company.com"
                  className="info-item group flex items-center space-x-3 md:space-x-4 p-4 md:p-5 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-700 font-semibold text-sm md:text-base flex items-center gap-2">
                      Email{" "}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      hello@company.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+15551234567"
                  className="info-item group flex items-center space-x-3 md:space-x-4 p-4 md:p-5 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-700 font-semibold text-sm md:text-base flex items-center gap-2">
                      Phone{" "}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </a>

                <div className="info-item group flex items-center space-x-3 md:space-x-4 p-4 md:p-5 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-700 font-semibold text-sm md:text-base">
                      Working Hours
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Twitter", "LinkedIn", "GitHub", "Instagram"].map(
                  (social) => (
                    <button
                      key={social}
                      className="text-green-600 hover:text-green-800 transition-all duration-300 text-xs md:text-sm font-medium px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 hover:scale-105"
                    >
                      {social}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="contact-card">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-5"
              >
                <div className="rounded-2xl p-5 md:p-8 border border-green-200 shadow-2xl bg-white">
                  <div className="space-y-4">
                    <div className="form-input">
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-sm md:text-base rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-input">
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-sm md:text-base rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="form-input">
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-sm md:text-base rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div className="form-input">
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 text-sm md:text-base rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project or question..."
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-btn w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-300"
                    >
                      <div className="relative px-6 py-3.5 rounded-xl transition-all duration-300 group-hover:bg-transparent bg-white/90">
                        <span className="flex items-center justify-center space-x-2 text-white font-semibold text-sm md:text-lg">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                              <span>Opening Email...</span>
                            </>
                          ) : isSubmitted ? (
                            <>
                              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                              <span>Email Client Opened!</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 md:w-5 md:h-5" />
                              <span>Send Message via Email</span>
                            </>
                          )}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Google Maps Style Map Section */}
          <div className="map-section mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent">
                  Our Location
                </span>
              </h2>
              <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
                Visit us at our office in Bhubaneswar
              </p>
            </div>

            {/* Google Maps-like Map Container */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
              {/* Map Background - light beige/green like Google Maps */}
              <div className="absolute inset-0 bg-[#e8f5e9]">
                {/* Grid pattern for roads */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(#1b5e20 1px, transparent 1px),
                      linear-gradient(90deg, #1b5e20 1px, transparent 1px),
                      linear-gradient(#2e7d32 1px, transparent 1px),
                      linear-gradient(90deg, #2e7d32 1px, transparent 1px)
                    `,
                    backgroundSize:
                      "100px 100px, 100px 100px, 20px 20px, 20px 20px",
                  }}
                />

                {/* Main roads */}
                <div className="absolute inset-0">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 800 600"
                    preserveAspectRatio="none"
                  >
                    {/* Highway */}
                    <path
                      d="M 0 300 L 800 300"
                      stroke="#fbbf24"
                      strokeWidth="8"
                      fill="none"
                      opacity="0.8"
                    />
                    <path
                      d="M 0 300 L 800 300"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="20,10"
                      opacity="0.6"
                    />

                    {/* Main roads */}
                    <path
                      d="M 400 0 L 400 600"
                      stroke="#ffffff"
                      strokeWidth="6"
                      fill="none"
                      opacity="0.9"
                    />
                    <path
                      d="M 200 0 L 200 600"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M 600 0 L 600 600"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M 0 150 L 800 150"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M 0 450 L 800 450"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    />

                    {/* Smaller streets */}
                    <path
                      d="M 100 0 L 100 300"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.4"
                    />
                    <path
                      d="M 300 300 L 300 600"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.4"
                    />
                    <path
                      d="M 500 0 L 500 300"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.4"
                    />
                    <path
                      d="M 700 300 L 700 600"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                </div>

                {/* Green areas (parks) */}
                <div className="absolute top-10 left-10 w-20 h-20 rounded-lg bg-green-200/60 border border-green-300/40" />
                <div className="absolute bottom-20 right-20 w-32 h-24 rounded-lg bg-green-200/60 border border-green-300/40" />
                <div className="absolute top-40 right-40 w-16 h-16 rounded-full bg-green-200/60 border border-green-300/40" />

                {/* Water body */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-100/40 border-t border-blue-200/40" />

                {/* Buildings */}
                <div className="absolute top-20 left-1/3 grid grid-cols-3 gap-1 opacity-40">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-8 bg-gray-400 rounded-t-sm"
                      style={{ height: `${6 + Math.random() * 6}px` }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-30 right-1/4 grid grid-cols-4 gap-1 opacity-40">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-6 bg-gray-400 rounded-t-sm"
                      style={{ height: `${5 + Math.random() * 5}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Location Pin - Center */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full cursor-pointer z-10"
                onClick={() => setActiveLocation(activeLocation === 0 ? -1 : 0)}
              >
                {/* Pulse ring */}
                <div className="absolute -inset-4 rounded-full bg-green-500/20 animate-ping" />
                <div
                  className="absolute -inset-8 rounded-full bg-green-500/10 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                />

                {/* Pin */}
                <div className="relative">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-6 bg-green-600 rounded-b-full" />
                </div>

                {/* Location label */}
                <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white rounded-lg shadow-lg px-4 py-2 text-center border border-gray-200">
                    <p className="font-semibold text-gray-800 text-sm">
                      Baramunda
                    </p>
                    <p className="text-xs text-gray-500">Bhubaneswar, Odisha</p>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      📍 Main Office
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45" />
                </div>
              </div>

              {/* Map controls (like Google Maps) */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg">
                  +
                </button>
                <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg">
                  −
                </button>
                <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Navigation className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Map footer info */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg shadow px-3 py-1.5 text-xs text-gray-600">
                <span>📍 Baramunda, Bhubaneswar, Odisha - 751003</span>
              </div>

              {/* Google Maps style footer */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-500">
                <span>Map data ©2024</span>
                <span className="border-l border-gray-300 pl-2">
                  Terms of Use
                </span>
              </div>
            </div>

            {/* Location Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {locations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeLocation === index
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200"
                      : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                  }`}
                >
                  {location.name}
                </button>
              ))}
              <a
                href="https://www.google.com/maps?q=20.2961,85.8245"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 transition-all duration-300 flex items-center gap-2"
              >
                <Navigation className="w-3 h-3" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
