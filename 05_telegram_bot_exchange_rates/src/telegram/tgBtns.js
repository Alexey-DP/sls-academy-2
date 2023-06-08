import TgTxts from "./tgTxts.js";

export default {
  startButton: {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: TgTxts.selectCurrency,
          },
        ],
      ],
    },
  },
  currency: {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: TgTxts.USD,
          },
          {
            text: TgTxts.EUR,
          },
        ],
      ],
    },
  },
  bank: {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: TgTxts.pb,
          },
          {
            text: TgTxts.mb,
          },
        ],
        [
          {
            text: TgTxts.back,
          },
        ],
      ],
    },
  },
};
