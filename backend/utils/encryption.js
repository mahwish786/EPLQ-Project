export const encryptLocation = (lat, lng) => {
    const rawData = `${lat}:${lng}:${Date.now()}`;
    const encryptedString = Buffer.from(rawData).toString('base64');
    return `eplq_v1_${encryptedString}`;
};