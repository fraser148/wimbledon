import { env } from "@/env.mjs";
type PushsaferResponse = {
  status: number,
  success: string,
  available: number,
  message_ids: string,
};

const urlEncodeParams = (params: Record<string, string>) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

class Pushsafer {
  private readonly _api_key: string;

  constructor(api_key: string) {
    this._api_key = api_key;
  }

  public async sendNotification(title: string, message: string) {
    const url = "https://www.pushsafer.com/api";
    const data: Record<string, string> = {
      k: this._api_key,
      t: title,
      m: message,
      // v: "3",
      pr: "2",
      // d: "gs4273"
      d: "a"
    };
    const params = urlEncodeParams(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URI = `${url}?${params}`;
    const res = await fetch(URI, options);
    const json = await res.json() as PushsaferResponse;

    return json;
  }
}

const pushsafer = new Pushsafer(env.PUSHSAFER_KEY);

export {
  pushsafer
}