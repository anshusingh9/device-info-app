#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const si = require('systeminformation'); // ✅ Import systeminformation

const app = express();
const port = 3000;

const deviceFilePath = path.join(os.homedir(), '.device.json');

// Middleware
app.use(express.json());

// 🧠 Ask user for Device ID (only once during install)
async function promptDeviceId() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question('Enter your Device ID (only once during installation): ', answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// 📦 Save the Device ID permanently
async function setupDeviceIdIfNeeded() {
  if (!fs.existsSync(deviceFilePath)) {
    const deviceId = await promptDeviceId();
    fs.writeFileSync(deviceFilePath, JSON.stringify({ deviceId }), 'utf-8');
    console.log('✅ Device ID saved.');
  } else {
    console.log('🔄 Device ID already set. Skipping prompt.');
  }
}

// 🔍 API Endpoint to return stored Device ID + system info
app.get('/view/devicedetail', async (req, res) => {
  try {
    if (!fs.existsSync(deviceFilePath)) {
      return res.status(404).json({ error: 'Device ID not found' });
    }

    const storedData = fs.readFileSync(deviceFilePath, 'utf-8');
    const { deviceId } = JSON.parse(storedData);

    const system = await si.system();
    const osInfo = await si.osInfo();
    const chassis = await si.chassis();

    res.json({
      deviceId,
      system: {
        manufacturer: system.manufacturer,
        model: system.model,
        uuid: system.uuid,
        serial: system.serial,
        deviceType: chassis.type || 'Unknown'
      },
      os: {
        platform: osInfo.platform,
        make: osInfo.distro,
        release: osInfo.release,
        arch: osInfo.arch
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get device/system details' });
  }
});

// 🚀 Init flow
(async () => {
  await setupDeviceIdIfNeeded();

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`➡️  GET http://localhost:${port}/view/devicedetail`);
  });
})();
