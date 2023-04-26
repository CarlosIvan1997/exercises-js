const nextServerNumber = (serverNumbers) => {
  let lowestServerNumber = 1;
  let alreadyFound = false;

  while (!alreadyFound) {
    if (serverNumbers.indexOf(lowestServerNumber) >= 0) {
      lowestServerNumber += 1;
    } else {
      alreadyFound = true;
    }
  }

  return lowestServerNumber;
};

class Tracker {
  hostNames = {};

  allocate = (hostType) => {
    if (!this.hostNames[hostType]) {
      this.hostNames[hostType] = [];
    }

    const nextNumber = nextServerNumber(this.hostNames[hostType]);
    this.hostNames[hostType].push(nextNumber);

    return `${hostType}${nextNumber}`;
  };

  deallocate = (hostName) => {
    const matches = hostName.match(/([a-z]+)(\d+)/);
    if (!Array.isArray(matches)) {
      console.log(`${hostName} is not a valid hostName`);
      return;
    }

    const hostType = matches[1];
    const serverNumber = parseInt(matches[2], 10);

    if (
      this.hostNames[hostType] &&
      this.hostNames[hostType].indexOf(serverNumber) !== -1
    ) {
      const index = this.hostNames[hostType].indexOf(serverNumber);
      this.hostNames[hostType].splice(index, 1);
    }
  };
}

const tracker = new Tracker();

tracker.allocate('api');
tracker.allocate('api');
tracker.allocate('api');

tracker.deallocate('api1');

tracker.allocate('api');
tracker.allocate('api');

tracker.deallocate('api3');

tracker.allocate('api');
tracker.allocate('api');
tracker.allocate('api');

tracker.deallocate('api2');

tracker.allocate('api');

tracker.allocate('server');
tracker.allocate('server');
tracker.allocate('server');

tracker.deallocate('server1');

tracker.allocate('server');
tracker.allocate('server');

console.log(tracker.hostNames);
