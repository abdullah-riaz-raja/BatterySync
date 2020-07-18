var child_process = require('child_process');

var osName = "Unknown";
var batteryPercent = null;
var modelName = "Unknown";
var manufacturerName = "Unknown";

switch (process.platform) {
    case "win32":   osName = "Windows"; break;
    case "darwin":  osName = "MacOS";   break;
    case "linux":   osName = "Linux";   break;
    default: break;
}

if (osName == "Windows") {
    batteryPercent = getWindowsBattery();
    manufacturerName = getWindowsManufacturer();
    modelName = getWindowsModel();
} else if (osName == "MacOS") {
    batteryPercent = getMacOSBattery();
    manufacturerName = "Apple";
    modelName = getMacOSModel();
} else {
    console.log("Waleed gay");
}

function getWindowsBattery() {
    var data = child_process.execSync("wmic Path Win32_Battery get estimatedchargeremaining").toString();
    var batteryPercent = data.substring(29);

    return batteryPercent.trim();
}

function getWindowsManufacturer(){
    var data = child_process.execSync("wmic computersystem get manufacturer").toString();
    var manufacturer = data.substring(12);

    return manufacturer.trim(); 
}

function getWindowsModel(){
    data = child_process.execSync("wmic computersystem get model").toString();
    var model = data.substring(5);

    return model.trim();    
}

function getMacOSBattery() {
    var data = child_process.execSync('pmset -g batt | egrep "([0-9]+%).*" -o').toString();
    var arrayData = data.split("%");
    batteryPercent = arrayData[0];

    return batteryPercent;
}

function getMacOSModel() {
    var data = child_process.execSync('sysctl hw.model').toString();
    var arrayData = (data.substring(10)).split(",");
    modelName = arrayData[0];

    return modelName;
}

console.log("OS Name: " + osName + "\nBattery Percentage: " + batteryPercent + "\nManufacturer: " + manufacturerName + "\nModel: " + modelName);

