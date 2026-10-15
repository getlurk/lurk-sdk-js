import { Lurk } from "@getlurk/sdk";

const lurk = new Lurk(); // reads the key from LURK_KEY

const receipt = await lurk.events.send({
  event: "checkin.scanned",
  user: "maya@example.com",
  properties: { venue: "mission-st" },
  idempotency_key: "chk-mission-st-maya-0812",
});

console.log(receipt.receipts);
