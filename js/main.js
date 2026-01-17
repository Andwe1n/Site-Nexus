// main.js — application entry point (ES module)
import { initUI } from './ui.js';
import { initMembers } from './members.js';
import { initParticles } from './particles.js';
import { initCounters } from './counters.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initMembers();
  initParticles();
  initCounters();
});

import { initUI, initMobileMenu } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initMobileMenu(); // ADAUGĂ ASTA
  initMembers();
  initParticles();
  initCounters();
});
