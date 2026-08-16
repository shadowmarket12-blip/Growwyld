"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Industries", href: "/contact" },
  { name: "Our Works", href: "/contact" },
  { name: "Resources", href: "/contact" },
];

const servicesLinks = [
  { name: "Web Development", href: "#" },
  { name: "UI/UX Design", href: "#" },
  { name: "SEO", href: "#" },
  { name: "Branding", href: "#" },
  { name: "Marketing", href: "#" },
];

const socialLinks = [
  { icon: FaYoutube, href: "https://youtube.com/" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/" },
  { icon: FaInstagram, href: "https://instagram.com/" },
  { icon: FaGoogle, href: "https://wa.me/919876543210" },
  { icon: FaXTwitter, href: "https://x.com/" },
  { icon: FaFacebookF, href: "https://facebook.com/" },
];

const WHATSAPP_NUMBER = "919876543210";

/* ─── Three.js Background ───────────────────────────────────────────────── */
function FooterBackground() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* — Renderer — */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* — Scene & Camera — */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      el.clientWidth / el.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 35);

    /* — Floating particles (icosahedron wireframes) — */
    const geos = [
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.6, 0),
      new THREE.DodecahedronGeometry(0.5, 0),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
    ];
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const solidMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.05,
    });

    const shapes = [];
    // Spread shapes across entire footer - left, right, center all areas
    for (let i = 0; i < 45; i++) {
      const geo = geos[i % geos.length];
      const wire = new THREE.Mesh(geo, wireMat.clone());
      const solid = new THREE.Mesh(geo, solidMat.clone());
      const group = new THREE.Group();
      group.add(solid, wire);

      // Much wider spread to cover entire footer area
      const spreadX = 55;
      const spreadY = 32;
      // Distribute randomly across the entire width and height
      group.position.set(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        (Math.random() - 0.5) * 25 - 8,
      );
      const s = 0.4 + Math.random() * 1.8;
      group.scale.setScalar(s);

      group.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        floatSpeed: 0.0003 + Math.random() * 0.0007,
        floatAmp: 0.4 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: group.position.y,
      };
      scene.add(group);
      shapes.push(group);
    }

    /* — Additional shapes for left and right edges — */
    // Left side shapes
    for (let i = 0; i < 12; i++) {
      const geo = geos[i % geos.length];
      const wire = new THREE.Mesh(geo, wireMat.clone());
      const solid = new THREE.Mesh(geo, solidMat.clone());
      const group = new THREE.Group();
      group.add(solid, wire);

      group.position.set(
        -20 - Math.random() * 15,
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 20 - 5,
      );
      const s = 0.3 + Math.random() * 1.5;
      group.scale.setScalar(s);
      group.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        floatSpeed: 0.0003 + Math.random() * 0.0007,
        floatAmp: 0.4 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: group.position.y,
      };
      scene.add(group);
      shapes.push(group);
    }

    // Right side shapes
    for (let i = 0; i < 12; i++) {
      const geo = geos[i % geos.length];
      const wire = new THREE.Mesh(geo, wireMat.clone());
      const solid = new THREE.Mesh(geo, solidMat.clone());
      const group = new THREE.Group();
      group.add(solid, wire);

      group.position.set(
        20 + Math.random() * 15,
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 20 - 5,
      );
      const s = 0.3 + Math.random() * 1.5;
      group.scale.setScalar(s);
      group.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        floatSpeed: 0.0003 + Math.random() * 0.0007,
        floatAmp: 0.4 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: group.position.y,
      };
      scene.add(group);
      shapes.push(group);
    }

    /* — Soft glowing dots (point cloud) spread across entire area — */
    const dotCount = 400;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      dotPositions[i * 3] = (Math.random() - 0.5) * 80;
      dotPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      dotPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(dotGeo, dotMat));

    /* — Aurora planes for left and right edges — */
    const auroraData = [
      {
        color: 0x0369a1,
        x: -18,
        y: 4,
        z: -20,
        rx: -0.4,
        ry: 0.3,
        w: 25,
        h: 15,
      },
      {
        color: 0x0e7490,
        x: 18,
        y: -3,
        z: -24,
        rx: 0.3,
        ry: -0.4,
        w: 25,
        h: 14,
      },
      {
        color: 0x1e3a5f,
        x: 0,
        y: 0,
        z: -28,
        rx: 0.0,
        ry: 0.0,
        w: 45,
        h: 20,
      },
      {
        color: 0x0c4a6e,
        x: -25,
        y: -6,
        z: -22,
        rx: 0.2,
        ry: -0.2,
        w: 20,
        h: 12,
      },
      {
        color: 0x0c4a6e,
        x: 25,
        y: -6,
        z: -22,
        rx: 0.2,
        ry: 0.2,
        w: 20,
        h: 12,
      },
    ];
    auroraData.forEach(({ color, x, y, z, rx, ry, w, h }) => {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.06,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      plane.position.set(x, y, z);
      plane.rotation.set(rx, ry, 0);
      scene.add(plane);
    });

    /* — Mouse parallax — */
    const onMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    /* — Resize — */
    const onResize = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    /* — Animation loop — */
    let rafId;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      shapes.forEach((g) => {
        const {
          rotSpeedX,
          rotSpeedY,
          rotSpeedZ,
          floatSpeed,
          floatAmp,
          floatOffset,
          initialY,
        } = g.userData;
        g.rotation.x += rotSpeedX;
        g.rotation.y += rotSpeedY;
        g.rotation.z += rotSpeedZ || 0;
        g.position.y =
          initialY +
          Math.sin(t * floatSpeed * 1000 + floatOffset) * floatAmp * 0.004;
      });

      /* gentle camera parallax with wider movement */
      camera.position.x +=
        (mouseRef.current.x * 2.0 - camera.position.x) * 0.025;
      camera.position.y +=
        (-mouseRef.current.y * 1.2 - camera.position.y) * 0.025;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ─── Simple Link without Hover Effects ─────────────────────────────────── */
