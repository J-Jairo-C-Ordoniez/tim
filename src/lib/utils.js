export function generateSilhouettePoint() {
  const part = Math.random();
  let px, py;

  if (part < 0.35) {
    const t = Math.random();
    px = 0.2 - t * 1.4;
    py = 0.2 + t * 1.6;
    px += (Math.random() - 0.5) * 0.15;
    py += (Math.random() - 0.5) * 0.15;
  } else if (part < 0.55) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.35;
    px = 0.3 + Math.cos(angle) * r;
    py = 0.5 + Math.sin(angle) * r;
    if (Math.random() > 0.8) {
      px -= 0.25;
      py += 0.15;
    }
  } else if (part < 0.90) {
    px = (Math.random() - 0.5) * 1.2 + 0.2;
    py = -1.2 + Math.random() * 1.5;
  } else {
    const angle = Math.PI * (1.1 + Math.random() * 0.8);
    const r = 0.35 + Math.random() * 0.1;
    px = 0.3 + Math.cos(angle) * r;
    py = 0.05 + Math.sin(angle) * r;
  }
  
  if (part < 0.05) {
    px = -1.2 + (Math.random() - 0.5) * 0.3;
    py = 1.8 + (Math.random() - 0.5) * 0.3;
  }
  px *= 1.2;
  py *= 1.2;

  px += 0.4;
  py -= 0.2;

  return { 
    x: Math.round(px * 1000), 
    y: Math.round(py * 1000) 
  };
}



