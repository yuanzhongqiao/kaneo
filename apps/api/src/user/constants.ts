export const ACCESS_TOKEN_EXPIRY = new Date(
	Date.now() + 30 * 24 * 60 * 60 * 1000, // 30d
);

export const REFRESH_TOKEN_EXPIRY = new Date(
	new Date(Date.now() + 15 * 60 * 1000), // 15m
);
