const BowProxy = artifacts.require("BowProxy");

module.exports = async function (deployer) {
    if (deployer.network.indexOf('skipMigrations') > -1) { // skip migration
        return;
    }
    if (deployer.network.indexOf('kovan_oracle') > -1) { // skip migration
        return;
    }
    if (deployer.network_id == 4) { // Rinkeby
    } else if (deployer.network_id == 1) { // main net
    } else if (deployer.network_id == 42) { // kovan
    } else if (deployer.network_id == 56) { // bsc main net
    } else if (deployer.network_id == 256 || deployer.network_id == 5777) { //bsc test net
        let from = "0x5ead4038453C914Ab2eF355e57012b819fF816Bb";
        let tokenAddress = "";
        let fromContract;
        deployer.then(async () => {
            fromContract = await BowProxy.at(from);
            tokenAddress = await fromContract.getTokenAddress();
            return BowProxy.new("Bow Pools Proxy for test", "BOWPROXY-V1", tokenAddress);
        }).then(async nProxy => {
            console.log("Proxy's address: " + nProxy.address);
            await fromContract.openMigration();
            await fromContract.transferMinterTo(nProxy.address);
            // await fromContract.approveTokenTo(nProxy.address);
            await nProxy.migrate(from);
            await nProxy.closeMigration();
        });
    } else {

    }

    // deployer.deploy(factory).then(() => {
    // });
    // deployer.deploy(exchange).then(() => {
    // });
};
