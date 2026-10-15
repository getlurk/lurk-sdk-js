// Generated from openapi/openapi.json by scripts/generate.ts. Do not edit.
import type {
  Action,
  ActivityList,
  AddAudienceUsersOutput,
  AdvanceClockInput,
  AgentKey,
  AgentKeyList,
  ApiKey,
  ApiKeyList,
  Approvers,
  AssignableRole,
  Audience,
  AudienceKind,
  AudienceList,
  Brief,
  BudgetList,
  Condition,
  CreateAgentKeyInput,
  CreateApiKeyInput,
  CreateDashboardInput,
  CreatedAgentKey,
  CreatedApiKey,
  CreatedWebhookEndpoint,
  CreateExportInput,
  CreateOrganizationInput,
  CreateProjectInput,
  CreatePromotionInput,
  CreatePromotionOutput,
  CreateProposalInput,
  CreateRuleInput,
  CreateUnitInput,
  CreateViewInput,
  CreateWebhookEndpointInput,
  CsvExport,
  Dashboard,
  DashboardList,
  DashboardSummary,
  DashboardTileInput,
  DashboardWithAnswers,
  DecideHoldOutput,
  DecideProposalOutput,
  DeclinedInvite,
  DeletedWebhookEndpoint,
  DeleteLurkyConversationOutput,
  EndUserDetail,
  EventsCatalog,
  ExplainActivityOutput,
  ExportDownload,
  ExportJob,
  ExportJobList,
  FeedList,
  GivePreview,
  GiveUnitsInput,
  GiveUnitsOutput,
  HideSuggestionInput,
  Hold,
  HoldList,
  InstallTemplateOutput,
  IntegrationHealthOutput,
  IntegrationList,
  Invite,
  InviteMemberInput,
  Limit,
  LurkyConversation,
  LurkyConversationList,
  LurkySettings,
  LurkyUsage,
  Me,
  Member,
  MemberList,
  Modifier,
  MyInviteList,
  Organization,
  OrganizationList,
  PlanTemplateOutput,
  PreviewPromotionOutput,
  PreviewRuleOutput,
  Project,
  ProjectClock,
  ProjectList,
  ProjectSetup,
  Proposal,
  ProposalCard,
  ProposalList,
  RemovedMember,
  RemoveTemplateOutput,
  RevokedInvite,
  Rule,
  RuleBudget,
  RuleDetail,
  RuleList,
  RuleStatsOutput,
  RuleWhen,
  SendEventInput,
  SendEventOutput,
  SendUnitsInput,
  SendUnitsOutput,
  SetClockInput,
  ShowSuggestionInput,
  SpendUnitsInput,
  SpendUnitsOutput,
  SuggestionHidden,
  SuggestionList,
  Template,
  TemplateCategory,
  TemplateList,
  UndoActivityOutput,
  Unit,
  UnitGroup,
  UnitList,
  UnitShowsAs,
  UpdateLurkySettingsInput,
  UserList,
  UseUnitsInput,
  UseUnitsOutput,
  View,
  ViewList,
  ViewMeasure,
  ViewRange,
  ViewShape,
  ViewWho,
  ViewWithAnswer,
  WebhookEndpointList,
} from "./schema.ts";

/** Send an event */
export type EventsSendInput = Omit<SendEventInput, "idempotency_key"> & {
  idempotency_key?: string;
};

export type EventsSendOutput = SendEventOutput;

/** List the events this project has */
export type EventsCatalogInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Part of the event name */
  search?: string;
};

export type EventsCatalogOutput = EventsCatalog;

/** List receipts */
export type ActivityListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** A usr_… ID */
  user?: string;
  /** A rule_… ID or the rule's key */
  rule?: string;
  /** Only receipts that changed this unit */
  unit?: string;
  /** Only receipts of this kind: `spend`, `use`, `send` or `receive` */
  cause?: "spend" | "use" | "send" | "receive";
  /** Only the two receipts of one `units.send`: the `transfer` ID of either receipt (the sender's receipt ID) */
  transfer?: string;
  since?: string;
  until?: string;
};

export type ActivityListOutput = ActivityList;

/** Export receipts as CSV */
export type ActivityExportInput = {
  /** A usr_… ID */
  user?: string;
  /** A rule_… ID or the rule's key */
  rule?: string;
  /** Only receipts that changed this unit */
  unit?: string;
  since?: string;
  until?: string;
};

export type ActivityExportOutput = CsvExport;

