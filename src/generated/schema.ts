// Generated from openapi/openapi.json by scripts/generate.ts. Do not edit.

export type Action =
  | {
      unit: string;
      add: number | AmountFrom;
      /** If this action changes more than this, all of the rule's changes wait for a person to give or refuse them (a hold) */
      hold_over?: number;
    }
  | {
      unit: string;
      remove: number | AmountFrom;
      /** If this action changes more than this, all of the rule's changes wait for a person to give or refuse them (a hold) */
      hold_over?: number;
    }
  | {
      unit: string;
      /** Back to 0: takes what the person holds of the unit, all of it, as one change (or gives it back to 0 from below). The unit must allow it (`resets`); it works for a unit that only goes up, like a season's XP */
      reset: true;
      /** If this action changes more than this, all of the rule's changes wait for a person to give or refuse them (a hold) */
      hold_over?: number;
    }
  | {
      unit: string;
      /** extend: count today in the streak (1 after a missed day). reset: back to 0 if a whole day was missed */
      streak: "extend" | "reset";
      /** If this action changes more than this, all of the rule's changes wait for a person to give or refuse them (a hold) */
      hold_over?: number;
    };

export type ActivityCheck = {
  /** The key of the rule that made the check */
  rule: string;
  check:
    | "when"
    | "audience"
    | "time"
    | "property"
    | "balance"
    | "limit"
    | "action"
    | "unit"
    | "hold"
    | "budget"
    | "amount"
    | "streak"
    | "modifier";
  ok: boolean;
  /** The check in words: 08:12 is between 07:00 and 10:00 */
  detail: string;
};

export type ActivityItem = {
  /** The act_… ID */
  id: string;
  at: string;
  /** The person it happened to */
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person: an email, a user ID */
    external_id: string;
  };
  /** Who acted: "rule:<key>" for rules */
  by: string;
  via: "api" | "agent" | "lurky" | "dashboard" | "system";
  /** The agent's name when an agent or Lurky acted */
  agent: string | null;
  /** The event it came from; null for a change made by hand or by a schedule */
  event: {
    id: string;
    name: string;
  } | null;
  lines: ActivityLine[];
  /** The receipt this one undoes */
  reverses: string | null;
  /** The receipt that undid this one */
  reversed_by: string | null;
  /** What the person wrote when they gave by hand, or the reason on a spend; null otherwise */
  note: string | null;
  /** `spend` for value a brand took in exchange for something, `use` for something a person redeemed, `send` and `receive` for the two sides of one unit moving between people; null for a rule's change, a give or an undo */
  cause: "spend" | "use" | "send" | "receive" | null;
  /** The brand's own redemption or order ID on a spend; null otherwise */
  reference: string | null;
  /** On the two receipts of one `units.send`: the same ID on both, the sender's receipt ID. Null otherwise */
  transfer: string | null;
};

export type ActivityLine = {
  unit: string;
  /** Positive for giving, negative for taking */
  change: number;
  /** The person's balance of this unit after the change */
  balance: number;
  /** The key of the rule that made this change */
  rule: string | null;
};

