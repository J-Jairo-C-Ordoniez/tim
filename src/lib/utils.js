export function generateSilhouettePoint() {
  const part = Math.random();
  let px, py;

  if (part < 0.35) {
    // ARM (Raised diagonally up-left)
    const t = Math.random();
    // Arm goes from shoulder (0.2, 0.2) to hand (-1.2, 1.8)
    px = 0.2 - t * 1.4;
    py = 0.2 + t * 1.6;
    // Add thin thickness
    px += (Math.random() - 0.5) * 0.15;
    py += (Math.random() - 0.5) * 0.15;
  } else if (part < 0.55) {
    // HEAD & CAP (Tilted up)
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.35;
    px = 0.3 + Math.cos(angle) * r;
    py = 0.5 + Math.sin(angle) * r;
    // Cap brim pointing left-up
    if (Math.random() > 0.8) {
      px -= 0.25;
      py += 0.15;
    }
  } else if (part < 0.90) {
    // TORSO
    px = (Math.random() - 0.5) * 1.2 + 0.2;
    py = -1.2 + Math.random() * 1.5;
  } else {
    // HEADPHONES (Around neck)
    const angle = Math.PI * (1.1 + Math.random() * 0.8);
    const r = 0.35 + Math.random() * 0.1;
    px = 0.3 + Math.cos(angle) * r;
    py = 0.05 + Math.sin(angle) * r;
  }
  
  // Hand cluster at the end
  if (part < 0.05) {
    px = -1.2 + (Math.random() - 0.5) * 0.3;
    py = 1.8 + (Math.random() - 0.5) * 0.3;
  }

  // Scale everything up slightly and center it visually
  px *= 1.2;
  py *= 1.2;

  // Manual centering adjustments based on visual center of mass
  px += 0.4; // Shift right
  py -= 0.2; // Shift slightly down

  return { 
    x: Math.round(px * 1000), 
    y: Math.round(py * 1000) 
  };
}