/** Explain a receipt */
export type ActivityExplainInput = {
  id: string;
};

export type ActivityExplainOutput = ExplainActivityOutput;

/** Undo a receipt */
export type ActivityUndoInput = {
  id: string;
};

export type ActivityUndoOutput = UndoActivityOutput;

/** List people */
export type UsersListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** The brand's own identifier, whole. Identifiers are kept sealed, so there is no partial match */
  search?: string;
  /** An audience's key or `aud_…` ID: only the people in it */
  audience?: string;
  /** Only the people with this status, as the project defines it (`new_for_days`, `lapsing_after_days`) */
  status?: "new" | "returning" | "lapsing";
  /** By when Lurk first heard of them. `newest` by default */
  sort?: "newest" | "oldest";
  /** Send `total` to also get `total`, how many people match the search and the audience (the whole list, not this page) */
  include?: "total";
};

export type UsersListOutput = UserList;

/** Export people as CSV */
export type UsersExportInput = {
  /** The brand's own identifier, whole, to export one person */
  search?: string;
};

export type UsersExportOutput = CsvExport;

/** Get a person */
export type UsersGetInput = {
  id: string;
};

export type UsersGetOutput = EndUserDetail;

/** List units */
export type UnitsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  group?: UnitGroup;
};

export type UnitsListOutput = UnitList;

/** Create a unit */
export type UnitsCreateInput = CreateUnitInput;

export type UnitsCreateOutput = Unit;

/** Get a unit */
export type UnitsGetInput = {
  id: string;
};

export type UnitsGetOutput = Unit;

/** Change a unit */
export type UnitsUpdateInput = {
  id: string;
} & {
  name?: string;
  singular?: string;
  group?: UnitGroup;
  shows_as?: UnitShowsAs;
  /** A colour, or null to clear it */
  color?: "blue" | "green" | "amber" | "red" | "purple" | "pink" | "teal" | "gray" | null;
  /** Only the settings to change */
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

export type UnitsUpdateOutput = Unit;

/** Create a rule as a draft */
export type RulesCreateInput = CreateRuleInput;

export type RulesCreateOutput = Rule;

/** List rules */
export type RulesListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  status?: "draft" | "live" | "paused";
  /** Only rules that change this unit */
  unit?: string;
  /** Only rules that hear this event */
  event?: string;
  /** Part of the name or key */
  search?: string;
};

export type RulesListOutput = RuleList;

/** Take a rule live */
export type RulesPublishInput = {
  id: string;
};

export type RulesPublishOutput = Rule;

/** Get a rule */
export type RulesGetInput = {
  id: string;
};

export type RulesGetOutput = RuleDetail;

/** Edit a rule */
export type RulesUpdateInput = {
  id: string;
} & {
  name?: string;
  when?: RuleWhen;
  if?: Condition[];
  limit?: Limit[];
  do?: Action[];
  budget?: RuleBudget[];
  modify?: Modifier[];
};

export type RulesUpdateOutput = Rule;

/** Pause a rule */
export type RulesPauseInput = {
  id: string;
};

export type RulesPauseOutput = Rule;

/** Start a paused rule again */
export type RulesResumeInput = {
  id: string;
};

export type RulesResumeOutput = Rule;

