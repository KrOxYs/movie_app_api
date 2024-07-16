import ipinfo from "ipinfo";

export const getDate = async () => {
  try {
    const cLoc = await new Promise((resolve, reject) => {
      ipinfo((err, cLoc) => {
        if (err) return reject(err);
        return resolve(cLoc);
      });
    });
    const timeZone = cLoc.timezone;
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: timeZone,
    };
    const localDateTime = now.toLocaleString("en-US", options);
    return localDateTime;
  } catch (error) {
    console.error(error);
  }
};

export const test = () => {
  return true;
};

export const GetOneMonthLater = async () => {
  try {
    const cLoc = await new Promise((resolve, reject) => {
      ipinfo((err, cLoc) => {
        if (err) return reject(err);
        return resolve(cLoc);
      });
    });
    const timeZone = cLoc.timezone;
    const now = new Date();
    const oneMonthLater = new Date(now.setMonth(now.getMonth() + 1));
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: timeZone,
    };
    const localDateTime = oneMonthLater.toLocaleString("en-US", options);
    return localDateTime;
  } catch (error) {
    console.error(error);
  }
};
