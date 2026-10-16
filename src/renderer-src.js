const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  // Window Controls
  document.getElementById('btn-close')?.addEventListener('click', () => {
    ipcRenderer.send('app-close');
  });

  document.getElementById('btn-minimize')?.addEventListener('click', () => {
    ipcRenderer.send('app-minimize');
  });

  // State Simulation Toggle
  let isConnected = false;
  const phoneVisualizer = document.getElementById('phone-visualizer');
  const statusBadge = document.getElementById('device-status-badge');
  const toggleBtn = document.getElementById('simulate-toggle');
  const snValue = document.getElementById('sn-value');
  const icloudValue = document.getElementById('icloud-value');
  const iosValue = document.getElementById('ios-value');
  const startBtn = document.getElementById('start-btn');

  toggleBtn.addEventListener('click', () => {
    isConnected = !isConnected;
    if (isConnected) {
      phoneVisualizer.classList.remove('disconnected');
      phoneVisualizer.classList.add('connected');
      statusBadge.innerText = 'CONNECTED (DFU)';
      snValue.innerText = 'G6TZX801Q182';
      icloudValue.innerText = 'alex***24@icloud.com';
      iosValue.innerText = 'iOS 27.0.3';
    } else {
      phoneVisualizer.classList.remove('connected');
      phoneVisualizer.classList.add('disconnected');
      statusBadge.innerText = 'DISCONNECTED';
      snValue.innerText = 'N/A';
      icloudValue.innerText = 'N/A';
      iosValue.innerText = 'N/A';
    }
  });

  // START Button Handler
  startBtn.addEventListener('click', () => {
    const mode = document.querySelector('input[name="operation_mode"]:checked')?.value;
    const blockOTA = document.getElementById('block-ota-chk')?.checked;

    if (!isConnected) {
      alert('Please connect an iOS device in DFU / Recovery mode first!');
      return;
    }

    alert(`Starting execution!\nMode: ${mode.toUpperCase()}\nBlock OTA & Reset: ${blockOTA ? 'ENABLED' : 'DISABLED'}`);
  });
});
