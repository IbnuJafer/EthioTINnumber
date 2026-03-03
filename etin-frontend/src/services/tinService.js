import API from "./api";

export const applyForTIN = async (data) => {
    const res = await API.post("/tin/apply", data);
    return res.data;
};

export const getMyTIN = async () => {
    const res = await API.get("/tin/my-tin");
    return res.data;
};

export const verifyTIN = async (tinNumber) => {
    const res = await API.get(`/tin/verify/${tinNumber}`);
    return res.data;
};
