import { expect } from "chai";
import { ethers } from "hardhat";

// Vérifie que les jetons créés vont bien sur le compte du créateur
describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();
      const RallysToken = await ethers.getContractFactory("RallysToken");
      const token = await RallysToken.deploy();
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
});