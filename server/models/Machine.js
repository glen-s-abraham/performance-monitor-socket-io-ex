const mongoose = require("mongoose");

const machineSchema = mongoose.Schema({
  macA: String,
  freeMem:Number,
  totalMem:Number,
  usedMem:Number,
  memUsage:Number,
  osType:String,
  uptime:Number,
  cpuModel:String,
  numCores:Number,
  cpuSpeed:Number,
  cpuLoad:Number,
});

module.exports = mongoose.model("Machine", machineSchema);