/** Preview a rule */
export type RulesPreviewInput = {
  id: string;
} & {
  /** How many past days to look at, 1 to 90 */
  days?: number;
  /** Preview this instead of the saved version: an edit that is not saved yet */
  definition?: {
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

export type RulesPreviewOutput = PreviewRuleOutput;

/** What a rule did */
export type RulesStatsInput = {
  id: string;
  /** How many past days to look at, 1 to 90 */
  days?: number;
};

export type RulesStatsOutput = RuleStatsOutput;

/** Create a project API key */
export type ApiKeysCreateInput = CreateApiKeyInput;

export type ApiKeysCreateOutput = CreatedApiKey;

/** List project API keys */
export type ApiKeysListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type ApiKeysListOutput = ApiKeyList;

/** Revoke a project API key */
export type ApiKeysRevokeInput = {
  id: string;
};

export type ApiKeysRevokeOutput = ApiKey;

/** Add a webhook endpoint */
export type WebhookEndpointsCreateInput = CreateWebhookEndpointInput;

export type WebhookEndpointsCreateOutput = CreatedWebhookEndpoint;

/** List webhook endpoints */
export type WebhookEndpointsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type WebhookEndpointsListOutput = WebhookEndpointList;

/** Delete a webhook endpoint */
export type WebhookEndpointsDeleteInput = {
  id: string;
};

export type WebhookEndpointsDeleteOutput = DeletedWebhookEndpoint;

/** Who is signed in */
export type MembersMeInput = Record<string, never>;

export type MembersMeOutput = Me;

/** List your organizations */
export type OrganizationsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type OrganizationsListOutput = OrganizationList;

/** Create an organization */
export type OrganizationsCreateInput = CreateOrganizationInput;

export type OrganizationsCreateOutput = Organization;

/** List the projects of an organization */
export type ProjectsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Whose projects; you must be a member */
  organization_id: string;
};

export type ProjectsListOutput = ProjectList;

/** Create a project */
export type ProjectsCreateInput = CreateProjectInput;

export type ProjectsCreateOutput = Project;

/** Get a project */
export type ProjectsGetInput = {
  id: string;
};

export type ProjectsGetOutput = Project;

/** Update a project */
export type ProjectsUpdateInput = {
  id: string;
} & {
  name?: string;
  timezone?: string;
  approvers?: Approvers;
  /** How many days a person is `new` */
  new_for_days?: number;
  /** How many days without an event before a person is `lapsing` */
  lapsing_after_days?: number;
};

export type ProjectsUpdateOutput = Project;

/** List an organization's team */
export type MembersListInput = {
  /** Whose team; you must be a member */
  organization_id: string;
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Leave it out for both */
  status?: "active" | "invited";
};

export type MembersListOutput = MemberList;

/** Invite someone to an organization */
export type MembersInviteInput = InviteMemberInput;

export type MembersInviteOutput = Invite;

/** List the invitations to you */
export type InvitesListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type InvitesListOutput = MyInviteList;

/** Change a member's role */
export type MembersUpdateInput = {
  id: string;
} & {
  role: AssignableRole;
};

export type MembersUpdateOutput = Member;

/** Remove a member */
export type MembersRemoveInput = {
  id: string;
};

export type MembersRemoveOutput = RemovedMember;

/** Cancel an invitation */
export type InvitesRevokeInput = {
  id: string;
};

export type InvitesRevokeOutput = RevokedInvite;

/** Accept an invitation */
export type InvitesAcceptInput = {
  id: string;
};

export type InvitesAcceptOutput = Organization;

/** Decline an invitation */
export type InvitesDeclineInput = {
  id: string;
};

export type InvitesDeclineOutput = DeclinedInvite;

/** Propose a change for a person to approve */
export type ProposalsCreateInput = CreateProposalInput;

export type ProposalsCreateOutput = Proposal;

/** List proposals */
export type ProposalsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Defaults to open: the ones waiting */
  status?: "open" | "approved" | "declined" | "expired";
};

export type ProposalsListOutput = ProposalList;

/** Copy rules and units into another project, for a person to approve */
export type PromotionsCreateInput = CreatePromotionInput;

export type PromotionsCreateOutput = CreatePromotionOutput;

/** See what copying into another project would do */
export type PromotionsPreviewInput = CreatePromotionInput;

export type PromotionsPreviewOutput = PreviewPromotionOutput;

/** Get a proposal */
export type ProposalsGetInput = {
  id: string;
};

export type ProposalsGetOutput = Proposal;

/** The change card for a proposal */
export type ProposalsCardInput = {
  id: string;
};

export type ProposalsCardOutput = ProposalCard;

/** What Lurky has cost this organization this month */
export type LurkyUsageInput = Record<string, never>;

export type LurkyUsageOutput = LurkyUsage;

/** Whether Lurky is on */
export type LurkyGetSettingsInput = Record<string, never>;

export type LurkyGetSettingsOutput = LurkySettings;

/** Switch Lurky on or off for the organization */
export type LurkyUpdateSettingsInput = UpdateLurkySettingsInput;

export type LurkyUpdateSettingsOutput = LurkySettings;

/** Your conversations with Lurky */
export type LurkyListConversationsInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type LurkyListConversationsOutput = LurkyConversationList;

/** One of your conversations with Lurky */
export type LurkyGetConversationInput = {
  id: string;
};

export type LurkyGetConversationOutput = LurkyConversation;

/** Delete one of your conversations with Lurky */
export type LurkyDeleteConversationInput = {
  id: string;
};

export type LurkyDeleteConversationOutput = DeleteLurkyConversationOutput;

/** Approve or decline a proposal */
export type ProposalsDecideInput = {
  id: string;
} & {
  decision: "approve" | "decline";
  note?: string;
};

