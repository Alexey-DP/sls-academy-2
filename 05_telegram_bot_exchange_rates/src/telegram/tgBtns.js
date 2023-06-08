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
};
