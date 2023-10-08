export const DESKTOP_SCREEN_WIDTH = 1011;
export const TABLET_SCREEN_WIDTH = 768;
export const TABLET_MINI_SCREEN_WIDTH = 560;
export const MOBILE_SCREEN_WIDTH = 320;

export const DESKTOP_CARDS_AMOUNT = { showCards: 12, addCards: 4 };
export const TABLET_CARDS_AMOUNT = { showCards: 12, addCards: 3 };
export const TABLET_MINI_CARDS_AMOUNT = { showCards: 8, addCards: 2 };
export const MOBILE_CARDS_AMOUNT = { showCards: 5, addCards: 2 };

export const DURATION_SHORT_MOVIES = 100;

export const PATTERN_EMAIL = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.{1,1}[a-z]{2,}";

export const mainApiConfig = {
  baseUrl: "https://api.bitfilms.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const moviesApiConfig = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};