export type ProposalsDecideOutput = DecideProposalOutput;

/** List holds */
export type HoldsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Defaults to held: the ones waiting */
  status?: "held" | "given" | "refused";
  /** A usr_… ID */
  user?: string;
  /** A rule_… ID or the rule's key */
  rule?: string;
};

export type HoldsListOutput = HoldList;

/** Get a hold */
export type HoldsGetInput = {
  id: string;
};

export type HoldsGetOutput = Hold;

/** Give or refuse a hold */
export type HoldsDecideInput = {
  id: string;
} & {
  decision: "give" | "refuse";
  note?: string;
};

export type HoldsDecideOutput = DecideHoldOutput;

/** Create an agent key */
export type AgentKeysCreateInput = CreateAgentKeyInput;

export type AgentKeysCreateOutput = CreatedAgentKey;

/** List agent keys */
export type AgentKeysListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type AgentKeysListOutput = AgentKeyList;

/** Revoke an agent key */
export type AgentKeysRevokeInput = {
  id: string;
};

export type AgentKeysRevokeOutput = AgentKey;

/** List audiences */
export type AudiencesListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** list: people added by hand or over the API. condition: kept up to date by its conditions */
  kind?: AudienceKind;
};

export type AudiencesListOutput = AudienceList;

/** Create an audience */
export type AudiencesCreateInput = Record<string, never>;

export type AudiencesCreateOutput = Audience;

/** Add people to a list audience */
export type AudiencesAddUsersInput = {
  id: string;
} & {
  /** usr_… IDs or the brand's own IDs. Up to 1,000 at a time */
  users: string[];
};

export type AudiencesAddUsersOutput = AddAudienceUsersOutput;

/** List rule budgets */
export type BudgetsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** A rule_… ID or the rule's key */
  rule?: string;
  /** Only budgets 80% or more used in this window */
  nearly_used?: boolean | string;
};

export type BudgetsListOutput = BudgetList;

/** List what happened and what didn't */
export type ActivityFeedInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Defaults to all */
  kind?: "all" | "given" | "skipped" | "held";
  /** A usr_… ID */
  user?: string;
  /** A rule_… ID or the rule's key */
  rule?: string;
  /** Receipts and held changes that involve this unit; skips changed none */
  unit?: string;
  since?: string;
  until?: string;
};

export type ActivityFeedOutput = FeedList;

/** List templates */
export type TemplatesListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Defaults to all */
  filter?: "all" | "in_use";
  category?: TemplateCategory;
};

export type TemplatesListOutput = TemplateList;

/** Get a template */
export type TemplatesGetInput = {
  id: string;
};

export type TemplatesGetOutput = Template;

/** Plan adding a template */
export type TemplatesPlanInput = {
  id: string;
} & {
  /** Values for the template's settings, by key. Leave one out for its default */
  settings?: Record<string, string | number>;
};

export type TemplatesPlanOutput = PlanTemplateOutput;

/** Add a template */
export type TemplatesInstallInput = {
  id: string;
} & {
  /** Values for the template's settings, by key. Leave one out for its default */
  settings?: Record<string, string | number>;
};

export type TemplatesInstallOutput = InstallTemplateOutput;

/** Take a template back */
export type TemplatesRemoveInput = {
  id: string;
};

export type TemplatesRemoveOutput = RemoveTemplateOutput;

/** Preview giving a unit by hand */
export type UnitsGivePreviewInput = GiveUnitsInput;

export type UnitsGivePreviewOutput = GivePreview;

/** Give a unit to people by hand */
export type UnitsGiveInput = GiveUnitsInput;

export type UnitsGiveOutput = GiveUnitsOutput;

/** Take a unit from a person for something */
export type UnitsSpendInput = SpendUnitsInput;

export type UnitsSpendOutput = SpendUnitsOutput;

/** Send a unit from one person to another */
export type UnitsSendInput = SendUnitsInput;

export type UnitsSendOutput = SendUnitsOutput;

/** Use something a person holds */
export type UnitsUseInput = UseUnitsInput;

export type UnitsUseOutput = UseUnitsOutput;

/** List views */
export type ViewsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Part of a view's name or key */
  search?: string;
};

export type ViewsListOutput = ViewList;

/** Save a view */
export type ViewsCreateInput = CreateViewInput;

export type ViewsCreateOutput = View;

/** Read a view */
export type ViewsGetInput = {
  id: string;
  /** Read over this range instead of the view's own */
  range?:
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
  /** Also answer for the span of the same length just before */
  compare?: boolean | string;
  /** Read for this audience instead of the view's who */
  audience?: string;
};