export type ActivityList = {
  data: ActivityItem[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type AddAudienceUsersOutput = {
  id: string;
  added: number;
  already_in: number;
  /** IDs that matched no user. Nothing is created for them */
  not_found: string[];
  /** The audience's size now */
  users: number;
};

export type AdvanceClockInput = {
  days?: number;
  hours?: number;
  minutes?: number;
};

export type AgentKey = {
  id: string;
  /** The agent's name, as receipts say it */
  name: string;
  kind: "agent";
  /** The start of the key, safe to show; it identifies the key */
  prefix: string;
  created_at: string;
  /** When it last made a request, to the minute; null if never */
  last_used_at: string | null;
  /** Revoking takes effect at once */
  revoked_at: string | null;
};

export type AgentKeyList = {
  data: AgentKey[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type AmountFrom = {
  /** The event property to read, by its flat name: total_cents */
  from: string;
  /** Divide by this and round down. 100 turns cents into whole dollars. Default 1 */
  per?: number;
  /** Never more than this */
  max?: number;
};

export type ApiKey = {
  id: string;
  name: string;
  kind: "secret";
  /** The start of the key, safe to show; it identifies the key */
  prefix: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
};

export type ApiKeyList = {
  data: ApiKey[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type Approvers = "owners" | "owners_and_admins";

export type AssignableRole = "admin" | "developer" | "viewer";

export type Audience = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  kind: AudienceKind;
  /** Empty for a list audience */
  conditions: AudienceCondition[];
  /** The conditions in words: Active on 2 or more days of the last 21, seen in the last 7 days */
  summary: string;
  /** Members now (a condition audience: as of its last refresh) */
  users: number;
  /** When a condition audience's members were last worked out; rules see it as it stood then. Null for a list, and before the first run */
  refreshed_at: string | null;
  /** The rules that read it */
  used_by: AudienceReader[];
  created_at: string;
};

export type AudienceCondition =
  | {
      active: {
        days: number;
        within_days: number;
      };
    }
  | {
      first_seen: {
        within_days: number;
      };
    }
  | {
      inactive: {
        days: number;
      };
    }
  | {
      balance: {
        unit: string;
        gte: number;
      };
    }
  | {
      /** The sum of a number property over matching events. Money is in cents */
      property_total: {
        event: string;
        property: string;
        gte: number;
        within_days: number;
      };
    };

/** list: people added by hand or over the API. condition: kept up to date by its conditions */
export type AudienceKind = "list" | "condition";

export type AudienceList = {
  data: Audience[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type AudienceReader = {
  type: "rule" | "view";
  id: string;
  name: string;
  /** A rule's status; null for a view */
  status: "draft" | "live" | "paused" | null;
};

export type Brief = {
  /** The day it is about, `YYYY-MM-DD` in the project's time zone: yesterday */
  day: string;
  /** Yesterday in a sentence or two, in plain words. Null while the project has not heard anything yet, so there is nothing to say */
  line: string | null;
  /** People who did something */
  active_users: {
    /** Yesterday */
    value: number;
    /** The day before */
    previous: number;
  };
  /** People Lurk first heard of */
  new_users: {
    /** Yesterday */
    value: number;
    /** The day before */
    previous: number;
  };
  /** Events that came in */
  events: {
    /** Yesterday */
    value: number;
    /** The day before */
    previous: number;
  };
  /** What was given, the units with the most first; only those with something given */
  given: {
    /** The unit's key */
    unit: string;
    name: string;
    /** Given yesterday */
    amount: number;
    /** Given the day before */
    previous: number;
  }[];
};

export type Budget = {
  rule: {
    id: string;
    key: string;
    name: string;
  };
  unit: string;
  /** The cap for one window */
  amount: number;
  per: "day" | "week" | "month";
  /** Given so far in this window */
  used: number;
  /** The window the numbers are for, in the project's time zone */
  window_start: string;
  window_end: string;
};

export type BudgetList = {
  data: Budget[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type CardLine = {
  /** The field, as the proposal's `before` and `after` name it */
  field: string;
  /** What it is now; absent fields read as null */
  before?: unknown;
  /** What it will be; absent fields read as null */
  after?: unknown;
  /** The field in words: 'What it gives' */
  label: string;
  /** `before` in words, to show a person: '10 beans'; null when there was nothing */
  before_text: string | null;
  /** `after` in words, to show a person; null when it goes away */
  after_text: string | null;
};

export type CatalogEvent = {
  event: string;
  /** How many arrived in the last 30 days */
  count_30d: number;
  /** The newest one, within the last 30 days; null if none arrived */
  last_seen_at: string | null;
  /** The property names of the newest one. Names only, never values */
  properties: string[];
  /** The rules listening for it */
  rules: {
    id: string;
    key: string;
    name: string;
    status: "draft" | "live" | "paused";
  }[];
};

export type Condition =
  | {
      audience: string;
    }
  | {
      time: {
        between: unknown[];
      };
    }
  | {
      property: {
        name: string;
        equals: string | number | boolean;
      };
    }
  | {
      balance: {
        unit: string;
        gte: number;
      };
    };

export type CreateAgentKeyInput = {
  /** The agent's name, as receipts and proposals will say it: Claude Code */
  name: string;
};

export type CreateApiKeyInput = {
  /** What the key is for, e.g. the system that uses it */
  name: string;
  /** The key stops working at this time */
  expires_at?: string;
};

export type CreateAudienceInput =
  | {
      name: string;
      /** Defaults to a slug of the name */
      key?: string;
      description?: string;
      kind: "list";
    }
  | {
      name: string;
      /** Defaults to a slug of the name */
      key?: string;
      description?: string;
      kind: "condition";
      conditions: AudienceCondition[];
    };

export type CreatedAgentKey = {
  id: string;
  /** The agent's name, as receipts say it */
  name: string;
  kind: "agent";
  /** The start of the key, safe to show; it identifies the key */
  prefix: string;
  created_at: string;
  /** When it last made a request, to the minute; null if never */
  last_used_at: string | null;
  /** Revoking takes effect at once */
  revoked_at: string | null;
  /** The full key. It is shown once and cannot be retrieved later */
  secret: string;
};

export type CreatedApiKey = {
  id: string;
  name: string;
  kind: "secret";
  /** The start of the key, safe to show; it identifies the key */
  prefix: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  /** The full key. It is shown once and cannot be retrieved later */
  secret: string;
};

export type CreateDashboardInput = {
  name: string;
  unit?: string;
  tiles?: DashboardTileInput[];
};

export type CreatedWebhookEndpoint = {
  id: string;
  url: string;
  events: ("activity.created" | "rule.live" | "unit.used")[];
  description: string | null;
  status: "active" | "disabled";
  disabled_reason: "failing" | "manual" | null;
  created_at: string;
  /** Verifies the signature on each delivery. Shown once; Lurk cannot show it again */
  secret: string;
};

export type CreateExportInput = {
  /** What to export: receipts (`activity`) or people (`users`) */
  kind: "activity" | "users";
  /** The only format for now */
  format?: "csv";
  /** A usr_… ID */
  user?: string;
  /** A rule_… ID or the rule's key */
  rule?: string;
  /** Only receipts that changed this unit */
  unit?: string;
  since?: string;
  until?: string;
  /** The brand's own identifier, whole, to export one person */
  search?: string;
};

export type CreateOrganizationInput = {
  /** The brand's name, as people see it */
  name: string;
  /** Leave out to derive it from the name; a taken name gets -2, -3 and so on */
  slug?: string;
};

export type CreateProjectInput = {
  /** The organization it belongs to; you must be its owner or admin */
  organization_id: string;
  name: string;
  /** Unique in the organization. Leave out to derive it from the name */
  slug?: string;
  kind?: ProjectKind;
  /** For local-time rules when neither the event nor the user has a time zone */
  timezone?: string;
};

export type CreatePromotionInput = {
  /** The prj_… ID of the project to copy from, such as Staging */
  from: string;
  /** The prj_… ID of the project to copy into, such as Production */
  to: string;
  /** Rules to copy, by rul_… ID or key. The units they change are copied too, if the project does not have them */
  rules?: string[];
  /** Units to copy, by unit_… ID or key */
  units?: string[];
  title?: string;
  /** Why, for the person who decides */
  summary?: string;
};

export type CreatePromotionOutput = {
  /** The proposal made in the project it copies into, waiting for a person */
  proposal: {
    /** The prop_… ID */
    id: string;
    status: ProposalStatus;
    /** A headline: Morning regular goes live */
    title: string;
    summary: string;
    /** Who asked: "agent:<key id>", "key:<id>", "member:<id>" */
    by: string;
    via: "api" | "agent" | "lurky" | "dashboard" | "system";
    /** The agent's name: Claude Code */
    agent: string | null;
    changes: ProposalChange[];
    created_at: string;
    expires_at: string;
    decided_at: string | null;
    /** "member:<id>" of the person who decided */
    decided_by: string | null;
    /** The person's note on their decision */
    note: string | null;
    /** Where a person decides it; null where the dashboard's address is not known */
    url: string | null;
  };
  /** What approving it adds, in order: units first */
  included: PromotionItem[];
  skipped: PromotionSkipped[];
};

export type CreateProposalInput = {
  /** Defaults to the first change's summary */
  title?: string;
  /** Why, for the person who decides */
  summary?: string;
  changes: {
    operation: ProposableOperation;
    /** That operation's input */
    input: Record<string, unknown>;
  }[];
};

export type CreateRuleInput = {
  name: string;
  /** Defaults to a slug of the name */
  key?: string;
  when: RuleWhen;
  if?: Condition[];
  limit?: Limit[];
  do: Action[];
  /** Caps on what the rule gives everyone, not one person (limit does that). Leave out for none */
  budget?: RuleBudget[];
  /** Changes to what the rule gives, for some people, in order: VIPs get double. Leave out for none */
  modify?: Modifier[];
};

export type CreateUnitInput = {
  name: string;
  /** Defaults to a slug of the name */
  key?: string;
  /** Defaults to the name */
  singular?: string;
  group: UnitGroup;
  /** Defaults to amount */
  shows_as?: "amount" | "thing" | "level";
  /** Defaults to none: the app picks its own */
  color?: "blue" | "green" | "amber" | "red" | "purple" | "pink" | "teal" | "gray";
  /** Anything left out is the default: up and down, no cap, floor 0, no supply, no expiry, not usable, not sendable (100 a day if it is made so), no reset */
  switches?: {
    /** Rules can add to it */
    goes_up?: boolean;
    /** Rules can take from it. Off makes it earn-only */
    goes_down?: boolean;
    /** `units.spend` can take from it: a brand's server taking value for a reward. On by default for a unit that goes down; an earn-only unit is never spendable */
    spendable?: boolean;
    /** `units.use` can take one: a person redeeming the thing itself, a coupon or a ticket, which fires the `unit.used` webhook. Off by default; a unit that cannot go down is never usable */
    usable?: boolean;
    /** `units.send` can move it from one person to another. Off by default; a unit that cannot go down is never sendable. Units cannot be bought, cashed out or given a money value */
    sendable?: boolean;
    /** The most one person may send of it in a day, in the project's time zone. Always a number: a send is never unlimited. 100 by default */
    send_cap_per_day?: number;
    /** A rule's `reset` action can set it back to 0: a season's XP, a monthly count. Works for a unit that only goes up. Off by default */
    resets?: boolean;
    /** What a person first heard of from now on begins with, as a receipt written when they are first seen: a level starts at 1. People Lurk has already heard of keep what they hold. 0 for nothing. Not with a supply */
    starts_at?: number;
    /** The key of an audience to follow: a person holds exactly 1 while they are in it and 0 when they are not, kept by Lurk within minutes, as a pass or a role. Rules and gives cannot change it by hand. Needs a cap of 1 (set for you), and not an expiry, a supply or a start. Null for an ordinary unit */
    held_by?: string | null;
    /** Never more than this per person; a change that would pass it is refused whole. A badge is 1 */
    cap?: number | null;
    /** The lowest a balance may go. 0 normally; below 0 lets it be overdrawn */
    min_balance?: number;
    /** The brand's app shows it to people. A label: Lurk does not act on it */
    visible?: boolean;
    /** The most that can ever be given in all, across everyone: 40 in all. When it has run out a rule that would give it is skipped (`supply_gone`). Counted from when it is set; null for no limit */
    supply?: number | null;
    /** What is given expires this many days later, and is taken back; spending uses what expires first. Applies to what is given from now on; null for never */
    expires_after_days?: number | null;
    /** Everything of it ends at this moment: nothing is given after it, and what is held then expires and is taken back, whatever `expires_after_days` says. A ticket for an event on a date. Must be in the future when set; null for no end date */
    expires_at?: string | null;
  };
};

export type CreateViewInput = {
  name: string;
  /** Defaults to a slug of the name */
  key?: string;
  description?: string;
  definition: ViewDefinition;
};

export type CreateWebhookEndpointInput = {
  /** Where Lurk sends events. HTTPS only, on the public internet */
  url: string;
  /** Which events to send; all of them by default */
  events?: ("activity.created" | "rule.live" | "unit.used")[];
  /** A note for your team */
  description?: string;
};

export type CsvExport = {
  /** A name to save it under: activity-2026-10-12.csv */
  filename: string;
  content_type: "text/csv";
  /** The file, RFC 4180: a header row, then one row each, CRLF between */
  csv: string;
  /** Rows in the file, not counting the header */
  rows: number;
  /** True when more than 10,000 rows matched and the file stops there */
  truncated: boolean;
};

export type Dashboard = {
  id: string;
  name: string;
  /** Shown on Home. One per project */
  home: boolean;
  /** Pinned to your sidebar. Each member pins their own */
  pinned: boolean;
  /** Set when this is a unit's own dashboard */
  unit: string | null;
  tiles: DashboardTile[];
  updated_at: string;
  created_at: string;
};

export type DashboardList = {
  data: DashboardSummary[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type DashboardSummary = {
  id: string;
  name: string;
  /** Shown on Home. One per project */
  home: boolean;
  /** Pinned to your sidebar. Each member pins their own */
  pinned: boolean;
  /** Set when this is a unit's own dashboard */
  unit: string | null;
  tiles: number;
  updated_at: string;
};

export type DashboardTile = {
  /** The tile's key inside this dashboard */
  id: string;
  view: ViewSummary;
  /** Column, from 0 */
  x: number;
  /** Row, from 0 */
  y: number;
  /** Width in columns */
  w: number;
  /** Height in rows */
  h: number;
};

export type DashboardTileInput = {
  /** Keep a tile's key to keep it; leave it out for a new tile */
  id?: string;
  /** A view_… ID or the view's key */
  view: string;
  /** Column, from 0 */
  x: number;
  /** Row, from 0 */
  y: number;
  /** Width in columns */
  w: number;
  /** Height in rows */
  h: number;
};

export type DashboardWithAnswers = {
  id: string;
  name: string;
  /** Shown on Home. One per project */
  home: boolean;
  /** Pinned to your sidebar. Each member pins their own */
  pinned: boolean;
  /** Set when this is a unit's own dashboard */
  unit: string | null;
  tiles: DashboardTile[];
  updated_at: string;
  created_at: string;
  /** Each tile's answer, by the tile's `id`: the same as `views.get` for that tile's view */
  answers: Record<string, ViewAnswer>;
};

export type DecideHoldOutput = {
  /** The hold_… ID, as the audit log names it */
  id: string;
  hold: Hold;
  /** What was written when given; empty when refused */
  receipts: Receipt[];
};

export type DecideProposalOutput = {
  /** The prop_… ID, as the audit log names it */
  id: string;
  proposal: Proposal;
  /** What ran, in order; empty when declined */
  applied: {
    operation: ProposableOperation;
    target: string;
  }[];
};

export type DeclinedInvite = {
  id: string;
  declined: true;
};

export type DeletedWebhookEndpoint = {
  id: string;
  deleted: true;
};

export type DeleteLurkyConversationOutput = {
  id: string;
  deleted: true;
};

export type EndUser = {
  /** The usr_… ID */
  id: string;
  /** The brand's own identifier: an email, a user ID */
  external_id: string;
  /** When Lurk first heard of them */
  created_at: string;
  /** When they last did something, to the hour. Null until an event arrives after Lurk started keeping it */
  last_active_at: string | null;
  status: PersonStatus;
  /** What they hold now. Units at 0 are left out */
  balances: UnitBalance[];
};

export type EndUserDetail = {
  /** The usr_… ID */
  id: string;
  /** The brand's own identifier: an email, a user ID */
  external_id: string;
  /** When Lurk first heard of them */
  created_at: string;
  /** When they last did something, to the hour. Null until an event arrives after Lurk started keeping it */
  last_active_at: string | null;
  status: PersonStatus;
  /** What they hold now. Units at 0 are left out */
  balances: UnitBalance[];
  /** Their own time zone, when they have one; else the project's applies */
  timezone: string | null;
  /** How many receipts they have */
  receipts: number;
  last_receipt_at: string | null;
};

export type ErrorBody = {
  error: {
    status: number;
    code:
      | "invalid_json"
      | "invalid_key"
      | "forbidden"
      | "approval_required"
      | "not_found"
      | "idempotency_conflict"
      | "insufficient_balance"
      | "reference_used"
      | "validation_failed"
      | "rate_limited"
      | "internal"
      | "unavailable";
    message: string;
    param?: string;
    /** What to do about this kind of error, in one sentence. Always sent by current servers */
    next_step?: string;
    request_id: string;
    doc_url: string;
  };
};

export type EventsCatalog = {
  data: CatalogEvent[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type ExplainActivityOutput = {
  activity: ActivityItem;
  /** From the trace stored with the receipt, never reconstructed. Empty for receipts from before traces were stored */
  checks: ActivityCheck[];
  /** Whether this receipt has a stored trace */
  traced: boolean;
};

export type ExportDownload = {
  /** Where to fetch the file. Open it within `expires_at` */
  url: string;
  /** When the link stops working */
  expires_at: string;
  /** A name to save it under: activity-2026-10-12.csv.gz */
  filename: string;
  /** True when the link is on this API and needs the same sign-in (and `Lurk-Project`) as any call; false for a link that carries its own permission */
  requires_auth: boolean;
};

export type ExportJob = {
  /** The exp_… ID */
  id: string;
  kind: "activity" | "users";
  status: "queued" | "running" | "ready" | "failed" | "cancelled" | "expired";
  /** What it was asked to include */
  filters: Record<string, unknown>;
  /** Rows written so far, not counting the header */
  rows: number;
  /** Size of the file once ready, compressed */
  bytes: number;
  /** True when the job stopped at its limit of rows or size: narrow the filters and ask again */
  truncated: boolean;
  /** Why it failed, in a sentence */
  error: string | null;
  /** Who asked: "member:<id>" */
  requested_by: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  /** When the file is deleted; null until it is ready */
  expires_at: string | null;
};

export type ExportJobList = {
  data: ExportJob[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type FeedGiven = {
  /** The act_… ID */
  id: string;
  at: string;
  /** The person it happened to */
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person: an email, a user ID */
    external_id: string;
  };
  /** Who acted: "rule:<key>" for rules */
  by: string;
  via: "api" | "agent" | "lurky" | "dashboard" | "system";
  /** The agent's name when an agent or Lurky acted */
  agent: string | null;
  /** The event it came from; null for a change made by hand or by a schedule */
  event: {
    id: string;
    name: string;
  } | null;
  lines: ActivityLine[];
  /** The receipt this one undoes */
  reverses: string | null;
  /** The receipt that undid this one */
  reversed_by: string | null;
  /** What the person wrote when they gave by hand, or the reason on a spend; null otherwise */
  note: string | null;
  /** `spend` for value a brand took in exchange for something, `use` for something a person redeemed, `send` and `receive` for the two sides of one unit moving between people; null for a rule's change, a give or an undo */
  cause: "spend" | "use" | "send" | "receive" | null;
  /** The brand's own redemption or order ID on a spend; null otherwise */
  reference: string | null;
  /** On the two receipts of one `units.send`: the same ID on both, the sender's receipt ID. Null otherwise */
  transfer: string | null;
  kind: "given";
};

export type FeedHeld = {
  kind: "held";
  id: string;
  /** When it was held */
  at: string;
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
  };
  /** The rule: "rule:<key>" */
  by: string;
  rule: {
    id: string;
    key: string;
    name: string;
  };
  event: {
    id: string;
    name: string;
  };
  changes: {
    unit: string;
    change: number;
  }[];
  /** Why it waits: 900 beans is over 500, so a person decides */
  reason: string;
};

export type FeedItem = FeedGiven | FeedSkipped | FeedHeld;

export type FeedList = {
  data: FeedItem[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type FeedSkipped = {
  kind: "skipped";
  id: string;
  at: string;
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
  };
  /** The rule: "rule:<key>" */
  by: string;
  rule: {
    id: string;
    key: string;
    name: string;
  };
  event: {
    id: string;
    name: string;
  } | null;
  /** unit_setting: a unit's own setting stopped it (it cannot go up or down, or the change would pass its cap). hold_refused: a person refused the change a rule had held. budget_reached: the rule has given all its budget for this window. supply_gone: a unit with a limited supply has none left for the change */
  reason:
    | "condition_failed"
    | "limit_reached"
    | "insufficient_balance"
    | "unit_setting"
    | "hold_refused"
    | "budget_reached"
    | "supply_gone";
  /** The check that stopped it: limit, budget, audience, unit… */
  check: string;
};

export type GiveLine = {
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
  };
  status: "given" | "would_give" | "skipped";
  /** Why they were skipped: beans would be 1,100, past its cap of 1,000 */
  reason: string | null;
  /** What they hold after, when given */
  balance_after: number | null;
  /** Their receipt, once given */
  activity: string | null;
};

export type GivePreview = {
  unit: string;
  amount: number;
  people: GiveLine[];
  /** IDs that matched nobody. Nothing is created for them */
  not_found: string[];
  totals: {
    /** Who gets it (or would) */
    people: number;
    skipped: number;
    /** The total given (or that would be) */
    units: number;
  };
  /** Set when the give is counted against a rule's budget */
  budget: {
    rule: {
      id: string;
      key: string;
      name: string;
    };
    per: "day" | "week" | "month";
    max: number;
    used_before: number;
    /** With this give counted */
    used_after: number;
  } | null;
};

export type GiveUnitsInput = {
  /** The unit to give: its key */
  unit: string;
  /** What each person gets */
  amount: number;
  /** usr_… IDs or the brand's own IDs, up to 200 at a time */
  users: string[];
  /** Written on every receipt */
  note?: string;
  /** A rule (ID or key) with a budget in this unit: the give is counted in it and refused if it would pass it */
  count_against?: string;
};

export type GiveUnitsOutput = {
  /** The first receipt's act_… ID, as the audit log names it */
  id: string;
  unit: string;
  amount: number;
  people: GiveLine[];
  /** IDs that matched nobody. Nothing is created for them */
  not_found: string[];
  totals: {
    /** Who gets it (or would) */
    people: number;
    skipped: number;
    /** The total given (or that would be) */
    units: number;
  };
  /** Set when the give is counted against a rule's budget */
  budget: {
    rule: {
      id: string;
      key: string;
      name: string;
    };
    per: "day" | "week" | "month";
    max: number;
    used_before: number;
    /** With this give counted */
    used_after: number;
  } | null;
};

export type Held = {
  /** The hold_… ID */
  hold: string;
  /** The rule: "rule:<key>" */
  by: string;
  /** Why it waits: 900 beans is over 500, so a person decides */
  reason: string;
  changes: {
    unit: string;
    change: number;
  }[];
};

export type HideSuggestionInput = {
  /** The card's `id` */
  id: string;
  /** The card's `signature` when it was hidden */
  signature: string;
};

export type Hold = {
  id: string;
  status: HoldStatus;
  /** The person it would happen to */
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
  };
  rule: {
    id: string;
    key: string;
    name: string;
  };
  event: {
    id: string;
    name: string;
  };
  /** What the rule would do, all of it or none of it */
  changes: {
    unit: string;
    change: number;
  }[];
  /** Why it waits: 900 beans is over 500, so a person decides */
  reason: string;
  held_at: string;
  decided_at: string | null;
  /** Who decided: "member:<id>" */
  decided_by: string | null;
  note: string | null;
  /** The receipt written when it was given */
  activity: string | null;
};

export type HoldList = {
  data: Hold[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
  /** Holds waiting for a person */
  waiting: number;
};

export type HoldStatus = "held" | "given" | "refused";

export type InstallTemplateOutput = {
  template: string;
  installed_at: string;
  units: {
    id: string;
    key: string;
    name: string;
  }[];
  /** All drafts: a person takes them live */
  rules: {
    id: string;
    key: string;
    name: string;
  }[];
  views: {
    id: string;
    key: string;
    name: string;
  }[];
};

export type Integration = {
  /** The connector: your_app, mcp, webhooks, shopify, discord */
  key: string;
  name: string;
  description: string;
  directions: ("events_in" | "mirrored_out" | "agents")[];
  status: IntegrationStatus;
  /** A number worth showing, with its words: 2,200 "today", 3 "agents" */
  stat: {
    value: number;
    label: string;
  } | null;
  problems: IntegrationProblem[];
  /** When the project first had what makes it connected; null if it is not */
  connected_at: string | null;
};

export type IntegrationHealth = {
  /** The connector: your_app, mcp, webhooks, shopify, discord */
  key: string;
  status: IntegrationStatus;
  problems: IntegrationProblem[];
  checked_at: string;
};

export type IntegrationHealthOutput = {
  data: IntegrationHealth[];
  /** How many connectors need attention in all, for the sidebar */
  needs_attention: number;
};

export type IntegrationList = {
  data: Integration[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type IntegrationProblem = {
  /** Stable, for code: endpoint_failing */
  code: string;
  /** For a person: 2 endpoints stopped after repeated failures */
  message: string;
  /** What to do, in words */
  fix: string | null;
  /** Where to do it, when it is in the other app */
  fix_url: string | null;
};

export type IntegrationStatus = "connected" | "needs_attention" | "not_connected" | "later";

export type Invite = {
  status: "invited";
  /** The inv_… ID of the invitation */
  id: string;
  email: string;
  role: AssignableRole;
  /** The person who invited them (acct_… ID and name) */
  invited_by: {
    id: string;
    name: string;
  };
  invited_at: string;
  expires_at: string;
};

export type InviteMemberInput = {
  organization_id: string;
  email: string;
  role: AssignableRole;
};

export type Limit = {
  max: number;
  per: "day" | "week" | "month" | "ever";
  by?: "user";
};

export type LurkyConversation = {
  /** The lcv_… ID */
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  /** When it is deleted: 90 days after the last message */
  expires_at: string;
  /** Oldest first */
  messages: LurkyMessage[];
};

export type LurkyConversationList = {
  data: LurkyConversationSummary[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type LurkyConversationSummary = {
  /** The lcv_… ID */
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  /** When it is deleted: 90 days after the last message */
  expires_at: string;
};

export type LurkyMessage = {
  role: "user" | "assistant";
  text: string;
  /** What Lurky read to write this answer, in order */
  tools: {
    operation: string;
    ok: boolean;
  }[];
  /** The proposals Lurky put on a card in this answer (`prop_…`), in order. Read each with `proposals.card`: its state is the proposal's, so a card already applied says so */
  cards: string[];
  at: string;
};

export type LurkySettings = {
  /** The deployment has Lurky switched on */
  available: boolean;
  /** Lurky is on for this organization: its owner has not switched it off */
  enabled: boolean;
};

export type LurkyUsage = {
  /** Whether Lurky is switched on for the deployment */
  enabled: boolean;
  /** `warning` from 80% of the organization's allowance, `stopped` at 100% or when Lurky is paused for everyone */
  status: "off" | "ok" | "warning" | "stopped";
  /** What to tell the person, when there is something to say */
  message: string | null;
  /** The first day of the UTC month these figures are for */
  month: string;
  /** The first day of next month: when the allowance starts again */
  resets_on: string;
  /** The organization's allowance for the month, in cents, shared by all its projects */
  allowance_cents: number;
  /** What Lurky has cost this organization (all its projects) this month, in cents, to a thousandth */
  used_cents: number;
  /** Of the allowance, rounded down */
  percent: number;
  /** This project's calls this month */
  calls: number;
  tokens: {
    input: number;
    output: number;
    /** Input that came from the cache, at a fraction of the price */
    cache_read: number;
    cache_write: number;
  };
};

export type Me = {
  /** The acct_… ID of the person signed in */
  id: string;
  name: string;
  email: string;
  /** Your membership for the project the request names; null when it names none */
  membership: {
    /** The mem_… ID of your membership in the project's organization */
    id: string;
    organization_id: string;
    project_id: string;
    role: MemberRole;
  } | null;
};

export type Member = {
  status: "active";
  /** The mem_… ID of the membership */
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  joined_at: string;
  /** When they last used the dashboard; null if they never have */
  last_active_at: string | null;
};

export type MemberList = {
  data: (Member | Invite)[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
  /** Members and open invitations together */
  total: number;
};

export type MemberRole = "owner" | "admin" | "developer" | "viewer";

export type Modifier =
  | {
      /** Who it applies to: every clause must hold for the person */
      if: Condition[];
      /** Only the amount of this unit. Leave out for every unit the rule adds */
      unit?: string;
      /** Multiplies what the rule gives: 2 is double */
      times: number;
    }
  | {
      /** Who it applies to: every clause must hold for the person */
      if: Condition[];
      /** Only the amount of this unit. Leave out for every unit the rule adds */
      unit?: string;
      /** Adds this much more to what the rule gives */
      bonus: number;
    };

export type MyInvite = {
  /** The inv_… ID */
  id: string;
  organization: {
    id: string;
    name: string;
  };
  role: AssignableRole;
  invited_by: {
    id: string;
    name: string;
  };
  invited_at: string;
  expires_at: string;
};

export type MyInviteList = {
  data: MyInvite[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type Organization = {
  id: string;
  name: string;
  /** The first half of a project's path: sprout-coffee */
  slug: string;
  /** Your role in it */
  role: "owner" | "admin" | "developer" | "viewer";
  /** How many projects it holds */
  projects: number;
  created_at: string;
};

export type OrganizationList = {
  data: Organization[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

/** From is inclusive, to is exclusive */
export type Period = {
  from: string;
  to: string;
};

/** new: first heard of within the project's `new_for_days`. lapsing: older than that, and nothing from them for `lapsing_after_days`. returning: everyone else */
export type PersonStatus = "new" | "returning" | "lapsing";

export type PlanTemplateOutput = {
  template: string;
  units: {
    key: string;
    name: string;
    /** Already in the project: it's reused, not added again */
    exists: boolean;
  }[];
  rules: {
    key: string;
    name: string;
    /** Already in the project: it's reused, not added again */
    exists: boolean;
  }[];
  views: {
    key: string;
    name: string;
    /** Already in the project: it's reused, not added again */
    exists: boolean;
  }[];
  /** A simulated week through the real engine. Nothing is written */
  test_week: {
    /** Made-up users the week ran with */
    users: number;
    events: number;
    receipts: number;
    given: {
      unit: string;
      amount: number;
    }[];
    skipped: number;
  };
  /** What a person should check, in words */
  notes: string[];
};

export type PreviewPromotionOutput = {
  /** What approving it would add, in order: units first */
  included: PromotionItem[];
  skipped: PromotionSkipped[];
  /** True when `promotions.create` with this input would make a proposal */
  can_send: boolean;
  /** Why it would not, in a sentence for a person; null when it would */
  problem: string | null;
};

/** Nothing is given. The engine replays recorded events in memory */
export type PreviewRuleOutput = {
  /** What starts the rule. Only an event rule has a replay: for the others the replay numbers are zero and `schedule` or `balance` says what can be known */
  trigger: "event" | "schedule" | "balance";
  /** Set for a rule that starts on a schedule */
  schedule: {
    /** The project's time zone, which the times are read in */
    timezone: string;
    /** The next times it would run, soonest first, as instants */
    next: string[];
    /** How many people each run would go through: the audience it reads, or everyone */
    people: number;
    /** The key of the audience it walks, or null when it walks everyone in the project */
    audience: string | null;
  } | null;
  /** Set for a rule that starts when a balance moves */
  balance: {
    unit: string;
    /** The balance it starts at, for `reaches` */
    reaches: number | null;
    /** The step it repeats at, for `every` */
    every: number | null;
    /** The other rules that change this unit, which are what starts this one. Empty when nothing does */
    fed_by: {
      key: string;
      name: string;
      status: "draft" | "live" | "paused";
    }[];
    /** For `reaches`, how many people already hold that much (it starts for them only when a rule next changes the balance). Null for `every` */
    already_there: number | null;
  } | null;
  /** The rule's key */
  rule: string;
  /** The version previewed: the newest. Null when a definition was sent */
  version: number | null;
  period: RulePeriod;
  /** Events the rule listens for that were replayed */
  events: number;
  /** People it would have reached */
  users: number;
  /** Times it would have changed something */
  receipts: number;
  /** Times it would have waited for a person (a hold); these change nothing until given */
  held: number;
  /** What it would have given, per unit. Negative for taking */
  given: UnitTotal[];
  skipped: SkipCount[];
  top_users: PreviewUserTotal[];
  /** True when there were more events than a preview reads; it replayed the earliest ones */
  truncated: boolean;
  /** What the preview does not know, so its numbers are read as an estimate */
  notes: string[];
};

export type PreviewUserTotal = {
  /** The usr_… ID */
  user: string;
  given: UnitTotal[];
};

export type Project = {
  id: string;
  organization_id: string;
  name: string;
  /** Unique in its organization: production */
  slug: string;
  kind: ProjectKind;
  /** IANA time zone for local-time rules when neither the event nor the user has one */
  timezone: string;
  /** Who says yes to a proposal or a held change: owners only, or owners and admins */
  approvers: "owners" | "owners_and_admins";
  /** A person is `new` for this many days after Lurk first hears of them */
  new_for_days: number;
  /** A person with no event for this many days is `lapsing` (once no longer new) */
  lapsing_after_days: number;
  created_at: string;
};

export type ProjectClock = {
  /** True when this project's time has been moved from real time */
  test: boolean;
  /** What time it is in this project */
  now: string;
  /** What time it is outside the project */
  real_now: string;
  /** How far ahead of real time the project is */
  offset_seconds: number;
};

export type ProjectKind = "production" | "staging";

export type ProjectList = {
  data: Project[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type ProjectSetup = {
  /** In the order to do them */
  steps: SetupStep[];
  /** Every area, in the sidebar's order */
  areas: SetupAreaState[];
  /** The `id` of the first step that is not done; null when all are */
  next: string | null;
  /** Every step is done */
  complete: boolean;
  /** A rule is or has been live: the project is past setup and nothing is locked, for anyone who joins it */
  live: boolean;
};

export type PromotionItem = {
  type: "unit" | "rule";
  key: string;
  action: "create" | "update";
};

export type PromotionSkipped = {
  type: "unit" | "rule";
  key: string;
  /** Why it is not in the proposal: the unit is already there, or the rule is the same */
  reason: string;
};

export type ProposableOperation =
  | "rules.publish"
  | "rules.resume"
  | "units.create"
  | "rules.create"
  | "rules.update";

export type Proposal = {
  /** The prop_… ID */
  id: string;
  status: ProposalStatus;
  /** A headline: Morning regular goes live */
  title: string;
  summary: string;
  /** Who asked: "agent:<key id>", "key:<id>", "member:<id>" */
  by: string;
  via: "api" | "agent" | "lurky" | "dashboard" | "system";
  /** The agent's name: Claude Code */
  agent: string | null;
  changes: ProposalChange[];
  created_at: string;
  expires_at: string;
  decided_at: string | null;
  /** "member:<id>" of the person who decided */
  decided_by: string | null;
  /** The person's note on their decision */
  note: string | null;
  /** Where a person decides it; null where the dashboard's address is not known */
  url: string | null;
};

export type ProposalCard = {
  /** The prop_… ID: Apply decides this proposal and runs nothing else */
  id: string;
  status: ProposalStatus;
  title: string;
  /** Why, as the one who asked wrote it: words beside the diff, not the thing approved */
  summary: string;
  by: string;
  via: "api" | "agent" | "lurky" | "dashboard" | "system";
  agent: string | null;
  /** True only for an open proposal whose every change shows something that would differ */
  applicable: boolean;
  /** Why it can't be applied from a card; null when it can */
  refusal: string | null;
  changes: {
    operation: ProposableOperation;
    target: {
      type: string;
      id: string;
      name: string;
    };
    summary: string;
    /** What approving does and does not do: 'The live rule keeps running version 1 until a person takes the new one live.' Show it after Apply too */
    effect: string | null;
    lines: CardLine[];
  }[];
  expires_at: string;
  url: string | null;
};

export type ProposalChange = {
  operation: ProposableOperation;
  /** What it changes: a rule, with its ID and name */
  target: {
    type: string;
    id: string;
    name: string;
  };
  /** The change in words: Morning regular goes live */
  summary: string;
  /** The operation's input, as it will run */
  input: Record<string, unknown>;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  /** What approving does and does not do, said plainly: a live rule keeps running its live version until a person takes the new one live. Absent on proposals made before it existed */
  effect?: string | null;
};

export type ProposalList = {
  data: Proposal[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
  /** Open proposals, for the sidebar */
  waiting: number;
};

export type ProposalStatus = "open" | "approved" | "declined" | "expired";

export type Receipt = {
  /** Who acted: "rule:<key>", "member:<id>", "user:<id>" */
  by: string;
  via?: "api" | "agent" | "lurky" | "dashboard" | "system";
  agent?: string;
  unit: string;
  change: number;
  balance: number;
};

export type RemovedMember = {
  id: string;
  removed: true;
};

export type RemoveTemplateOutput = {
  template: string;
  /** Its draft rules, removed with it */
  removed_rules: string[];
  /** Live rules, units and views stay, and so does everything users earned */
  kept: {
    rules: number;
    units: number;
    views: number;
  };
};

export type ResetClockInput = Record<string, never>;

export type RevokedInvite = {
  id: string;
  revoked: true;
};

export type Rule = {
  id: string;
  key: string;
  name: string;
  status: "draft" | "live" | "paused";
  /** The newest version */
  version: number;
  /** The version running now; null if the rule has never been live */
  live_version: number | null;
  definition: {
    when: RuleWhen;
    if?: Condition[];
    limit?: Limit[];
    do: Action[];
    /** Caps on what the rule gives everyone, not one person (limit does that). Leave out for none */
    budget?: RuleBudget[];
    /** Changes to what the rule gives, for some people, in order: VIPs get double. Leave out for none */
    modify?: Modifier[];
  };
};

export type RuleBudget = {
  unit: string;
  /** The most the rule may give of this unit in one window */
  max: number;
  /** The window, in the project's time zone */
  per: "day" | "week" | "month";
};

/** How many rules each status has, with the other filters applied and the status filter ignored */
export type RuleCounts = {
  all: number;
  live: number;
  paused: number;
  draft: number;
};

export type RuleDetail = {
  id: string;
  key: string;
  name: string;
  status: "draft" | "live" | "paused";
  /** The newest version */
  version: number;
  /** The version running now; null if the rule has never been live */
  live_version: number | null;
  definition: {
    when: RuleWhen;
    if?: Condition[];
    limit?: Limit[];
    do: Action[];
    /** Caps on what the rule gives everyone, not one person (limit does that). Leave out for none */
    budget?: RuleBudget[];
    /** Changes to what the rule gives, for some people, in order: VIPs get double. Leave out for none */
    modify?: Modifier[];
  };
  /** The units its actions change */
  units: string[];
  created_at: string;
  updated_at: string;
  /** What is running now; null if the rule has never been live. Differs from `definition` while an edit waits */
  live_definition: {
    when: RuleWhen;
    if?: Condition[];
    limit?: Limit[];
    do: Action[];
    /** Caps on what the rule gives everyone, not one person (limit does that). Leave out for none */
    budget?: RuleBudget[];
    /** Changes to what the rule gives, for some people, in order: VIPs get double. Leave out for none */
    modify?: Modifier[];
  } | null;
};

export type RuleList = {
  data: RuleListItem[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
  counts: RuleCounts;
};

export type RuleListItem = {
  id: string;
  key: string;
  name: string;
  status: "draft" | "live" | "paused";
  /** The newest version */
  version: number;
  /** The version running now; null if the rule has never been live */
  live_version: number | null;
  definition: {
    when: RuleWhen;
    if?: Condition[];
    limit?: Limit[];
    do: Action[];
    /** Caps on what the rule gives everyone, not one person (limit does that). Leave out for none */
    budget?: RuleBudget[];
    /** Changes to what the rule gives, for some people, in order: VIPs get double. Leave out for none */
    modify?: Modifier[];
  };
  /** The units its actions change */
  units: string[];
  created_at: string;
  updated_at: string;
};

export type RulePeriod = {
  from: string;
  to: string;
};

/** What the rule actually did, from the receipts */
export type RuleStatsOutput = {
  /** The rule's key */
  rule: string;
  period: RulePeriod;
  /** Times it changed something */
  receipts: number;
  /** People it reached */
  users: number;
  /** What it gave, per unit. Negative for taking */
  given: UnitTotal[];
  /** Times it did not apply. Skips are kept for 30 days, so a longer period shows the last 30 */
  skipped: SkipCount[];
  /** The people it reached most in the period, by number of receipts, then by amount, then by ID */
  top_users: RuleStatsUser[];
};

export type RuleStatsUser = {
  /** The usr_… ID */
  id: string;
  /** The brand's own identifier for the person */
  external_id: string;
  /** Times the rule changed something for them in the period */
  receipts: number;
  /** What they got in the period, per unit; negative for taking */
  given: UnitTotal[];
};

export type RuleWhen =
  | {
      event: string;
    }
  | {
      schedule: Schedule;
    }
  | {
      /** The unit whose balance is watched */
      unit: string;
      /** Fires when a change takes the balance from below this to this or more */
      reaches: number;
    }
  | {
      /** The unit whose balance is watched */
      unit: string;
      /** Fires each time a change takes the balance up across a multiple of this: every 100 XP. A change that crosses several multiples fires it once for each, up to 10 */
      every: number;
    };

export type Schedule = {
  every: "day" | "week" | "month";
  /** The time of day in the project's time zone: 09:00 */
  at: string;
  /** For every week, the day (mon to sun); for every month, the day of the month (1 to 28). Leave out for every day */
  on?: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | number;
};

export type SendEventInput = {
  event: string;
  user: string;
  properties?: Record<
    string,
    string | number | boolean | null | (string | number | boolean | null)[]
  >;
  idempotency_key: string;
  timestamp?: string;
};

export type SendEventOutput = {
  /** The receipt envelope, or null when nothing changed */
  activity: string | null;
  user: string;
  event: string;
  receipts: Receipt[];
  skipped: Skipped[];
  /** Changes that wait for a person to give or refuse them; none have been made */
  held?: Held[];
};

export type SendUnitsInput = {
  /** The sender: a usr_… ID or the brand's own ID */
  from: string;
  /** The receiver: a usr_… ID or the brand's own ID */
  to: string;
  /** The unit to send: its key */
  unit: string;
  /** How much to send */
  amount: number;
  /** A note both receipts carry: A thank-you */
  reason?: string;
};

export type SendUnitsOutput = {
  /** The sender's receipt ID, also on the receiver's receipt */
  transfer: string;
  /** The receiver's receipt ID */
  receipt: string;
  from: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
    /** What they hold now */
    balance_after: number;
  };
  to: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
    /** What they hold now */
    balance_after: number;
  };
  unit: string;
  amount: number;
  /** What the sender has sent of this unit today, with this send */
  sent_today: number;
  /** What one person may send of it in a day */
  daily_limit: number;
};

export type SetClockInput = {
  /** The time the project should think it is. Not earlier than now */
  to: string;
};

export type SetupArea =
  | "home"
  | "dashboards"
  | "users"
  | "activity"
  | "rules"
  | "units"
  | "audiences"
  | "events"
  | "promote"
  | "templates"
  | "integrations"
  | "developers"
  | "partners"
  | "settings";

export type SetupAreaState = {
  area: SetupArea;
  locked: boolean;
  /** The step that opens it (its `id`); null for an area that is always open */
  opened_by: string | null;
};

export type SetupStep = {
  /** A short word for the step: `unit`, `rule`, `event` or `live`. More steps can be added, so an app shows one it does not know by its title */
  id: string;
  /** What the step is, in a few words */
  title: string;
  /** Why it matters and what to do, in a sentence */
  line: string;
  /** What to ask Lurky to be helped with this step */
  ask: string;
  /** Worked out from what the project has, so what an agent did through the API counts */
  done: boolean;
  /** The areas that open when this step is done */
  opens: SetupArea[];
};

export type ShowSuggestionInput = {
  /** The card's `id` */
  id: string;
};

export type SkipCount = {
  /** unit_setting: a unit's own setting stopped it (it cannot go up or down, or the change would pass its cap). hold_refused: a person refused the change a rule had held. budget_reached: the rule has given all its budget for this window. supply_gone: a unit with a limited supply has none left for the change */
  reason:
    | "condition_failed"
    | "limit_reached"
    | "insufficient_balance"
    | "unit_setting"
    | "hold_refused"
    | "budget_reached"
    | "supply_gone";
  count: number;
};

export type Skipped = {
  by: string;
  /** unit_setting: a unit's own setting stopped it (it cannot go up or down, or the change would pass its cap). hold_refused: a person refused the change a rule had held. budget_reached: the rule has given all its budget for this window. supply_gone: a unit with a limited supply has none left for the change */
  reason:
    | "condition_failed"
    | "limit_reached"
    | "insufficient_balance"
    | "unit_setting"
    | "hold_refused"
    | "budget_reached"
    | "supply_gone";
  check: string;
};

export type SpendUnitsInput = {
  /** The person: a usr_… ID or the brand's own ID */
  user: string;
  /** The unit to take: its key */
  unit: string;
  /** How much to take */
  amount: number;
  /** What it was for, written on the receipt: Free coffee */
  reason: string;
  /** The brand's own redemption or order ID. It can be used once per unit: a second spend with it is refused with `reference_used`. Matching is exact and case-sensitive (`ORD-1` and `ord-1` are two), after the text is put in Unicode NFC form */
  reference?: string;
};

export type SpendUnitsOutput = {
  /** The receipt's act_… ID, as the audit log names it */
  id: string;
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
  };
  unit: string;
  /** What was taken */
  amount: number;
  /** What the person holds now */
  balance_after: number;
  /** The reference it was spent under */
  reference: string | null;
};

export type Suggestion = {
  /** The subject, the same for as long as the card lasts: `approval:prop_…`, `holds`, `budget:<rule key>`, `integration:<key>`, `lapsing`, `edit:<rule key>`, `paused:<rule key>`, `unheard:<event>`, `silent:<event>` */
  id: string;
  /** What kind of card: `approval`, `holds`, `budget`, `integration`, `lapsing`, `edit`, `paused`, `unheard` or `silent`. More kinds can be added, so an app shows one it does not know by its title */
  kind: string;
  tier: SuggestionTier;
  /** The card, in a line */
  title: string;
  /** The evidence: what the project's data says */
  why: string;
  /** What to ask Lurky when the card is tapped; null for a card that is a decision with its own page, which opens it instead */
  ask: string | null;
  /** The page the card is about, for where Lurky cannot answer */
  opens: {
    page: SuggestionPage;
    /** The thing on that page: a rule's key, or a proposal's ID for `approve` */
    id: string | null;
  };
  /** Changes when the signal does. A card the member hid comes back when this is not what they hid */
  signature: string;
};

export type SuggestionHidden = {
  id: string;
  hidden: boolean;
};

export type SuggestionList = {
  /** At most six, most urgent first: up to three that need the member, then what changed, then at most one idea. Without the ones this member hid */
  data: Suggestion[];
  /** How many cards the project has right now, before the six and before hiding */
  total: number;
};

export type SuggestionPage =
  | "home"
  | "dashboards"
  | "users"
  | "activity"
  | "rules"
  | "units"
  | "audiences"
  | "events"
  | "promote"
  | "templates"
  | "integrations"
  | "developers"
  | "partners"
  | "settings"
  | "approve";

export type SuggestionTier = "needs_you" | "change" | "idea";

export type Template = {
  id: string;
  key: string;
  name: string;
  /** One line: A reason to come back every day. */
  tagline: string;
  /** Who it suits, in words: Cafés, gyms, habit apps */
  for: string;
  category: TemplateCategory;
  status: TemplateStatus;
  counts: {
    units: number;
    rules: number;
    views: number;
  };
  description: string;
  adds: {
    units: {
      key: string;
      name: string;
    }[];
    /** They arrive as drafts */
    rules: {
      key: string;
      name: string;
    }[];
    views: {
      key: string;
      name: string;
    }[];
  };
  settings: TemplateSetting[];
  installed_at: string | null;
};

export type TemplateCategory = "earn_and_spend" | "progress" | "growth_and_community";

export type TemplateList = {
  data: TemplateSummary[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type TemplateSetting = {
  key: string;
  label: string;
  type: "text" | "integer" | "unit";
  default: string | number;
};

export type TemplateStatus = "available" | "in_use" | "later";

export type TemplateSummary = {
  id: string;
  key: string;
  name: string;
  /** One line: A reason to come back every day. */
  tagline: string;
  /** Who it suits, in words: Cafés, gyms, habit apps */
  for: string;
  category: TemplateCategory;
  status: TemplateStatus;
  counts: {
    units: number;
    rules: number;
    views: number;
  };
};

export type UndoActivityOutput = {
  /** The act_… ID of the new receipt, as the audit log names it */
  id: string;
  /** The new receipt: its `reverses` is the one undone */
  activity: {
    /** The act_… ID */
    id: string;
    at: string;
    /** The person it happened to */
    user: {
      /** The usr_… ID */
      id: string;
      /** The brand's own identifier for the person: an email, a user ID */
      external_id: string;
    };
    /** Who acted: "rule:<key>" for rules */
    by: string;
    via: "api" | "agent" | "lurky" | "dashboard" | "system";
    /** The agent's name when an agent or Lurky acted */
    agent: string | null;
    /** The event it came from; null for a change made by hand or by a schedule */
    event: {
      id: string;
      name: string;
    } | null;
    lines: ActivityLine[];
    /** The receipt this one undoes */
    reverses: string | null;
    /** The receipt that undid this one */
    reversed_by: string | null;
    /** What the person wrote when they gave by hand, or the reason on a spend; null otherwise */
    note: string | null;
    /** `spend` for value a brand took in exchange for something, `use` for something a person redeemed, `send` and `receive` for the two sides of one unit moving between people; null for a rule's change, a give or an undo */
    cause: "spend" | "use" | "send" | "receive" | null;
    /** The brand's own redemption or order ID on a spend; null otherwise */
    reference: string | null;
    /** On the two receipts of one `units.send`: the same ID on both, the sender's receipt ID. Null otherwise */
    transfer: string | null;
  };
};

export type Unit = {
  /** The unit_… ID */
  id: string;
  key: string;
  name: string;
  /** One of it: Bean, day, Free drink */
  singular: string;
  group: UnitGroup;
  /** amount: a token and a number. thing: its own art, like a badge. level: a hexagon with the level in it */
  shows_as: "amount" | "thing" | "level";
  /** The colour apps draw it in (a level's hexagon, a chart's line). Null until one is chosen: the app picks its own */
  color: "blue" | "green" | "amber" | "red" | "purple" | "pink" | "teal" | "gray" | null;
  switches: UnitSwitches;
  stats: UnitStats;
  created_at: string;
  updated_at: string;
};

export type UnitBalance = {
  unit: string;
  amount: number;
};

export type UnitGroup = "points" | "progress" | "badge" | "perk";

export type UnitList = {
  data: Unit[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
  /** Units in each group */
  counts: {
    all: number;
    points: number;
    progress: number;
    badge: number;
    perk: number;
  };
};

export type UnitShowsAs = "amount" | "thing" | "level";

export type UnitStats = {
  /** The total across everyone right now */
  held: number;
  /** People with a balance above 0 */
  holders: number;
  /** Added in the last 30 days */
  given_30d: number;
  /** Taken in the last 30 days */
  spent_30d: number;
  /** Given so far against the supply, counted from when the supply was set; 0 without one */
  issued: number;
};

export type UnitSwitches = {
  /** Rules can add to it */
  goes_up: boolean;
  /** Rules can take from it. Off makes it earn-only */
  goes_down: boolean;
  /** `units.spend` can take from it: a brand's server taking value for a reward. On by default for a unit that goes down; an earn-only unit is never spendable */
  spendable: boolean;
  /** `units.use` can take one: a person redeeming the thing itself, a coupon or a ticket, which fires the `unit.used` webhook. Off by default; a unit that cannot go down is never usable */
  usable: boolean;
  /** `units.send` can move it from one person to another. Off by default; a unit that cannot go down is never sendable. Units cannot be bought, cashed out or given a money value */
  sendable: boolean;
  /** The most one person may send of it in a day, in the project's time zone. Always a number: a send is never unlimited. 100 by default */
  send_cap_per_day: number;
  /** A rule's `reset` action can set it back to 0: a season's XP, a monthly count. Works for a unit that only goes up. Off by default */
  resets: boolean;
  /** What a person first heard of from now on begins with, as a receipt written when they are first seen: a level starts at 1. People Lurk has already heard of keep what they hold. 0 for nothing. Not with a supply */
  starts_at: number;
  /** The key of an audience to follow: a person holds exactly 1 while they are in it and 0 when they are not, kept by Lurk within minutes, as a pass or a role. Rules and gives cannot change it by hand. Needs a cap of 1 (set for you), and not an expiry, a supply or a start. Null for an ordinary unit */
  held_by: string | null;
  /** Never more than this per person; a change that would pass it is refused whole. A badge is 1 */
  cap: number | null;
  /** The lowest a balance may go. 0 normally; below 0 lets it be overdrawn */
  min_balance: number;
  /** The brand's app shows it to people. A label: Lurk does not act on it */
  visible: boolean;
  /** The most that can ever be given in all, across everyone: 40 in all. When it has run out a rule that would give it is skipped (`supply_gone`). Counted from when it is set; null for no limit */
  supply: number | null;
  /** What is given expires this many days later, and is taken back; spending uses what expires first. Applies to what is given from now on; null for never */
  expires_after_days: number | null;
  /** Everything of it ends at this moment: nothing is given after it, and what is held then expires and is taken back, whatever `expires_after_days` says. A ticket for an event on a date. Must be in the future when set; null for no end date */
  expires_at: string | null;
};

export type UnitTotal = {
  unit: string;
  amount: number;
};

export type UpdateLurkySettingsInput = {
  /** On: Lurky can answer members of this organization's projects */
  enabled: boolean;
};

export type UserList = {
  data: EndUser[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
  /** How many people match, across every page. Only when `include=total` was sent */
  total?: number;
};

export type UseUnitsInput = {
  /** The person: a usr_… ID or the brand's own ID */
  user: string;
  /** The unit to use: its key */
  unit: string;
  /** How many to use. One by default */
  amount?: number;
  /** Where or why, written on the receipt: Table 4. `Used` when left out */
  reason?: string;
  /** The brand's own scan or redemption ID. It can be used once per unit: a second use with it is refused with `reference_used`. Matching is exact and case-sensitive, after the text is put in Unicode NFC form */
  reference?: string;
};

export type UseUnitsOutput = {
  /** The receipt's act_… ID, as the audit log names it */
  id: string;
  user: {
    /** The usr_… ID */
    id: string;
    /** The brand's own identifier for the person */
    external_id: string;
  };
  unit: string;
  /** How many were used */
  amount: number;
  /** What the person holds now */
  balance_after: number;
  /** The reference it was spent under */
  reference: string | null;
};

export type View = {
  id: string;
  key: string;
  name: string;
  shape: "number" | "over_time" | "list";
  visibility: ViewVisibility;
  updated_at: string;
  description: string | null;
  definition: ViewDefinition;
  /** Where it answers: /v1/views/returning-users */
  endpoint: string;
  made_by: "template" | "member" | "key" | "agent";
  template: string | null;
  dashboards: {
    id: string;
    name: string;
  }[];
  created_at: string;
};

export type ViewAnswer = {
  period: Period;
  compared_with: (Period & Record<string, never>) | null;
  series: ViewSeries[];
  /** Empty unless the shape is list */
  rows: ViewRow[];
  /** How many rows a list has in all */
  total_rows: number | null;
  computed_at: string;
};

export type ViewDefinition = {
  who: ViewWho;
  what: ViewMeasure[];
  over: ViewRange;
  shape: ViewShape;
};

export type ViewList = {
  data: ViewSummary[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};

export type ViewMeasure =
  | {
      measure: "active_users" | "returning_users" | "new_users";
    }
  | {
      measure: "events";
      /** Leave it out to count every event */
      event?: string;
    }
  | {
      measure: "given" | "spent" | "held";
      unit: string;
    };

export type ViewPoint = {
  at: string;
  value: number;
};

export type ViewRange =
  | "now"
  | "today"
  | "this_week"
  | "last_week"
  | "last_7_days"
  | "last_14_days"
  | "last_30_days"
  | "last_90_days"
  | "this_month"
  | "all_time";

export type ViewRow = {
  rank: number;
  /** What a person reads: a user's identifier, a rule's name */
  label: string;
  user: {
    id: string;
    external_id: string;
  } | null;
  rule: {
    id: string;
    key: string;
    name: string;
  } | null;
  /** The first measure */
  value: number;
  /** Rank in the compared range */
  previous_rank: number | null;
  /** One per measure */
  values: number[];
};

export type ViewSeries = {
  measure: ViewMeasure;
  unit: string | null;
  /** The whole range: a sum for flows, what is held at its end, unique people for people */
  total: number;
  /** The same over the compared range; null without compare */
  previous_total: number | null;
  /** Empty unless the shape is over_time */
  points: ViewPoint[];
  /** The compared range, aligned to points */
  previous_points: ViewPoint[];
};

export type ViewShape =
  | {
      type: "number";
    }
  | {
      type: "over_time";
      every: "day" | "week" | "month";
    }
  | {
      type: "list";
      /** Rank users, or rank rules */
      by: "user" | "rule";
      /** How many rows */
      size: number;
    };

export type ViewSummary = {
  id: string;
  key: string;
  name: string;
  shape: "number" | "over_time" | "list";
  visibility: ViewVisibility;
  updated_at: string;
};

export type ViewVisibility = "team";

export type ViewWho =
  | "everyone"
  | {
      /** An aud_… ID or the audience's key */
      audience: string;
    };

export type ViewWithAnswer = {
  id: string;
  key: string;
  name: string;
  shape: "number" | "over_time" | "list";
  visibility: ViewVisibility;
  updated_at: string;
  description: string | null;
  definition: ViewDefinition;
  /** Where it answers: /v1/views/returning-users */
  endpoint: string;
  made_by: "template" | "member" | "key" | "agent";
  template: string | null;
  dashboards: {
    id: string;
    name: string;
  }[];
  created_at: string;
  answer: ViewAnswer;
};

export type WebhookEndpoint = {
  id: string;
  url: string;
  events: ("activity.created" | "rule.live" | "unit.used")[];
  description: string | null;
  status: "active" | "disabled";
  disabled_reason: "failing" | "manual" | null;
  created_at: string;
};

export type WebhookEndpointList = {
  data: WebhookEndpoint[];
  /** Whether there are older items after this page */
  has_more: boolean;
  next_cursor: string | null;
};
