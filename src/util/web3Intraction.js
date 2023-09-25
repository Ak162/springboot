import Web3 from "web3";
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";

// Constant
import {
  getNetworkUrl,
  getContractDetails,
  getFeeCalucations,
} from "helpers/constants";

class Web3Intraction {
  constructor(blockchain, settings) {
    console.log("blockchainblockchain",blockchain)
    const networkUrl = getNetworkUrl(blockchain || "ethereum", settings);

    this.settings = settings;
    this.adminContractSetting = getContractDetails(
      blockchain || "ethereum",
      settings
    );
    if (networkUrl) {
      this.networkUrl = networkUrl;
      this.web3 = new Web3(networkUrl.url);
    }
    console.log("this.network url",this.networkUrl)
  }

  isNetworkServiceWorking = () => {
    if (this.web3) {
      return true;
    }

    return false;
  };

  convertPriceToEther = (price) => {
    return ethers.utils.parseEther(Number(price).toFixed(8))._hex;
    // return Web3.utils.toWei(Number(price).toFixed(8), "ether")
  };

  getContract = (abi, address) => {
    try {
      let contract = new this.web3.eth.Contract(JSON.parse(abi), address);

      return contract;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  eth_sendTransaction = (params, getToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [params],
        });

        let receipt = await this.getTransactionReceipt(txHash, getToken);
        resolve({ txHash, receipt });
      } catch (error) {
        reject(error);
      }
    });
  };

  getTransactionReceipt = (transactionHash, getToken) => {
    return new Promise(async (resolve, reject) => {
      this.contractInterval = setInterval(async () => {
        try {
          let receipt = await this.web3.eth.getTransactionReceipt(
            transactionHash
          );

          console.log("final receipt", receipt);

          if (!!receipt) {
            if (getToken && !!receipt?.logs && !!receipt.logs[0]) {
              receipt.token_id = this.web3.utils.hexToNumberString(
                receipt.logs[0].topics[3]
              );
            }

            clearInterval(this.contractInterval);
            this.contractInterval = null;

            resolve(receipt);
          }
        } catch (error) {
          clearInterval(this.contractInterval);
          this.contractInterval = null;

          reject(error);
        }
      }, 15000);
    });
  };

  /**
   * Deploy collection contract.
   *
   * @param {string} userWallet Current user wallet address
   * @param {object} collectionData Collection Details (ie. abi, bytecode)
   * @param {function} callback Callback function
   *
   * @returns {Promise} Object (Transaction Hash, Contract Address) in Success or Error in Fail
   */
  deployContract = (userWallet, collection, callback) => {
    return new Promise(async (resolve, reject) => {
      //set up transaction parameters
      const transactionParameters = {
        from: userWallet, // must match user's active address.
        data: collection.data.bytecode,
      };

      try {
        let receipt = await this.eth_sendTransaction(transactionParameters);

        callback && callback(null, receipt);
        resolve(receipt);
      } catch (error) {
        callback && callback(error.message);
        reject(error.message);
      }
    });
  };

  /**
   * Check user approved contract transactions, if not then make transaction to approve.
   *
   * @param {string} userWallet Current user wallet address
   * @param {object} collectionData Collection Details (ie. abi, contract address, bytecode)
   * @param {function} callback Callback function
   *
   * @returns {Promise} Success for approved or Fail for error
   */
  verifyApproved = (userWallet, collection, callback) => {
    return new Promise(async (resolve, reject) => {
      if (collection.abi && collection.data.contractAddress) {
        const contract = this.getContract(
          collection.abi,
          collection.data.contractAddress
        );

        if (!contract) {
          const error_message = "Invalid Contract";
          callback && callback(error_message);
          reject(error_message);
          return;
        }

        const isApproved = await contract.methods
          .isApprovedForAll(userWallet, this.settings.walletAddress.publicKey)
          .call();

        if (isApproved) {
          callback && callback(null, collection);
          resolve(collection);
          return;
        }

        const transactionParameters = {
          to: collection.data.contractAddress, // Required except during contract publications.
          from: userWallet, // must match user's active address.
          data: contract.methods
            .setApprovalForAll(this.settings.walletAddress.publicKey, true)
            .encodeABI(),
        };

        try {
          let { receipt } = await this.eth_sendTransaction(
            transactionParameters
          );

          callback && callback(null, receipt);
          resolve(receipt);
        } catch (error) {
          callback && callback(error.message);
          reject(error.message);
        }
      } else {
        const error_message = "No Collection Data!";
        callback && callback(error_message);
        reject(error_message);
      }
    });
  };

  /**
   * Mint NFT
   *
   * @param {string} userWallet Current user wallet address
   * @param {object} collectionData Collection Details (ie. abi, contract address, bytecode)
   * @param {object} itemData (NFT) Item details
   * @param {function} callback Callback function
   *
   * @returns {Promise} Receipt in Success or Error in Fail
   */
  mintNFT = (userWallet, collection, item, callback) => {
    return new Promise(async (resolve, reject) => {
      if (collection.data?.contractAbi && collection.data?.contractAddress) {
        const contract = this.getContract(
          collection.data?.contractAbi,
          collection.data.contractAddress
        );

        if (!contract) {
          const error_message = "Invalid Contract";
          callback && callback(error_message);
          reject(error_message);
          return;
        }

        //set up transaction parameters
        const transactionParameters = {
          to: collection.data.contractAddress, // Required except during contract publications.
          from: userWallet, // must match user's active address.
          data: contract.methods
            .mintNFT(userWallet, item.token_uri)
            .encodeABI(),
        };

        try {
          let { receipt } = await this.eth_sendTransaction(
            transactionParameters,
            true
          );

          callback && callback(null, receipt);
          resolve(receipt);
        } catch (error) {
          callback && callback(error);
          reject(error);
        }
      }
    });
  };

  /**
   * Transfer balance to NFT owner account
   *
   * @param {string} userWallet Current user wallet address
   * @param {object} itemData (NFT) Item details
   * @param {function} callback Callback function
   *
   * @returns {Promise} Receipt in Success or Error in Fail
   */
  sendTransaction = (userWallet, item, callback) => {
    return new Promise(async (resolve, reject) => {
      const adminContract = this.getContract(
        JSON.stringify(this.adminContractSetting.abi),
        this.adminContractSetting.contractAddress
      );

      const calculatePrice = getFeeCalucations(item, this.settings);

      //set up transaction parameters
      const transactionParameters = {
        to: this.adminContractSetting.contractAddress, // Required except during contract publications.
        from: userWallet, // must match user's active address.
        value: this.convertPriceToEther(item.price.toString()),
        data: adminContract.methods
          .sendETH(calculatePrice.address, calculatePrice.price)
          .encodeABI(),
      };

      try {
        let { receipt } = await this.eth_sendTransaction(transactionParameters);

        callback && callback(null, receipt);
        resolve(receipt);
      } catch (error) {
        callback && callback(error);
        reject(error);
      }
    });
  };

  getNfts = (params) =>{
    return new Promise(async (resolve, reject) => {
      try {
         console.log("this.alchemy",this.alchemy)
         const alchemyConfig = {
          apiKey: this.networkUrl.apiKey, // Replace with your Alchemy API Key.
          network: this.settings.blockchainNetworkMode === "testnet" ? Network.ETH_GOERLI : Network.ETH_MAINNET , // Replace with your network.
        };
        console.log("alchemyConfig",alchemyConfig)
        const alchemy = new Alchemy(alchemyConfig);
         console.log("clchemy",alchemy)
         const filters = {
          pageKey : params?.pageKey ?? undefined,
          contractAddresses : params.contractAddress,
          pageSize : 10000
         };
            
        let response = await alchemy.nft.getNftsForOwner(params.owner,filters);
        console.log("response",response);
        resolve(response);
      } catch (error) {
        console.log("Error in alchemy",error)
        reject(error);
      }
    });
  }
}

export default Web3Intraction;

export const convertPriceToEther = (price) => {
  return ethers.utils.parseEther(Number(price).toFixed(8))._hex;
  // return Web3.utils.toWei(Number(price).toFixed(8), "ether")
};

export const convertHexToString = (hex) => {
  return Web3.utils.hexToNumberString(hex);
};

export const convertNumberToHex = (number) => {
  return Web3.utils.numberToHex(Number(number));
};
export const convertToWei = (number) => Web3.utils.toWei(number);
export const convertFromWei = (number, unit) =>
  Web3.utils.fromWei(number, unit || "ether");