export type ViewsGetOutput = ViewWithAnswer;

/** Change a view */
export type ViewsUpdateInput = {
  id: string;
} & {
  name?: string;
  description?: string | null;
  /** Replaces the whole definition */
  definition?: {
    who: ViewWho;
    what: ViewMeasure[];
    over: ViewRange;
    shape: ViewShape;
  };
};

export type ViewsUpdateOutput = View;

/** List dashboards */
export type DashboardsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Only the ones pinned to your sidebar */
  pinned?: boolean | string;
  /** Only this unit's dashboards */
  unit?: string;
};

export type DashboardsListOutput = DashboardList;

/** Make a dashboard */
export type DashboardsCreateInput = CreateDashboardInput;

export type DashboardsCreateOutput = Dashboard;

/** Get a dashboard */
export type DashboardsGetInput = {
  id: string;
};

export type DashboardsGetOutput = Dashboard;

/** Change a dashboard */
export type DashboardsUpdateInput = {
  id: string;
} & {
  name?: string;
  /** Show it on Home instead of the current one */
  home?: true;
  /** The whole layout. Adding, moving, resizing and removing tiles all send it */
  tiles?: DashboardTileInput[];
};

export type DashboardsUpdateOutput = Dashboard;

/** Read a dashboard with every tile's answer */
export type DashboardsReadInput = {
  id: string;
  /** Read every tile over this range instead of its own */
  range?:
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
  /** Also answer for the span of the same length just before */
  compare?: boolean | string;
  /** Read every tile for this audience instead of its own who */
  audience?: string;
};

export type DashboardsReadOutput = DashboardWithAnswers;

/** Pin a dashboard */
export type DashboardsPinInput = {
  id: string;
} & {
  pinned: boolean;
};

export type DashboardsPinOutput = DashboardSummary;

/** List integrations */
export type IntegrationsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
  /** Defaults to all. connected includes the ones that need attention */
  filter?: "all" | "connected" | "events_in" | "mirrored_out";
};

export type IntegrationsListOutput = IntegrationList;

/** Check the integrations */
export type IntegrationsHealthInput = {
  /** Check one connector; leave it out for the ones that are connected */
  key?: string;
};

export type IntegrationsHealthOutput = IntegrationHealthOutput;

/** What is left to set this project up */
export type ProjectsSetupInput = Record<string, never>;

export type ProjectsSetupOutput = ProjectSetup;

/** Yesterday in a line */
export type LurkyBriefInput = Record<string, never>;

export type LurkyBriefOutput = Brief;

/** What Home suggests */
export type LurkySuggestionsInput = Record<string, never>;

export type LurkySuggestionsOutput = SuggestionList;

/** Put a card on Home away */
export type LurkyHideSuggestionInput = HideSuggestionInput;

export type LurkyHideSuggestionOutput = SuggestionHidden;

/** Bring a card on Home back */
export type LurkyShowSuggestionInput = ShowSuggestionInput;

export type LurkyShowSuggestionOutput = SuggestionHidden;

/** Read the project's clock */
export type ClocksGetInput = Record<string, never>;

export type ClocksGetOutput = ProjectClock;

/** Move a staging project's clock forward */
export type ClocksAdvanceInput = AdvanceClockInput;

export type ClocksAdvanceOutput = ProjectClock;

/** Move a staging project's clock to a time */
export type ClocksSetInput = SetClockInput;

export type ClocksSetOutput = ProjectClock;

/** Put a staging project's clock back to real time */
export type ClocksResetInput = Record<string, never>;

export type ClocksResetOutput = ProjectClock;

/** Start an export */
export type ExportsCreateInput = CreateExportInput;

export type ExportsCreateOutput = ExportJob;

/** List recent exports */
export type ExportsListInput = {
  /** How many items to return, 1 to 200 */
  limit?: number;
  /** The `next_cursor` of the previous page; leave out for the first page */
  cursor?: string;
};

export type ExportsListOutput = ExportJobList;

/** See how an export is going */
export type ExportsGetInput = {
  id: string;
};

export type ExportsGetOutput = ExportJob;

/** Get the link to an export's file */
export type ExportsDownloadInput = {
  id: string;
};

export type ExportsDownloadOutput = ExportDownload;

/** Stop an export */
export type ExportsCancelInput = {
  id: string;
};

export type ExportsCancelOutput = ExportJob;
