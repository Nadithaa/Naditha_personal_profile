import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ScrollDrone: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    // 2. Realistic 3D Scene Lighting
    // Ambient fill light for overall visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Warm key sunlight from top-right creating crisp specular highlights on brass & canopy
    const keyLight = new THREE.DirectionalLight(0xfff5eb, 3.2);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    // Cool cyan/sky rim light from bottom-left for sci-fi contrast & edge illumination
    const rimLight = new THREE.DirectionalLight(0x06b6d4, 2.0);
    rimLight.position.set(-6, -4, 5);
    scene.add(rimLight);

    // Top fill light
    const topLight = new THREE.DirectionalLight(0xdbeafe, 1.0);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    // 3. Hierarchy: scene > flight (position, scale) > droneRoot (roll, pitch, yaw) > 3D Model
    const flight = new THREE.Group();
    scene.add(flight);

    const droneRoot = new THREE.Group();
    // Default initial tilt so the top surface, circular ducts, and front optics are visible
    droneRoot.rotation.x = THREE.MathUtils.degToRad(18);
    flight.add(droneRoot);

    // Subtle cyan under-chassis point light
    const thrusterLight = new THREE.PointLight(0x00f0ff, 1.8, 3.5);
    thrusterLight.position.set(0, -0.2, 0);
    droneRoot.add(thrusterLight);

    // Array to track disposables
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
    const regGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposables.push(g);
      return g;
    };
    const regMat = <T extends THREE.Material>(m: T): T => {
      disposables.push(m);
      return m;
    };

    // 4. Meticulous PBR Materials Matching the Artisan Papercraft Palette
    const matTerracotta = regMat(
      new THREE.MeshStandardMaterial({
        color: 0xc85a2b,
        roughness: 0.38,
        metalness: 0.15,
      })
    );

    const matCream = regMat(
      new THREE.MeshStandardMaterial({
        color: 0xf5eee3,
        roughness: 0.42,
        metalness: 0.1,
      })
    );

    const matTeal = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x0d747d,
        roughness: 0.32,
        metalness: 0.25,
      })
    );

    const matBrass = regMat(
      new THREE.MeshStandardMaterial({
        color: 0xdfaa32,
        roughness: 0.22,
        metalness: 0.88,
      })
    );

    const matChassis = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x22252a,
        roughness: 0.45,
        metalness: 0.65,
      })
    );

    const matCarbon = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x14161a,
        roughness: 0.6,
        metalness: 0.4,
      })
    );

    const matLens = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x03070d,
        roughness: 0.06,
        metalness: 0.95,
      })
    );

    const matPropeller = regMat(
      new THREE.MeshStandardMaterial({
        color: 0xefe3d3,
        roughness: 0.32,
        metalness: 0.12,
        transparent: true,
        opacity: 0.95,
      })
    );

    const matPropBlur = regMat(
      new THREE.MeshBasicMaterial({
        color: 0xefe3d3,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );

    const matGlowCyan = regMat(
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
      })
    );

    const matNavRed = regMat(
      new THREE.MeshBasicMaterial({
        color: 0xef4444,
      })
    );

    const matNavGreen = regMat(
      new THREE.MeshBasicMaterial({
        color: 0x22c55e,
      })
    );

    // 5. Build True 3D Quadcopter Geometry

    // A) Central Fuselage Pod
    const fuselageGroup = new THREE.Group();
    droneRoot.add(fuselageGroup);

    // Main sculpted hull
    const hullGeo = regGeo(new THREE.SphereGeometry(0.36, 20, 16));
    const hullMesh = new THREE.Mesh(hullGeo, matTerracotta);
    hullMesh.scale.set(0.85, 0.48, 1.35);
    fuselageGroup.add(hullMesh);

    // Dark structural bottom chassis plate
    const bottomPlateGeo = regGeo(new THREE.BoxGeometry(0.48, 0.08, 0.9));
    const bottomPlateMesh = new THREE.Mesh(bottomPlateGeo, matChassis);
    bottomPlateMesh.position.set(0, -0.12, 0);
    fuselageGroup.add(bottomPlateMesh);

    // Upper Ivory/Cream Cockpit Cover
    const cockpitGeo = regGeo(new THREE.BoxGeometry(0.32, 0.06, 0.72));
    const cockpitMesh = new THREE.Mesh(cockpitGeo, matCream);
    cockpitMesh.position.set(0, 0.16, 0.02);
    fuselageGroup.add(cockpitMesh);

    // Center Aerodynamic Teal Racing Stripe
    const stripeGeo = regGeo(new THREE.BoxGeometry(0.11, 0.07, 0.73));
    const stripeMesh = new THREE.Mesh(stripeGeo, matTeal);
    stripeMesh.position.set(0, 0.165, 0.02);
    fuselageGroup.add(stripeMesh);

    // Brass Center Medallion / Crest
    const crestGeo = regGeo(new THREE.CylinderGeometry(0.065, 0.065, 0.025, 20));
    const crestMesh = new THREE.Mesh(crestGeo, matBrass);
    crestMesh.position.set(0, 0.198, 0.02);
    fuselageGroup.add(crestMesh);

    // Dual Top Rear Telemetry Antennas
    const antennaGeo = regGeo(new THREE.CylinderGeometry(0.007, 0.009, 0.28, 8));
    const ant1 = new THREE.Mesh(antennaGeo, matBrass);
    ant1.position.set(-0.08, 0.26, -0.2);
    ant1.rotation.set(-0.45, 0, -0.22);
    fuselageGroup.add(ant1);

    const ant2 = new THREE.Mesh(antennaGeo, matBrass);
    ant2.position.set(0.08, 0.26, -0.2);
    ant2.rotation.set(-0.45, 0, 0.22);
    fuselageGroup.add(ant2);

    // Dual Forward Stereoscopic Vision Sensor Eyes (Brass bezels + glass lenses)
    const eyeRingGeo = regGeo(new THREE.TorusGeometry(0.052, 0.013, 8, 20));
    const eyeLensGeo = regGeo(new THREE.SphereGeometry(0.046, 14, 14));

    const eyeLBezel = new THREE.Mesh(eyeRingGeo, matBrass);
    eyeLBezel.position.set(-0.095, 0.06, 0.46);
    fuselageGroup.add(eyeLBezel);

    const eyeLLens = new THREE.Mesh(eyeLensGeo, matLens);
    eyeLLens.position.set(-0.095, 0.06, 0.44);
    fuselageGroup.add(eyeLLens);

    const eyeRBezel = new THREE.Mesh(eyeRingGeo, matBrass);
    eyeRBezel.position.set(0.095, 0.06, 0.46);
    fuselageGroup.add(eyeRBezel);

    const eyeRLens = new THREE.Mesh(eyeLensGeo, matLens);
    eyeRLens.position.set(0.095, 0.06, 0.44);
    fuselageGroup.add(eyeRLens);

    // Lower Forward 4K Camera Gimbal Assembly (Tracks mouse cursor)
    const gimbalGroup = new THREE.Group();
    gimbalGroup.position.set(0, -0.15, 0.42);
    fuselageGroup.add(gimbalGroup);

    // Gimbal Yoke Mounting Bracket
    const yokeGeo = regGeo(new THREE.TorusGeometry(0.09, 0.014, 8, 20, Math.PI));
    const yokeMesh = new THREE.Mesh(yokeGeo, matBrass);
    yokeMesh.rotation.set(0, 0, Math.PI);
    gimbalGroup.add(yokeMesh);

    // Camera Sphere Body
    const camGeo = regGeo(new THREE.SphereGeometry(0.075, 16, 16));
    const camMesh = new THREE.Mesh(camGeo, matChassis);
    gimbalGroup.add(camMesh);

    // Front Brass Lens Housing
    const lensRingGeo = regGeo(new THREE.TorusGeometry(0.06, 0.012, 8, 20));
    const lensRingMesh = new THREE.Mesh(lensRingGeo, matBrass);
    lensRingMesh.position.set(0, 0, 0.065);
    gimbalGroup.add(lensRingMesh);

    // Dark Glass Aperture
    const lensMesh = new THREE.Mesh(regGeo(new THREE.SphereGeometry(0.055, 14, 14)), matLens);
    lensMesh.position.set(0, 0, 0.055);
    gimbalGroup.add(lensMesh);

    // Emissive Cyan Sensor Ring
    const apertureGeo = regGeo(new THREE.RingGeometry(0.024, 0.038, 16));
    const apertureMesh = new THREE.Mesh(apertureGeo, matGlowCyan);
    apertureMesh.position.set(0, 0, 0.072);
    gimbalGroup.add(apertureMesh);

    // Rear Battery Compartment & Heatsink Fins
    const batteryGeo = regGeo(new THREE.BoxGeometry(0.34, 0.22, 0.32));
    const batteryMesh = new THREE.Mesh(batteryGeo, matChassis);
    batteryMesh.position.set(0, 0.02, -0.42);
    fuselageGroup.add(batteryMesh);

    // Cooling Ribs
    for (let f = 0; f < 3; f++) {
      const ribGeo = regGeo(new THREE.BoxGeometry(0.36, 0.02, 0.3));
      const ribMesh = new THREE.Mesh(ribGeo, matBrass);
      ribMesh.position.set(0, -0.05 + f * 0.06, -0.42);
      fuselageGroup.add(ribMesh);
    }

    // Rear Status Beacon LED
    const beaconGeo = regGeo(new THREE.SphereGeometry(0.032, 10, 10));
    const beaconMesh = new THREE.Mesh(beaconGeo, matGlowCyan);
    beaconMesh.position.set(0, 0.04, -0.59);
    fuselageGroup.add(beaconMesh);

    // Lower Tubular Landing Skids
    const skidGeo = regGeo(new THREE.CylinderGeometry(0.014, 0.014, 0.72, 8));
    const skidL = new THREE.Mesh(skidGeo, matBrass);
    skidL.rotation.set(Math.PI / 2, 0, 0);
    skidL.position.set(-0.22, -0.24, 0);
    fuselageGroup.add(skidL);

    const skidR = new THREE.Mesh(skidGeo, matBrass);
    skidR.rotation.set(Math.PI / 2, 0, 0);
    skidR.position.set(0.22, -0.24, 0);
    fuselageGroup.add(skidR);

    // B) 4 Quadcopter Arms with CineWhoop / Artisan Propeller Ducts
    interface PropEntry {
      group: THREE.Group;
      dir: number; // 1 = CW, -1 = CCW
    }
    const propEntries: PropEntry[] = [];

    const ARM_CONFIGS = [
      { id: 'FL', x: -0.72, y: 0.03, z: 0.52, dir: 1, navMat: matNavRed },
      { id: 'FR', x: 0.72, y: 0.03, z: 0.52, dir: -1, navMat: matNavGreen },
      { id: 'RL', x: -0.76, y: 0.06, z: -0.52, dir: -1, navMat: matGlowCyan },
      { id: 'RR', x: 0.76, y: 0.06, z: -0.52, dir: 1, navMat: matGlowCyan },
    ];

    ARM_CONFIGS.forEach((cfg) => {
      const armGroup = new THREE.Group();
      droneRoot.add(armGroup);

      // Arm Structural Beam connecting fuselage center to motor
      const armLen = Math.sqrt(cfg.x * cfg.x + cfg.z * cfg.z);
      const armAngle = Math.atan2(cfg.x, cfg.z);

      const beamGeo = regGeo(new THREE.BoxGeometry(0.065, 0.04, armLen));
      const beamMesh = new THREE.Mesh(beamGeo, matTerracotta);
      beamMesh.position.set(cfg.x * 0.5, cfg.y * 0.5, cfg.z * 0.5);
      beamMesh.rotation.y = armAngle;
      armGroup.add(beamMesh);

      // Lower Carbon Reinforcement Flange
      const flangeGeo = regGeo(new THREE.BoxGeometry(0.08, 0.015, armLen * 0.85));
      const flangeMesh = new THREE.Mesh(flangeGeo, matCarbon);
      flangeMesh.position.set(cfg.x * 0.45, cfg.y * 0.5 - 0.022, cfg.z * 0.45);
      flangeMesh.rotation.y = armAngle;
      armGroup.add(flangeMesh);

      // Distinctive Circular Propeller Guard / Duct Ring (from uploaded artisan drone!)
      const ductGroup = new THREE.Group();
      ductGroup.position.set(cfg.x, cfg.y, cfg.z);
      armGroup.add(ductGroup);

      // Outer Aerodynamic Teal Cowl Ring
      const ductCowlGeo = regGeo(new THREE.CylinderGeometry(0.44, 0.44, 0.13, 28, 1, true));
      const ductCowlMat = regMat(
        new THREE.MeshStandardMaterial({
          color: 0x0d747d,
          roughness: 0.35,
          metalness: 0.2,
          side: THREE.DoubleSide,
        })
      );
      const ductCowl = new THREE.Mesh(ductCowlGeo, ductCowlMat);
      ductGroup.add(ductCowl);

      // Top Brass Lip Rim
      const topRimGeo = regGeo(new THREE.TorusGeometry(0.44, 0.018, 8, 28));
      const topRim = new THREE.Mesh(topRimGeo, matBrass);
      topRim.rotation.x = Math.PI / 2;
      topRim.position.y = 0.065;
      ductGroup.add(topRim);

      // Bottom Terracotta Lip Rim
      const botRimGeo = regGeo(new THREE.TorusGeometry(0.44, 0.016, 8, 28));
      const botRim = new THREE.Mesh(botRimGeo, matTerracotta);
      botRim.rotation.x = Math.PI / 2;
      botRim.position.y = -0.065;
      ductGroup.add(botRim);

      // 3 Radial Aerofoil Spokes connecting motor to duct rim
      for (let s = 0; s < 3; s++) {
        const spokeAngle = (s * Math.PI * 2) / 3;
        const spokeGeo = regGeo(new THREE.BoxGeometry(0.40, 0.016, 0.035));
        const spokeMesh = new THREE.Mesh(spokeGeo, matCream);
        spokeMesh.position.set(Math.cos(spokeAngle) * 0.2, 0, Math.sin(spokeAngle) * 0.2);
        spokeMesh.rotation.y = -spokeAngle;
        ductGroup.add(spokeMesh);
      }

      // Outer Navigation LED
      const navGeo = regGeo(new THREE.SphereGeometry(0.026, 8, 8));
      const navMesh = new THREE.Mesh(navGeo, cfg.navMat);
      const navAngle = Math.atan2(cfg.z, cfg.x);
      navMesh.position.set(Math.cos(navAngle) * 0.45, 0.02, Math.sin(navAngle) * 0.45);
      ductGroup.add(navMesh);

      // Center Brushless Motor Bell
      const motorGeo = regGeo(new THREE.CylinderGeometry(0.08, 0.08, 0.11, 18));
      const motorMesh = new THREE.Mesh(motorGeo, matChassis);
      motorMesh.position.y = 0.01;
      ductGroup.add(motorMesh);

      // Brass Motor Top Cap & Prop Nut
      const capGeo = regGeo(new THREE.CylinderGeometry(0.045, 0.075, 0.035, 18));
      const capMesh = new THREE.Mesh(capGeo, matBrass);
      capMesh.position.y = 0.075;
      ductGroup.add(capMesh);

      const nutGeo = regGeo(new THREE.ConeGeometry(0.035, 0.045, 12));
      const nutMesh = new THREE.Mesh(nutGeo, matBrass);
      nutMesh.position.y = 0.105;
      ductGroup.add(nutMesh);

      // C) Real Spinning Propeller (3 aerodynamic blades)
      const propGroup = new THREE.Group();
      propGroup.position.set(0, 0.085, 0);
      ductGroup.add(propGroup);

      // 3 Blades spaced at 120 degrees
      for (let b = 0; b < 3; b++) {
        const bladeAngle = (b * Math.PI * 2) / 3;
        const bladeGeo = regGeo(new THREE.BoxGeometry(0.36, 0.012, 0.055));
        const bladeMesh = new THREE.Mesh(bladeGeo, matPropeller);
        bladeMesh.position.set(Math.cos(bladeAngle) * 0.18, 0, Math.sin(bladeAngle) * 0.18);
        bladeMesh.rotation.y = -bladeAngle;
        bladeMesh.rotation.z = 0.16 * cfg.dir; // aerodynamic blade pitch
        propGroup.add(bladeMesh);
      }

      // High-speed Propeller Motion Blur Disc
      const blurGeo = regGeo(new THREE.CircleGeometry(0.39, 24));
      const blurMesh = new THREE.Mesh(blurGeo, matPropBlur);
      blurMesh.rotation.x = -Math.PI / 2;
      blurMesh.position.y = 0.005;
      propGroup.add(blurMesh);

      propEntries.push({ group: propGroup, dir: cfg.dir });
    });

    // C) Soft Ambient Drop Shadow Plane below drone
    // Creates a radial gradient shadow canvas texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    disposables.push(shadowTexture);

    const shadowPlaneGeo = regGeo(new THREE.PlaneGeometry(2.4, 2.4));
    const shadowMat = regMat(
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowMat);
    shadowMesh.position.set(0.12, -0.4, -0.15);
    droneRoot.add(shadowMesh);

    // Helper: Compute exact pixel size matching a large landing page headline letter
    const getLetterSizePx = (w: number, h: number): number => {
      const u = Math.min(w / 1280, h / 760);
      return Math.min(Math.max(65 * u, 44), 80);
    };

    // 6. Scroll-Driven Flight Keyframes (Safely in side gutters away from centered text)
    const K_DESKTOP = [
      { side: 1, y: 0.22, s: 1.0, yaw: -10, pitch: 5, roll: -3 },   // Hero (clear starfield to the right of headline)
      { side: 1, y: 0.15, s: 1.0, yaw: -12, pitch: 6, roll: -4 },   // About Me (clear right gutter)
      { side: -1, y: -0.05, s: 1.0, yaw: 12, pitch: 5, roll: 4 },   // Metrics Strip (clear left gutter)
      { side: -1, y: 0.05, s: 1.0, yaw: 10, pitch: 4, roll: 3 },    // Tagline Reveal (clear left gutter)
      { side: 1, y: -0.15, s: 1.0, yaw: -14, pitch: -4, roll: -5 }, // Featured Projects (clear right gutter)
      { side: 1, y: 0.08, s: 1.0, yaw: -10, pitch: 6, roll: -3 },   // Engineering Process (clear right gutter)
      { side: 1, y: -0.05, s: 1.0, yaw: -10, pitch: 4, roll: -3 },  // Technical Skills (clear right gutter)
      { side: 1, y: 0.04, s: 1.0, yaw: -8, pitch: 4, roll: -2 },    // FAQ (clear right gutter)
      { side: 1, y: 0.18, s: 1.0, yaw: -6, pitch: 2, roll: 0 },     // Contact & Footer (upper right margin)
    ];

    const K_MOBILE = [
      { side: 1, y: 0.58, s: 1.0, yaw: -6, pitch: 4, roll: -3 },   // Hero (upper-right clear space above headline)
      { side: 1, y: 0.38, s: 1.0, yaw: -8, pitch: 6, roll: -4 },   // About Me
      { side: -1, y: 0.38, s: 1.0, yaw: 8, pitch: 5, roll: 4 },    // Metrics Strip
      { side: -1, y: 0.35, s: 1.0, yaw: 6, pitch: 4, roll: 3 },    // Tagline Reveal
      { side: 1, y: 0.30, s: 1.0, yaw: -10, pitch: -4, roll: -5 }, // Featured Projects
      { side: 1, y: 0.32, s: 1.0, yaw: -8, pitch: 6, roll: -4 },   // Engineering Process
      { side: 1, y: 0.30, s: 1.0, yaw: -6, pitch: 4, roll: -3 },   // Technical Skills
      { side: 1, y: 0.30, s: 1.0, yaw: -4, pitch: 4, roll: -2 },   // FAQ
      { side: 1, y: 0.36, s: 1.0, yaw: -4, pitch: 2, roll: 0 },    // Contact & Footer
    ];

    const getGutterX = (side: number, isMobile: boolean) => {
      if (isMobile) return side * 0.36;
      const w = window.innerWidth;
      if (w > 1600) return side * 0.74;
      if (w > 1350) return side * 0.68;
      return side * 0.60;
    };

    const ease = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const lerp = (a: number, b: number, t: number): number => {
      return a + (b - a) * t;
    };

    const lerpAngle = (a: number, b: number, t: number): number => {
      const d = ((b - a + 540) % 360) - 180;
      return a + d * t;
    };

    const clamp = (v: number, min: number, max: number): number => {
      return Math.min(max, Math.max(min, v));
    };

    const targetAt = (p: number, isMobile: boolean) => {
      const K = isMobile ? K_MOBILE : K_DESKTOP;
      const clampedP = clamp(p, 0, K.length - 1);
      const i = Math.min(K.length - 2, Math.floor(clampedP));
      const f = clampedP - i;

      const t = ease(clamp((f - 0.12) / 0.76, 0, 1));
      const k1 = K[i];
      const k2 = K[i + 1];

      const x1 = getGutterX(k1.side, isMobile);
      const x2 = getGutterX(k2.side, isMobile);

      return {
        x: lerp(x1, x2, t),
        y: lerp(k1.y, k2.y, t),
        s: lerp(k1.s, k2.s, t),
        pitch: lerp(k1.pitch, k2.pitch, t),
        roll: lerp(k1.roll, k2.roll, t),
        yaw: lerpAngle(k1.yaw, k2.yaw, t),
        moving: Math.sin(t * Math.PI),
      };
    };

    // 7. Active Letter Obstruction Avoidance Engine
    let textRects: DOMRect[] = [];
    let lastScanTime = 0;

    const scanVisibleTextRects = () => {
      const elements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, a, button, span, div, li, code, label, [data-text]'
      );
      const rects: DOMRect[] = [];
      const viewH = window.innerHeight;
      const viewW = window.innerWidth;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        if (el.id === 'drone-canvas' || el.closest('#drone-canvas')) continue;
        if (el.children.length > 4) continue;

        const text = el.textContent?.trim();
        if (!text || text.length === 0) continue;

        const r = el.getBoundingClientRect();
        if (
          r.width > 2 &&
          r.height > 2 &&
          r.bottom > 0 &&
          r.top < viewH &&
          r.right > 0 &&
          r.left < viewW &&
          r.width < viewW * 0.95 &&
          r.height < viewH * 0.95
        ) {
          rects.push(r);
        }
      }
      textRects = rects;
    };

    window.addEventListener('scroll', scanVisibleTextRects, { passive: true });
    window.addEventListener('resize', scanVisibleTextRects, { passive: true });
    scanVisibleTextRects();

    // Tracking state
    const cur = {
      x: getGutterX(K_DESKTOP[0].side, false),
      y: K_DESKTOP[0].y,
      s: K_DESKTOP[0].s,
      yaw: K_DESKTOP[0].yaw,
      pitch: K_DESKTOP[0].pitch,
      roll: K_DESKTOP[0].roll,
      moving: 0,
    };
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const avoidOffset = { x: 0, y: 0 };
    let lastTime = performance.now();
    const startTime = performance.now();

    const handlePointerMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      scanVisibleTextRects();
    };

    canvas.style.opacity = '1';

    // 8. 60 FPS Real-time Render & Physics Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = (now - startTime) / 1000;

      // Rescan text elements periodically
      if (now - lastScanTime > 100) {
        lastScanTime = now;
        scanVisibleTextRects();
      }

      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const isMobile = window.innerWidth < 760;
      const totalSteps = (isMobile ? K_MOBILE.length : K_DESKTOP.length) - 1;
      const progress = (window.scrollY / scrollMax) * totalSteps;

      const target = targetAt(progress, isMobile);

      const prevX = cur.x;
      const prevY = cur.y;

      const kLag = 1 - Math.exp(-dt * 3.2);
      cur.x = lerp(cur.x, target.x, kLag);
      cur.y = lerp(cur.y, target.y, kLag);
      cur.s = lerp(cur.s, target.s, kLag);
      cur.pitch = lerp(cur.pitch, target.pitch, kLag);
      cur.roll = lerp(cur.roll, target.roll, kLag);
      cur.yaw = lerpAngle(cur.yaw, target.yaw, 1 - Math.exp(-dt * 2.6));
      cur.moving = target.moving;

      const vx = (cur.x - prevX) / dt;
      const vy = (cur.y - prevY) / dt;

      mouse.sx = lerp(mouse.sx, mouse.x, 1 - Math.exp(-dt * 2.0));
      mouse.sy = lerp(mouse.sy, mouse.y, 1 - Math.exp(-dt * 2.0));

      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;

      // Natural organic hovering bobbing
      const hover = Math.sin(t * 2.1) * 0.025 + Math.sin(t * 3.7) * 0.008;

      // Dynamic scale matching the exact size of a large landing page headline letter
      const letterSizePx = getLetterSizePx(window.innerWidth, window.innerHeight);
      const frustumH = halfH * 2;
      // Normalizing model width ~2.2 units
      const droneScale = (letterSizePx / window.innerHeight) * (frustumH / 2.2) * cur.s;
      flight.scale.set(droneScale, droneScale, droneScale);

      // Base flight position
      const baseX = cur.x * halfW + Math.sin(t * 1.3) * 0.015 + mouse.sx * 0.05;
      const baseY = cur.y * halfH + hover * halfH * 0.35 + mouse.sy * 0.03;

      // Projected screen coordinates of candidate drone position (in viewport pixels)
      const candPxX = (baseX / halfW + 1) * 0.5 * window.innerWidth;
      const candPxY = (1 - baseY / halfH) * 0.5 * window.innerHeight;
      const droneRadiusPx = letterSizePx * 0.5 + 12; // 12px clear-space buffer

      // Obstruction Avoidance against all visible text elements
      let targetPushX = 0;
      let targetPushY = 0;

      for (let i = 0; i < textRects.length; i++) {
        const r = textRects[i];
        const closestX = clamp(candPxX, r.left, r.right);
        const closestY = clamp(candPxY, r.top, r.bottom);
        const distX = candPxX - closestX;
        const distY = candPxY - closestY;
        const distSq = distX * distX + distY * distY;

        if (distSq < droneRadiusPx * droneRadiusPx) {
          const isRightSide = candPxX > window.innerWidth * 0.5;

          if (isRightSide) {
            const pushRight = r.right + droneRadiusPx + 16 - candPxX;
            if (candPxX + pushRight < window.innerWidth - 10) {
              targetPushX = Math.max(targetPushX, pushRight);
            } else {
              const pushTop = r.top - droneRadiusPx - 16 - candPxY;
              const pushBottom = r.bottom + droneRadiusPx + 16 - candPxY;
              targetPushY =
                Math.abs(pushTop) < Math.abs(pushBottom)
                  ? Math.min(targetPushY, pushTop)
                  : Math.max(targetPushY, pushBottom);
            }
          } else {
            const pushLeft = r.left - droneRadiusPx - 16 - candPxX;
            if (candPxX + pushLeft > 10) {
              targetPushX = Math.min(targetPushX, pushLeft);
            } else {
              const pushTop = r.top - droneRadiusPx - 16 - candPxY;
              const pushBottom = r.bottom + droneRadiusPx + 16 - candPxY;
              targetPushY =
                Math.abs(pushTop) < Math.abs(pushBottom)
                  ? Math.min(targetPushY, pushTop)
                  : Math.max(targetPushY, pushBottom);
            }
          }
        }
      }

      // Smoothly interpolate avoidance displacement
      avoidOffset.x = lerp(avoidOffset.x, targetPushX, 1 - Math.exp(-dt * 12));
      avoidOffset.y = lerp(avoidOffset.y, targetPushY, 1 - Math.exp(-dt * 12));

      // Convert pixel avoidance offset to Three.js world space
      const avoidWorldX = (avoidOffset.x / window.innerWidth) * 2 * halfW;
      const avoidWorldY = -(avoidOffset.y / window.innerHeight) * 2 * halfH;

      flight.position.x = baseX + avoidWorldX;
      flight.position.y = baseY + avoidWorldY;
      flight.position.z = Math.sin(t * 0.9) * 0.06;

      // Dynamic 3D Attitude: Pitch, Roll, Yaw
      const dynPitch =
        cur.pitch +
        18 -
        clamp(vy * 14, -14, 14) +
        Math.sin(t * 2.1 + 1) * 1.5 -
        mouse.sy * 5 -
        clamp(avoidOffset.y * 0.12, -12, 12);

      const dynRoll =
        cur.roll +
        clamp(vx * 14, -16, 16) +
        Math.sin(t * 1.7) * 2 +
        clamp(avoidOffset.x * 0.15, -16, 16);

      const dynYaw = cur.yaw + mouse.sx * 8 + clamp(vx * 6, -10, 10);

      droneRoot.rotation.set(
        THREE.MathUtils.degToRad(dynPitch),
        THREE.MathUtils.degToRad(dynYaw),
        THREE.MathUtils.degToRad(-dynRoll),
        'YXZ'
      );

      // Camera Gimbal subtly tracks user mouse cursor
      gimbalGroup.rotation.x = -mouse.sy * 0.28;
      gimbalGroup.rotation.y = mouse.sx * 0.35;

      // Rapidly spin all 4 real 3D propellers!
      // Faster when maneuvering or dodging
      const speedMagnitude = Math.sqrt(vx * vx + vy * vy);
      const propSpeed = 48 + speedMagnitude * 50;
      propEntries.forEach((entry) => {
        entry.group.rotation.y += entry.dir * propSpeed * dt;
      });

      // Rear Beacon & Under-Glow pulse
      thrusterLight.intensity = 1.4 + Math.sin(t * 4.2) * 0.6;
      beaconMesh.scale.setScalar(1.0 + Math.sin(t * 6.0) * 0.18);

      // Dynamic Drop Shadow offset responding to hover altitude
      shadowMesh.position.x = 0.12 + Math.sin(t * 2.1) * 0.01;
      shadowMesh.position.y = -0.38 - hover * 0.5;
      shadowMat.opacity = clamp(0.42 - hover * 0.4, 0.25, 0.55);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', scanVisibleTextRects);
      renderer.dispose();
      disposables.forEach((item) => item.dispose());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="drone-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 25,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 1.2s ease',
      }}
    />
  );
};

export default ScrollDrone;
