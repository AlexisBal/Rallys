import { expect } from "chai";
import { ethers } from "hardhat";
import { providers, BigNumber, CallOverrides } from "ethers";
import { SubscriptionManager, Kyc, RallysToken } from "../typechain";

describe("SubscriptionManager contract", function () {  
    let Kyc;
    let kyc: Kyc;
    let SubscriptionManager;
    let subscriptionManager: SubscriptionManager;
    let RallysToken;
    let rallysToken: RallysToken;
    let owner;
    let addr1: any;
    let addr2;
    let contract;
  
    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        Kyc = await ethers.getContractFactory("Kyc");
        kyc = await Kyc.deploy();

        SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
        subscriptionManager = await SubscriptionManager.deploy(kyc.address);

        RallysToken = await ethers.getContractFactory("RallysToken");
        contract = await subscriptionManager.getRallysTokenContract();
        rallysToken = SubscriptionManager.attach(contract);
    });
  
    describe("Kyc Check", function () {
        it("Balance of the contract should be the same as what Account 1 sent...", async function () {
            await kyc.setKycCompleted(addr1.address);
            await addr1.sendTransaction({
                to: subscriptionManager.address,
                value: BigNumber.from("9000000000000000")
            })
            expect(await subscriptionManager.getBalance()).to.equal("9000000000000000");
        });

        it("Account 1 should be able to buy some tokens...", async function () {
            await kyc.setKycCompleted(addr1.address);
            await addr1.sendTransaction({
                to: subscriptionManager.address,
                value: BigNumber.from("9000000000000000")
            })
            expect(await subscriptionManager.getBalanceTokensOf(addr1.address)).to.equal("3");
        });
    });

    describe("Subscription Check", function () {
        it("Account 1 should be able to subscribe...", async function () {
            await kyc.setKycCompleted(addr1.address);
            await addr1.sendTransaction({
                to: subscriptionManager.address,
                value: BigNumber.from("9000000000000000")
            })
            await rallysToken.connect(addr1).approve(subscriptionManager.address, 1);
            await subscriptionManager.connect(addr1).subscribe(1);
            expect(await subscriptionManager.isActive(addr1.address)).to.equal(true);
        });

        it("Account 1 should have a 2 month subscription...", async function () {
            await kyc.setKycCompleted(addr1.address);
            await addr1.sendTransaction({
                to: subscriptionManager.address,
                value: BigNumber.from("9000000000000000")
            })
            await rallysToken.connect(addr1).approve(subscriptionManager.address, 2);
            await subscriptionManager.connect(addr1).subscribe(2);
            expect(await subscriptionManager.subscriptionDuration(addr1.address)).to.equal(2);
        });
    });
  });