import { convertPriceToEther } from "util/web3Intraction";

export const BLOCKCHAIN_CURRENCY_CODE = {
  ethereum: "ETH",
  polygon: "MATIC",
  BNB: "BNB",
  AVAX: "AVAX",
};

export const BLOCKCHAIN_ENUM = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Binance Smart Chain", value: "BNB" },
];

export const getNetworkUrl = (type, settings) => {
  if (settings.blockchain.length === 0) {
    return null;
  }

  let blockchain = settings.blockchain.filter((ele) => {
    return ele.status === true && ele.type === type;
  });

  if (blockchain.length === 0) {
    return null;
  }

  blockchain = blockchain[0];

  if (blockchain.networkUrl.length === 0) {
    // CONFIGURE_SETTING_FIRST
    return null;
  }

  let blockchainNetworkUrl = blockchain.networkUrl.filter((ele) => {
    return ele.type === settings.blockchainNetworkMode;
  });

  blockchainNetworkUrl = blockchainNetworkUrl[0];

  if (!blockchainNetworkUrl.url) {
    // CONFIGURE_SETTING_FIRST
    return null;
  }

  return blockchainNetworkUrl;
};

export const getContractDetails = (type, settings) => {
  if (settings.multiSend && settings.multiSend.contractAddress.length === 0) {
    return null;
  }

  let contractAddress = settings.multiSend.contractAddress.filter((ele) => {
    return ele.type === type;
  });

  if (contractAddress.length === 0) {
    return null;
  }

  contractAddress = contractAddress[0];

  if (!contractAddress[settings.blockchainNetworkMode]) {
    // CONFIGURE_SETTING_FIRST
    return null;
  }

  return {
    abi: settings.multiSend.abi,
    contractAddress: contractAddress[settings.blockchainNetworkMode],
  };
};

export const getFeeCalucations = (item, setting) => {
  let addressArray = [];
  let priceArray = [];

  let originalPrice = item.price;
  let admin_royalties =
    Number(originalPrice) * (Number(setting.adminCommission) / 100);

  let finalPrice = 0;

  if (item.author_id._id === item.current_owner._id) {
    finalPrice = originalPrice - admin_royalties;

    addressArray.push(item.current_owner.walletAddress);
    priceArray.push(convertPriceToEther(finalPrice.toString()));
  } else {
    let royalties = Number(originalPrice) * (Number(item.royalties) / 100);
    finalPrice = originalPrice - (royalties + admin_royalties);

    // current owner royalities
    addressArray.push(item.current_owner.walletAddress);
    priceArray.push(convertPriceToEther(finalPrice.toString()));

    // author royalities
    addressArray.push(item.author_id.walletAddress);
    priceArray.push(convertPriceToEther(royalties.toString()));
  }

  //owner
  addressArray.push(setting.walletAddress.publicKey);
  priceArray.push(convertPriceToEther(admin_royalties.toString()));

  return {
    address: addressArray,
    price: priceArray,
  };
};

export const ACTIVITY_TYPE = {
  minted: "Minted",
  transfer: "Transfer",
  admin_comission: "Admin Comission",
  bids: "Bid",
  comission: "Royality",
};

export const menus = [
  {
    id: 1,
    name: "Home",
    links: "/",
  },
  {
    id: 2,
    name: "Explore",
    links: "/explore",
  },
  {
    id: 3,
    name: "FAQ",
    links: "/faq",
  },
  {
    id: 4,
    name: "Contact",
    links: "/contact-01",
  },
  {
    id: 5,
    authToken: true,
    name: "Create",
    links: "/create-item",
  },
  {
    id: 6,
    authToken: false,
    name: "Login",
    links: "/login",
  },
];

export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