function SimpleLink({ name, href }) {
  return (
    <li>
      <Link href={href} className="text-white duration-200 inline-block py-1 ">
        {name}
      </Link>
    </li>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    const message = `Hello Growwyld 👋\n\nA new newsletter subscription.\n\nEmail: ${email}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setEmail("");
  };

  return (
    <footer className="relative mt-34 overflow-x-clip bg-[#091b2d] text-white">
      {/* ── 3D Animated Background ── */}
      <FooterBackground />

      {/* ── Radial glow overlays ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-sky-600/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/3 h-80 w-80 rounded-full bg-cyan-500/8 blur-[90px]" />
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-blue-800/15 blur-[80px]" />
        <div className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-indigo-600/5 blur-[80px]" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-purple-600/5 blur-[80px]" />
      </div>

      {/* ── Newsletter Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute left-4 right-4 top-0 z-10 mx-auto max-w-7xl -translate-y-1/2 rounded-3xl border border-white/10 bg-[#0d2233]/95 p-8 backdrop-blur-md sm:p-10 md:p-12 xl:left-1/2 xl:right-auto xl:w-[calc(100%-2rem)] xl:-translate-x-1/2"
      >
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="shrink-0">
            <h2 className="text-3xl font-bold">Join our Newsletter</h2>
            <p className="mt-2 text-white ">
              Get updates about new projects, articles and latest technology.
            </p>
          </div>
          <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 flex-1 rounded-xl border border-white/10 bg-white/5 px-5 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400"
            />
            <button
              onClick={handleSubscribe}
              className="h-14 rounded-xl bg-[#22C55E] px-8 font-semibold transition hover:scale-105 hover:bg-[#16A34A]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Main Footer ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-48 md:pt-52">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-w-0"
          >
            <div className="flex w-full items-start">
              <Image
                src="/GT full transparent logo.png"
                alt="Growwyld"
                width={500}
                height={500}
                className="h-56 w-auto max-w-full object-contain object-left"
              />
            </div>
          </motion.div>

          {/* Quick Links - No Hover Effects */}
          <div>
            <h3 className="mb-7 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <SimpleLink key={item.name} name={item.name} href={item.href} />
              ))}
            </ul>
          </div>

          {/* Services - No Hover Effects */}
          <div>
            <h3 className="mb-7 text-xl font-semibold text-white">Services</h3>
            <ul className="space-y-3 text-white">
              {servicesLinks.map((item) => (
                <SimpleLink key={item.name} name={item.name} href={item.href} />
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-7 text-xl font-semibold">Contact</h3>
            <div className="space-y-5 text-white">
              <div className="flex items-center gap-3">
                <HiOutlineMail className="shrink-0 text-xl text-white" />
                hello@growwyld.com
              </div>
              <div className="text-white font-poppins">
                Bengaluru, Karnataka
              </div>
            </div>

            {/* Social Icons — always one row */}
            <div className="mt-8 grid grid-cols-6 gap-2">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex aspect-square w-full items-center justify-center rounded-full border border-white/10 bg-white/5 text-base backdrop-blur-sm transition hover:border-white hover:bg-green-500 hover:text-black"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-10 pt-8 text-sm text-white">
          {/* Futuristic separator */}
          <div className="absolute left-0 top-0 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sky-400/50" />

            <div className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-sky-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
              <span className="h-1 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-sky-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
              <span className="h-1 w-1 rounded-full bg-sky-400" />
            </div>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sky-400/50" />
          </div>

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="font-poppins text-slate-300">
              © {new Date().getFullYear()} Growwyld. All Rights Reserved.
            </p>

            <div className="flex gap-8">
              <Link
                href="#"
                className="text-slate-300 transition-all duration-300 hover:text-sky-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-slate-300 transition-all duration-300 hover:text-sky-400"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
