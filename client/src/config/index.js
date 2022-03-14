export const HOST =
  process.env.NODE_ENV === "production"
    ? "https://file-drive-api.herokuapp.com"
    : "http://localhost:8000";

export const ACCESS_LEVELS = {
  0: "Lowest",
  1: "Restricted",
  2: "Confidential",
  3: "Secret",
  4: "Top Secret",
};

export const USER_ROLES = {};

export const DATE_FORMAT = "DD MMM YYYY"; // dayjs 04 Jan 2020
