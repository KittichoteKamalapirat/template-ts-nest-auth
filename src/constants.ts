export const IS_PROD = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qidRedis";

//ref: https://platform.openai.com/docs/models/gpt-3-5
export const GPT_TOKEN_LIMIT_4K = 4096;
export const FREE_MEMBER_TUTOR_TOKEN_LIMIT = GPT_TOKEN_LIMIT_4K;
export const GPT_TOKEN_LIMIT_8K = 8192; // gpt-4
export const GPT_TOKEN_LIMIT_16K = 16384;

export const BASE_GPT_MODEL = "gpt-4"; // model: "gpt-4-0613", "gpt-3.5-turbo-0613",

export const GPT_3 = "gpt-3.5-turbo";
