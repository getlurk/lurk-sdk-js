import { constructEvent } from "@getlurk/sdk";

// Pass the raw request body (text, not parsed JSON), the request headers and the endpoint's secret.
export async function handle(body: string, headers: Headers): Promise<number> {
  const event = await constructEvent(body, headers, process.env.LURK_WEBHOOK_SECRET ?? "");
  if (event.type === "activity.created") {
    for (const receipt of event.data.receipts) {
      console.log(`${event.data.user}: ${receipt.change} ${receipt.unit}, now ${receipt.balance}`);
    }
  }
  return 200; // any 2xx tells Lurk it arrived
}
