class Tracker {
  servers = {};

  allocate(serverName) {
    const nextServerNumber = this.getNextServerNumber(serverName);

    if (!this.servers[serverName]) {
      this.servers[serverName] = [nextServerNumber];
    } else {
      this.servers[serverName] = [
        ...this.servers[serverName],
        nextServerNumber,
      ].sort((a, b) => a - b);
    }

    return `${serverName}${nextServerNumber}`;
  }

  deallocate(server) {
    let [serverName, serverNumber] = server.split(/(\d+)/);
    serverNumber = parseInt(serverNumber);

    const currentServers = this.servers[serverName];
    const index = currentServers.indexOf(serverNumber);

    currentServers.splice(index, 1);

    this.servers[serverName] = [...currentServers];
  }

  getNextServerNumber(serverName) {
    if (!this.servers[serverName]?.length) {
      return 1;
    } else {
      const currentServers = this.servers[serverName];

      const max = currentServers[currentServers.length - 1];

      for (let index = 0; index < max; index += 1) {
        if (currentServers.findIndex((server) => server === index + 1) === -1) {
          return index + 1;
        }
      }

      return max + 1;
    }
  }
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

console.log(tracker.servers);
