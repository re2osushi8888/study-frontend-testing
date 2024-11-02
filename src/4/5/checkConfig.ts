const config = {
	mock: true,
	feature: { spy: true },
};

export const checkConfig = (callback?: (payload: object) => void) => {
	callback?.(config);
};
