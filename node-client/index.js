/*
Fetch CPU laod(current)
Memory useage
    - free
    - total
    - OS Type
    - uptime
    - CPU info
    - type
    - no. of cores
    - Clock speed
*/
const os = require("os");
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:8181');

socket.on('connect',()=>{
    console.log('connected');
})

const performanceData = () => {
    return new Promise(async (resolve,reject)=>{
        const uptime = os.uptime();
        const osType = os.type();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
        const cpus = os.cpus();
        const cpuModel = cpus[0].model;
        const cpuSpeed = cpus[0].speed;
        const numCores = cpus.length;
        const cpuLoad = await getCpuLoads();
        resolve({
            freeMem,
            totalMem,
            usedMem,
            memUsage,
            osType,
            uptime,
            cpuModel,
            numCores,
            cpuSpeed,
            cpuLoad
        })
    })
 
};

const cpuAverage = () => {
  let cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((core) => {
    for (type in core.times) {
      totalMs += core.times[type];
    }
    idleMs += core.times.idle;
  });
  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoads = () => {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);
      resolve(percentageCpu);  
    }, 100);
  });
};

