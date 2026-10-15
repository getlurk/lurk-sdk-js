// Generated from openapi/openapi.json by scripts/generate.ts. Do not edit.

import type { RequestOptions } from "../types.ts";
import type { OperationId } from "./operations.ts";
import type {
  ActivityExplainInput,
  ActivityExplainOutput,
  ActivityExportInput,
  ActivityExportOutput,
  ActivityFeedInput,
  ActivityFeedOutput,
  ActivityListInput,
  ActivityListOutput,
  ActivityUndoInput,
  ActivityUndoOutput,
  AgentKeysCreateInput,
  AgentKeysCreateOutput,
  AgentKeysListInput,
  AgentKeysListOutput,
  AgentKeysRevokeInput,
  AgentKeysRevokeOutput,
  ApiKeysCreateInput,
  ApiKeysCreateOutput,
  ApiKeysListInput,
  ApiKeysListOutput,
  ApiKeysRevokeInput,
  ApiKeysRevokeOutput,
  AudiencesAddUsersInput,
  AudiencesAddUsersOutput,
  AudiencesCreateInput,
  AudiencesCreateOutput,
  AudiencesListInput,
  AudiencesListOutput,
  BudgetsListInput,
  BudgetsListOutput,
  ClocksAdvanceInput,
  ClocksAdvanceOutput,
  ClocksGetInput,
  ClocksGetOutput,
  ClocksResetInput,
  ClocksResetOutput,
  ClocksSetInput,
  ClocksSetOutput,
  DashboardsCreateInput,
  DashboardsCreateOutput,
  DashboardsGetInput,
  DashboardsGetOutput,
  DashboardsListInput,
  DashboardsListOutput,
  DashboardsPinInput,
  DashboardsPinOutput,
  DashboardsReadInput,
  DashboardsReadOutput,
  DashboardsUpdateInput,
  DashboardsUpdateOutput,
  EventsCatalogInput,
  EventsCatalogOutput,
  EventsSendInput,
  EventsSendOutput,
  ExportsCancelInput,
  ExportsCancelOutput,
  ExportsCreateInput,
  ExportsCreateOutput,
  ExportsDownloadInput,
  ExportsDownloadOutput,
  ExportsGetInput,
  ExportsGetOutput,
  ExportsListInput,
  ExportsListOutput,
  HoldsDecideInput,
  HoldsDecideOutput,
  HoldsGetInput,
  HoldsGetOutput,
  HoldsListInput,
  HoldsListOutput,
  IntegrationsHealthInput,
  IntegrationsHealthOutput,
  IntegrationsListInput,
  IntegrationsListOutput,
  InvitesAcceptInput,
  InvitesAcceptOutput,
  InvitesDeclineInput,
  InvitesDeclineOutput,
  InvitesListInput,
  InvitesListOutput,
  InvitesRevokeInput,
  InvitesRevokeOutput,
  LurkyBriefInput,
  LurkyBriefOutput,
  LurkyDeleteConversationInput,
  LurkyDeleteConversationOutput,
  LurkyGetConversationInput,
  LurkyGetConversationOutput,
  LurkyGetSettingsInput,
  LurkyGetSettingsOutput,
  LurkyHideSuggestionInput,
  LurkyHideSuggestionOutput,
  LurkyListConversationsInput,
  LurkyListConversationsOutput,
  LurkyShowSuggestionInput,
  LurkyShowSuggestionOutput,
  LurkySuggestionsInput,
  LurkySuggestionsOutput,
  LurkyUpdateSettingsInput,
  LurkyUpdateSettingsOutput,
  LurkyUsageInput,
  LurkyUsageOutput,
  MembersInviteInput,
  MembersInviteOutput,
  MembersListInput,
  MembersListOutput,
  MembersMeInput,
  MembersMeOutput,
  MembersRemoveInput,
  MembersRemoveOutput,
  MembersUpdateInput,
  MembersUpdateOutput,
  OrganizationsCreateInput,
  OrganizationsCreateOutput,
  OrganizationsListInput,
  OrganizationsListOutput,
  ProjectsCreateInput,
  ProjectsCreateOutput,
  ProjectsGetInput,
  ProjectsGetOutput,
  ProjectsListInput,
  ProjectsListOutput,
  ProjectsSetupInput,
  ProjectsSetupOutput,
  ProjectsUpdateInput,
  ProjectsUpdateOutput,
  PromotionsCreateInput,
  PromotionsCreateOutput,
  PromotionsPreviewInput,
  PromotionsPreviewOutput,
  ProposalsCardInput,
  ProposalsCardOutput,
  ProposalsCreateInput,
  ProposalsCreateOutput,
  ProposalsDecideInput,
  ProposalsDecideOutput,
  ProposalsGetInput,
  ProposalsGetOutput,
  ProposalsListInput,
  ProposalsListOutput,
  RulesCreateInput,
  RulesCreateOutput,
  RulesGetInput,
  RulesGetOutput,
  RulesListInput,
  RulesListOutput,
  RulesPauseInput,
  RulesPauseOutput,
  RulesPreviewInput,
  RulesPreviewOutput,
  RulesPublishInput,
  RulesPublishOutput,
  RulesResumeInput,
  RulesResumeOutput,
  RulesStatsInput,
  RulesStatsOutput,
  RulesUpdateInput,
  RulesUpdateOutput,
  TemplatesGetInput,
  TemplatesGetOutput,
  TemplatesInstallInput,
  TemplatesInstallOutput,
  TemplatesListInput,
  TemplatesListOutput,
  TemplatesPlanInput,
  TemplatesPlanOutput,
  TemplatesRemoveInput,
  TemplatesRemoveOutput,
  UnitsCreateInput,
  UnitsCreateOutput,
  UnitsGetInput,
  UnitsGetOutput,
  UnitsGiveInput,
  UnitsGiveOutput,
  UnitsGivePreviewInput,
  UnitsGivePreviewOutput,
  UnitsListInput,
  UnitsListOutput,
  UnitsSendInput,
  UnitsSendOutput,
  UnitsSpendInput,
  UnitsSpendOutput,
  UnitsUpdateInput,
  UnitsUpdateOutput,
  UnitsUseInput,
  UnitsUseOutput,
  UsersExportInput,
  UsersExportOutput,
  UsersGetInput,
  UsersGetOutput,
  UsersListInput,
  UsersListOutput,
  ViewsCreateInput,
  ViewsCreateOutput,
  ViewsGetInput,
  ViewsGetOutput,
  ViewsListInput,
  ViewsListOutput,
  ViewsUpdateInput,
  ViewsUpdateOutput,
  WebhookEndpointsCreateInput,
  WebhookEndpointsCreateOutput,
  WebhookEndpointsDeleteInput,
  WebhookEndpointsDeleteOutput,
  WebhookEndpointsListInput,
  WebhookEndpointsListOutput,
} from "./types.ts";

export type Call = (id: OperationId, input: unknown, options?: RequestOptions) => Promise<unknown>;

export function createResources(call: Call) {
  return {
    activity: {
      /** Explain a receipt. The receipt and the checks the engine made for it, in order, from the trace stored with it: never reconstructed afterwards. A receipt written before traces were kept has none (`traced: false`). */
      explain: (input: ActivityExplainInput, options?: RequestOptions) =>
        call("activity.explain", input, options) as Promise<ActivityExplainOutput>,
      /** Export receipts as CSV. The receipts that match, newest first, as a CSV file: one row for each unit a receipt changed. The same filters as the list. Up to 10,000 rows; past that the file stops and says so (`truncated`), so narrow the filters. Text a spreadsheet would run as a formula is written as text. Every export leaves an audit entry. */
      export: (input: ActivityExportInput = {}, options?: RequestOptions) =>
        call("activity.export", input, options) as Promise<ActivityExportOutput>,
      /** List what happened and what didn't. One list, newest first, of receipts (`given`), rules that heard an event and did nothing (`skipped`, with the reason; kept 30 days) and changes waiting for a person (`held`). Filter by `kind`, person, rule, unit or time. A skip changed no unit, so filtering by unit leaves skips out. Once a held change is decided it is a receipt or a `hold_refused` skip, never both. */
      feed: (input: ActivityFeedInput = {}, options?: RequestOptions) =>
        call("activity.feed", input, options) as Promise<ActivityFeedOutput>,
      /** List receipts. Newest first. Every receipt says who acted, through what, and each unit it changed with the balance after. Filter by person, rule, unit or time. */
      list: (input: ActivityListInput = {}, options?: RequestOptions) =>
        call("activity.list", input, options) as Promise<ActivityListOutput>,
      /** Undo a receipt. Writes a new receipt that reverses the first, by the person, and both stay: a ledger never deletes. Refused when the receipt is itself an undo, was already undone, or the person's balance no longer allows taking it back (it would go below the unit's floor or past its cap). Only an owner or admin can. Limits a rule counted are not given back. */
      undo: (input: ActivityUndoInput, options?: RequestOptions) =>
        call("activity.undo", input, options) as Promise<ActivityUndoOutput>,
    },
    agentKeys: {
      /** Create an agent key. Only an owner or admin, in person. One key per agent: its name is what receipts and proposals say. The full key is in the response once; Lurk keeps only a hash and cannot show it again. */
      create: (input: AgentKeysCreateInput, options?: RequestOptions) =>
        call("agent_keys.create", input, options) as Promise<AgentKeysCreateOutput>,
      /** List agent keys. Newest first. Shows each agent's name, the start of its key and its state; the full key is never shown again. */
      list: (input: AgentKeysListInput = {}, options?: RequestOptions) =>
        call("agent_keys.list", input, options) as Promise<AgentKeysListOutput>,
      /** Revoke an agent key. Only an owner or admin, in person. The agent stops working at once, on its next request. Revoking a revoked key changes nothing. */
      revoke: (input: AgentKeysRevokeInput, options?: RequestOptions) =>
        call("agent_keys.revoke", input, options) as Promise<AgentKeysRevokeOutput>,
    },
    apiKeys: {
      /** Create a project API key. Only an owner or admin, in person. The full key is in the response once; Lurk keeps only a hash and cannot show it again. */
      create: (input: ApiKeysCreateInput, options?: RequestOptions) =>
        call("api_keys.create", input, options) as Promise<ApiKeysCreateOutput>,
      /** List project API keys. Newest first. Shows each key's name, start and state; the full key is never shown again. */
      list: (input: ApiKeysListInput = {}, options?: RequestOptions) =>
        call("api_keys.list", input, options) as Promise<ApiKeysListOutput>,
      /** Revoke a project API key. Only an owner or admin, in person. The key stops working at once. Revoking a revoked key changes nothing. */
      revoke: (input: ApiKeysRevokeInput, options?: RequestOptions) =>
        call("api_keys.revoke", input, options) as Promise<ApiKeysRevokeOutput>,
    },
    audiences: {
      /** Add people to a list audience. Adds up to 1,000 people by `usr_…` ID or by the brand's own ID. People already in it are counted, not added twice. An ID that matches nobody is returned in `not_found` and nothing is created for it. Only a list audience takes people by hand: a condition audience keeps its own members. */
      addUsers: (input: AudiencesAddUsersInput, options?: RequestOptions) =>
        call("audiences.add_users", input, options) as Promise<AudiencesAddUsersOutput>,
      /** Create an audience. A list (people you add by hand or over the API) or a condition audience (kept up to date by its conditions: active on N days, first seen, inactive, holds at least N, a property total). A new condition audience is empty until the worker works it out, within five minutes. Rules can then read it in `if`. */
      create: (input: AudiencesCreateInput = {}, options?: RequestOptions) =>
        call("audiences.create", input, options) as Promise<AudiencesCreateOutput>,
      /** List audiences. The groups of people rules can read, newest first, with how many are in each and which rules read it. A condition audience's members are worked out every five minutes: `refreshed_at` says when, and a rule sees it as it stood then. */
      list: (input: AudiencesListInput = {}, options?: RequestOptions) =>
        call("audiences.list", input, options) as Promise<AudiencesListOutput>,
    },
    budgets: {
      /** List rule budgets. What each live rule's budgets have given in the window they are in now ('5,000 Beans a week'), newest rule first, with the window's start and end in the project's time zone. A rule's budgets are never split across pages. `nearly_used` keeps those 80% or more used. */
      list: (input: BudgetsListInput = {}, options?: RequestOptions) =>
        call("budgets.list", input, options) as Promise<BudgetsListOutput>,
    },
    clocks: {
      /** Move a staging project's clock forward. Moves the project's time forward by days, hours or minutes, so a seven-day streak, a weekly schedule or an expiry can be tried without waiting. Staging projects only. Scheduled rules and expiries that come due run within a minute. Time only moves forward, except for a reset. */
      advance: (input: ClocksAdvanceInput = {}, options?: RequestOptions) =>
        call("clocks.advance", input, options) as Promise<ClocksAdvanceOutput>,
      /** Read the project's clock. What time it is in this project, and whether it has been moved from real time. Only a staging project's clock can be moved; a production project always shows real time. */
      get: (input: ClocksGetInput = {}, options?: RequestOptions) =>
        call("clocks.get", input, options) as Promise<ClocksGetOutput>,
      /** Put a staging project's clock back to real time. Ends the test clock: the project runs on real time again. This is the one way time goes back, so receipts made while the clock was ahead will look as if they come from the future until real time catches up. Staging projects only. */
      reset: (input: ClocksResetInput = {}, options?: RequestOptions) =>
        call("clocks.reset", input, options) as Promise<ClocksResetOutput>,
      /** Move a staging project's clock to a time. Sets the time the project thinks it is, such as the Monday a schedule should run. It cannot be earlier than the project's time now; use a reset to start over. Staging projects only. */
      set: (input: ClocksSetInput, options?: RequestOptions) =>
        call("clocks.set", input, options) as Promise<ClocksSetOutput>,
    },
    dashboards: {
      /** Make a dashboard. A dashboard of views on the 12-column grid, up to 40 tiles. `unit` makes it that unit's own dashboard (one each). It is not shown on Home until `dashboards.update` says so. */
      create: (input: DashboardsCreateInput, options?: RequestOptions) =>
        call("dashboards.create", input, options) as Promise<DashboardsCreateOutput>,
      /** Get a dashboard. One dashboard with its tiles: each tile is a view and a place on the 12-column grid. Use "home" for the one on Home, or "unit:<key>" for a unit's own. A tile's answer is `views.get`. */
      get: (input: DashboardsGetInput, options?: RequestOptions) =>
        call("dashboards.get", input, options) as Promise<DashboardsGetOutput>,
      /** List dashboards. The project's dashboards, newest first: one is shown on Home, a unit can have its own, and each member pins their own to the sidebar (`pinned` is yours). */
      list: (input: DashboardsListInput = {}, options?: RequestOptions) =>
        call("dashboards.list", input, options) as Promise<DashboardsListOutput>,
      /** Pin a dashboard. Pins a dashboard to your sidebar, or unpins it. Each member pins their own. */
      pin: (input: DashboardsPinInput, options?: RequestOptions) =>
        call("dashboards.pin", input, options) as Promise<DashboardsPinOutput>,
      /** Read a dashboard with every tile's answer. A dashboard and the answer of each of its tiles in one call, so a board is one read and not one for every tile. `range`, `compare` and `audience` apply to every tile as they do to `views.get`; the answers are by tile `id`. Use "home" for the one on Home, or "unit:<key>" for a unit's own. */
      read: (input: DashboardsReadInput, options?: RequestOptions) =>
        call("dashboards.read", input, options) as Promise<DashboardsReadOutput>,
      /** Change a dashboard. Renames a dashboard, makes it the one on Home (any other stops being it), or replaces its whole layout: adding, moving, resizing and removing tiles all send `tiles`. */
      update: (input: DashboardsUpdateInput, options?: RequestOptions) =>
        call("dashboards.update", input, options) as Promise<DashboardsUpdateOutput>,
    },
    events: {
      /** List the events this project has. Every event name that arrived in the last 30 days or that a rule listens for, once each, in name order: how many arrived, when the newest did, its property names (never values) and the rules listening. */
      catalog: (input: EventsCatalogInput = {}, options?: RequestOptions) =>
        call("events.catalog", input, options) as Promise<EventsCatalogOutput>,
      /** Send an event. Something a user did. Lurk runs your live rules on it and returns the receipts: what changed and the balance after. */
      send: (input: EventsSendInput, options?: RequestOptions) =>
        call("events.send", input, options) as Promise<EventsSendOutput>,
    },
    exports: {
      /** Stop an export. Stops a queued or running export. What it had written is thrown away. An export that has finished is not changed; to remove its file before the three days are up, it is deleted when it expires. Owners and admins only. */
      cancel: (input: ExportsCancelInput, options?: RequestOptions) =>
        call("exports.cancel", input, options) as Promise<ExportsCancelOutput>,
      /** Start an export. Starts a file of receipts or people, made in the background, with the same filters as the quick export. It answers at once with a job to watch (`exports.get`); when it is ready, `exports.download` gives a link. It holds up to 1,000,000 rows, and the file is deleted three days after it is ready. Owners and admins only, 3 a person and 20 a project a day. Every export leaves an audit entry. */
      create: (input: ExportsCreateInput, options?: RequestOptions) =>
        call("exports.create", input, options) as Promise<ExportsCreateOutput>,
      /** Get the link to an export's file. A link to the finished file, good for 5 minutes. Ask again for a new one. No link is given once the file's three days are up, even if it has not been deleted yet. Owners and admins only; every download leaves an audit entry. */
      download: (input: ExportsDownloadInput, options?: RequestOptions) =>
        call("exports.download", input, options) as Promise<ExportsDownloadOutput>,
      /** See how an export is going. Whether the file is queued, being made (with the rows written so far), ready (with when it will be deleted), failed (with why) or gone. Owners and admins only. */
      get: (input: ExportsGetInput, options?: RequestOptions) =>
        call("exports.get", input, options) as Promise<ExportsGetOutput>,
      /** List recent exports. The project's exports, newest first, with who asked and how each went. Owners and admins only. */
      list: (input: ExportsListInput = {}, options?: RequestOptions) =>
        call("exports.list", input, options) as Promise<ExportsListOutput>,
    },
    holds: {
      /** Give or refuse a hold. A person decides. Giving makes the rule's changes now, as one receipt, if the balance still allows them and the rule's budget for the window has room (giving spends it); if it doesn't, nothing changes and the hold stays for the person to refuse. Refusing changes nothing and is recorded. Only an owner or admin can (an owner only, if the project says so). */
      decide: (input: HoldsDecideInput, options?: RequestOptions) =>
        call("holds.decide", input, options) as Promise<HoldsDecideOutput>,
      /** Get a hold. One hold with the changes it would make, why it waits, and how it was decided. */
      get: (input: HoldsGetInput, options?: RequestOptions) =>
        call("holds.get", input, options) as Promise<HoldsGetOutput>,
      /** List holds. Changes a rule parked for a person, newest first. By default the ones still waiting; `waiting` counts them. Nothing has changed for the person until a hold is given. */
      list: (input: HoldsListInput = {}, options?: RequestOptions) =>
        call("holds.list", input, options) as Promise<HoldsListOutput>,
    },
    integrations: {
      /** Check the integrations. What is wrong with the connectors this project has, and how to fix it. Without `key` it answers for the ones that are connected or need attention; with `key` it answers for that one, whatever its status. `needs_attention` counts them all, for the sidebar. A failing webhook endpoint is a problem; one a person turned off is not. */
      health: (input: IntegrationsHealthInput = {}, options?: RequestOptions) =>
        call("integrations.health", input, options) as Promise<IntegrationsHealthOutput>,
      /** List integrations. Every way events reach Lurk or state leaves it, in the order the dashboard shows them, with what this project has: `connected`, `needs_attention` (connected, but something is wrong), `not_connected`, or `later` (listed, but not available yet). Your app, MCP and webhooks are real today and their status is read from your keys and endpoints. `filter: connected` includes the ones that need attention. */
      list: (input: IntegrationsListInput = {}, options?: RequestOptions) =>
        call("integrations.list", input, options) as Promise<IntegrationsListOutput>,
    },
    invites: {
      /** Accept an invitation. Joins the organization with the invited role. Only the person who signed in with the invited address can; anything else answers not_found. */
      accept: (input: InvitesAcceptInput, options?: RequestOptions) =>
        call("invites.accept", input, options) as Promise<InvitesAcceptOutput>,
      /** Decline an invitation. Turns an invitation down. Only the person who signed in with the invited address can. */
      decline: (input: InvitesDeclineInput, options?: RequestOptions) =>
        call("invites.decline", input, options) as Promise<InvitesDeclineOutput>,
      /** List the invitations to you. Open invitations to the email address you signed in with, newest first. Answers nothing until that address is verified. */
      list: (input: InvitesListInput = {}, options?: RequestOptions) =>
        call("invites.list", input, options) as Promise<InvitesListOutput>,
      /** Cancel an invitation. Withdraws an invitation that has not been answered. Owners and admins can. */
      revoke: (input: InvitesRevokeInput, options?: RequestOptions) =>
        call("invites.revoke", input, options) as Promise<InvitesRevokeOutput>,
    },
    lurky: {
      /** Yesterday in a line. What happened yesterday, in the project's time zone: how many people were active (and how that compares with the day before), how many were new, how many events came in and what was given, as a sentence and as the numbers behind it. No model is used, so it costs nothing. The sentence is null while the project has not heard anything yet. */
      brief: (input: LurkyBriefInput = {}, options?: RequestOptions) =>
        call("lurky.brief", input, options) as Promise<LurkyBriefOutput>,
      /** Delete one of your conversations with Lurky. Deletes it and its messages at once. Only the member who had it can; a viewer can too, because it is their own. */
      deleteConversation: (input: LurkyDeleteConversationInput, options?: RequestOptions) =>
        call("lurky.delete_conversation", input, options) as Promise<LurkyDeleteConversationOutput>,
      /** One of your conversations with Lurky. Its messages, oldest first, with what Lurky read to write each answer. */
      getConversation: (input: LurkyGetConversationInput, options?: RequestOptions) =>
        call("lurky.get_conversation", input, options) as Promise<LurkyGetConversationOutput>,
      /** Whether Lurky is on. Whether Lurky can answer here: the deployment has it switched on, and the organization has not switched it off. It is on for every organization until an owner turns it off (the terms cover it), unless the deployment says otherwise. */
      getSettings: (input: LurkyGetSettingsInput = {}, options?: RequestOptions) =>
        call("lurky.get_settings", input, options) as Promise<LurkyGetSettingsOutput>,
      /** Put a card on Home away. Hides a card for this member only. It comes back when the card's signal changes (its `signature` is no longer the one sent here). Hiding one that is already hidden updates it. */
      hideSuggestion: (input: LurkyHideSuggestionInput, options?: RequestOptions) =>
        call("lurky.hide_suggestion", input, options) as Promise<LurkyHideSuggestionOutput>,
      /** Your conversations with Lurky. The signed-in member's own conversations, newest first. Nobody else's: not an owner's, not Lurk's staff's through the API. Each is deleted 90 days after its last message. */
      listConversations: (input: LurkyListConversationsInput = {}, options?: RequestOptions) =>
        call("lurky.list_conversations", input, options) as Promise<LurkyListConversationsOutput>,
      /** Bring a card on Home back. Undoes a hide for this member. Showing one that is not hidden is fine. */
      showSuggestion: (input: LurkyShowSuggestionInput, options?: RequestOptions) =>
        call("lurky.show_suggestion", input, options) as Promise<LurkyShowSuggestionOutput>,
      /** What Home suggests. The cards on Home, worked out from what the project has now: what needs a person (an approval, held receipts, a budget nearly used, a connector that needs attention), what changed (people drifting away, a paused rule) and one idea. At most six, most urgent first, without the ones this member put away. Each says why, in the project's own numbers. Nothing here uses a model, so it costs nothing. */
      suggestions: (input: LurkySuggestionsInput = {}, options?: RequestOptions) =>
        call("lurky.suggestions", input, options) as Promise<LurkySuggestionsOutput>,
      /** Switch Lurky on or off for the organization. Only an owner. Off, nothing a member says reaches a model. It covers every project of the organization. Lurky is on unless an owner turns it off. It sends the project's configuration and aggregates to the model provider, with people's own ids replaced by placeholders, which the terms say at signup. */
      updateSettings: (input: LurkyUpdateSettingsInput, options?: RequestOptions) =>
        call("lurky.update_settings", input, options) as Promise<LurkyUpdateSettingsOutput>,
      /** What Lurky has cost this organization this month. The organization's Lurky allowance for the month (shared by all its projects), what the organization has used, and whether Lurky is answering: it warns at 80% and stops at 100% until the month resets. Only an owner or admin. */
      usage: (input: LurkyUsageInput = {}, options?: RequestOptions) =>
        call("lurky.usage", input, options) as Promise<LurkyUsageOutput>,
    },
    members: {
      /** Invite someone to an organization. Invites an email address with a role (admin, developer or viewer) to an organization you own or administer. They join when they sign in with that address and accept. Inviting an address that already has an open invitation renews it; an address that is already a member is refused. */
      invite: (input: MembersInviteInput, options?: RequestOptions) =>
        call("members.invite", input, options) as Promise<MembersInviteOutput>,
      /** List an organization's team. The people in an organization and the invitations still open, newest first, with the total of both. An organization you are not in answers not_found, the same as one that does not exist. */
      list: (input: MembersListInput, options?: RequestOptions) =>
        call("members.list", input, options) as Promise<MembersListOutput>,
      /** Who is signed in. The person behind the session and, when the request names a project, their membership and role in it. */
      me: (input: MembersMeInput = {}, options?: RequestOptions) =>
        call("members.me", input, options) as Promise<MembersMeOutput>,
      /** Remove a member. Takes a member out of the organization. Owners and admins can; an owner cannot be removed, and nobody removes themselves. */
      remove: (input: MembersRemoveInput, options?: RequestOptions) =>
        call("members.remove", input, options) as Promise<MembersRemoveOutput>,
      /** Change a member's role. Gives a member another role (admin, developer or viewer). Owners and admins can; an owner's role does not change here. */
      update: (input: MembersUpdateInput, options?: RequestOptions) =>
        call("members.update", input, options) as Promise<MembersUpdateOutput>,
    },
    organizations: {
      /** Create an organization. Starts a brand's account; you become its owner. Not idempotent: a repeated slug is refused, so list your organizations to see whether the first call went through. */
      create: (input: OrganizationsCreateInput, options?: RequestOptions) =>
        call("organizations.create", input, options) as Promise<OrganizationsCreateOutput>,
      /** List your organizations. The organizations the signed-in person is a member of, newest first, with their role in each. */
      list: (input: OrganizationsListInput = {}, options?: RequestOptions) =>
        call("organizations.list", input, options) as Promise<OrganizationsListOutput>,
    },
    projects: {
      /** Create a project. Adds a project (Production or Staging) to an organization you own or administer. Not idempotent: a repeated slug is refused, so list the organization's projects to see whether the first call went through. */
      create: (input: ProjectsCreateInput, options?: RequestOptions) =>
        call("projects.create", input, options) as Promise<ProjectsCreateOutput>,
      /** Get a project. One project of an organization the signed-in person is a member of. A project of another brand answers not_found, the same as one that does not exist. */
      get: (input: ProjectsGetInput, options?: RequestOptions) =>
        call("projects.get", input, options) as Promise<ProjectsGetOutput>,
      /** List the projects of an organization. The projects of one organization the signed-in person is a member of, newest first. An organization you are not in answers not_found, the same as one that does not exist. */
      list: (input: ProjectsListInput, options?: RequestOptions) =>
        call("projects.list", input, options) as Promise<ProjectsListOutput>,
      /** What is left to set this project up. The steps to set the project up (a unit, a rule, an event, going live), which are done, and which parts of the dashboard they open. It is worked out from what the project has, so what an agent made through the API counts. Once a rule has been live the project is past setup and nothing is locked. The locks are advice for the dashboard: no operation is refused because of them. */
      setup: (input: ProjectsSetupInput = {}, options?: RequestOptions) =>
        call("projects.setup", input, options) as Promise<ProjectsSetupOutput>,
      /** Update a project. Renames a project, sets its time zone, sets who says yes to proposals and held changes, or sets how many days a person is new and how many quiet days make them lapsing. An owner or admin can change the name, time zone and those two numbers; only an owner can change who says yes. Leave a field out to keep it. */
      update: (input: ProjectsUpdateInput, options?: RequestOptions) =>
        call("projects.update", input, options) as Promise<ProjectsUpdateOutput>,
    },
    promotions: {
      /** Copy rules and units into another project, for a person to approve. Proposes copying rules and units from one project of your organization into another, such as Staging into Production. Nothing is copied now: it makes a proposal in the project it copies into, and a person there approves it. Units are created if the project has none with the key; rules arrive as drafts (a new draft version if the key is there), and are taken live like any rule. The units a rule changes are copied with it if they are missing. You need to be in both projects. */
      create: (input: PromotionsCreateInput, options?: RequestOptions) =>
        call("promotions.create", input, options) as Promise<PromotionsCreateOutput>,
      /** See what copying into another project would do. Takes the same input as `promotions.create` and says what would be added, updated and left, without making a proposal or writing anything. `can_send` says whether `promotions.create` would go through; if not, `problem` says why. You need to be in both projects. */
      preview: (input: PromotionsPreviewInput, options?: RequestOptions) =>
        call("promotions.preview", input, options) as Promise<PromotionsPreviewOutput>,
    },
    proposals: {
      /** The change card for a proposal. What a person is asked to approve, field by field: the proposal's own before and after for every change, made by the server. A card is applicable only while the proposal is open and every change shows something that would differ. Lurky shows this beside its words, and Apply decides the proposal by its ID. */
      card: (input: ProposalsCardInput, options?: RequestOptions) =>
        call("proposals.card", input, options) as Promise<ProposalsCardOutput>,
      /** Propose a change for a person to approve. Asks for something that goes live, such as taking a rule live, without being able to do it. A person with the right to (an owner or admin) approves or declines it; approving runs the same change as them. Nothing runs now. The answer has a link to give that person. */
      create: (input: ProposalsCreateInput, options?: RequestOptions) =>
        call("proposals.create", input, options) as Promise<ProposalsCreateOutput>,
      /** Approve or decline a proposal. A person decides. Approving runs every change in the proposal, in order, as the person; if one cannot run, none does and the proposal stays open. Declining runs nothing. Only an owner or admin can (an owner only, if the project says so). */
      decide: (input: ProposalsDecideInput, options?: RequestOptions) =>
        call("proposals.decide", input, options) as Promise<ProposalsDecideOutput>,
      /** Get a proposal. One proposal with its changes, who asked, and how it was decided. */
      get: (input: ProposalsGetInput, options?: RequestOptions) =>
        call("proposals.get", input, options) as Promise<ProposalsGetOutput>,
      /** List proposals. Proposals newest first. By default the open ones, the ones waiting for a person; `waiting` counts them. An open proposal past its expiry reads as expired. */
      list: (input: ProposalsListInput = {}, options?: RequestOptions) =>
        call("proposals.list", input, options) as Promise<ProposalsListOutput>,
    },
    rules: {
      /** Create a rule as a draft. Rules start as drafts. A key or an agent can create and preview them; only a person takes one live. */
      create: (input: RulesCreateInput, options?: RequestOptions) =>
        call("rules.create", input, options) as Promise<RulesCreateOutput>,
      /** Get a rule. By ID or key. `definition` is the newest version; `live_definition` is what is running now, which differs while an edit waits for a person. */
      get: (input: RulesGetInput, options?: RequestOptions) =>
        call("rules.get", input, options) as Promise<RulesGetOutput>,
      /** List rules. Newest first. Filter by status, unit, event or part of the name. `counts` says how many rules each status has under the other filters. */
      list: (input: RulesListInput = {}, options?: RequestOptions) =>
        call("rules.list", input, options) as Promise<RulesListOutput>,
      /** Pause a rule. Stops a live rule at once: nothing is given or taken while it is paused. Safe for an agent to do. Starting it again needs a person (`rules.resume`). */
      pause: (input: RulesPauseInput, options?: RequestOptions) =>
        call("rules.pause", input, options) as Promise<RulesPauseOutput>,
      /** Preview a rule. For a rule that starts on an event, replays up to 20,000 recorded events of the past days through the real rule engine, in memory, and says what the rule would have given. For a rule on a schedule, says when it runs next and how many people it reaches; for one that starts when a balance moves, which rules lead into it and how many people are already there. Nothing is given. Send `definition` to try an edit that is not saved yet. It is an estimate: see `notes`. */
      preview: (input: RulesPreviewInput, options?: RequestOptions) =>
        call("rules.preview", input, options) as Promise<RulesPreviewOutput>,
      /** Take a rule live. Takes the newest version live. Only an owner or admin, in person. Agents and keys get `approval_required` and should create a proposal. */
      publish: (input: RulesPublishInput, options?: RequestOptions) =>
        call("rules.publish", input, options) as Promise<RulesPublishOutput>,
      /** Start a paused rule again. The rule runs again on the version it was running. A paused rule going live is a go-live, so only an owner or admin, in person. */
      resume: (input: RulesResumeInput, options?: RequestOptions) =>
        call("rules.resume", input, options) as Promise<RulesResumeOutput>,
      /** What a rule did. From the receipts: how many times the rule changed something, for how many people, and how much it gave or took per unit, plus how often it did not apply and why, and the ten people it reached most. Skips are kept for 30 days. */
      stats: (input: RulesStatsInput, options?: RequestOptions) =>
        call("rules.stats", input, options) as Promise<RulesStatsOutput>,
      /** Edit a rule. Writes a new version from the newest one with the parts you send replaced. A live rule keeps running its live version until a person takes the new one live. Sending only `name` renames the rule without a new version. */
      update: (input: RulesUpdateInput, options?: RequestOptions) =>
        call("rules.update", input, options) as Promise<RulesUpdateOutput>,
    },
    templates: {
      /** Get a template. One template: what it adds (units, and rules that arrive as drafts) with its default settings, the settings a person can change, and when it was added to this project. */
      get: (input: TemplatesGetInput, options?: RequestOptions) =>
        call("templates.get", input, options) as Promise<TemplatesGetOutput>,
      /** Add a template. Adds a template's units and views (one that already exists is reused as it is) and its rules **as drafts**; a person takes each rule live. Refused if the template is already added, can't run yet, or a rule it adds has the key of one that exists. A template is added once: remove it to change its settings. */
      install: (input: TemplatesInstallInput, options?: RequestOptions) =>
        call("templates.install", input, options) as Promise<TemplatesInstallOutput>,
      /** List templates. The kits that add units and rules in one go, in the catalog's order, with whether each is available, or already added to this project (`in_use`). `filter: in_use` shows what this project has added. */
      list: (input: TemplatesListInput = {}, options?: RequestOptions) =>
        call("templates.list", input, options) as Promise<TemplatesListOutput>,
      /** Plan adding a template. What adding a template with these settings would do, and a test week: a fixed, made-up week of visits, orders and sign-ups run through the real engine against the template's own rules. Nothing is written. Say what already exists (it is reused, not added again) and what to check. */
      plan: (input: TemplatesPlanInput, options?: RequestOptions) =>
        call("templates.plan", input, options) as Promise<TemplatesPlanOutput>,
      /** Take a template back. Removes the rules the template added **that are still drafts**, and forgets that it was added. Rules that went live or were paused, the units, and everything people earned stay, and are counted in `kept`. A draft that was never live has no receipts, so the ledger is untouched. */
      remove: (input: TemplatesRemoveInput, options?: RequestOptions) =>
        call("templates.remove", input, options) as Promise<TemplatesRemoveOutput>,
    },
    units: {
      /** Create a unit. Sets up a unit: what it is called and what it allows. Only settings Lurk enforces are accepted: goes up, goes down, a cap per person, the lowest balance, whether the app shows it, a supply (the most that can ever be given in all) and an expiry (what is given is taken back after so many days). Sending between people comes later. */
      create: (input: UnitsCreateInput, options?: RequestOptions) =>
        call("units.create", input, options) as Promise<UnitsCreateOutput>,
      /** Get a unit. By ID or key: its settings and what it holds across everyone. */
      get: (input: UnitsGetInput, options?: RequestOptions) =>
        call("units.get", input, options) as Promise<UnitsGetOutput>,
      /** Give a unit to people by hand. Gives each of up to 200 people the same amount of one unit, one receipt each, by the person and with an optional note. People are `usr_…` IDs or the brand's own IDs. The unit's own settings apply: someone it can't be given to is skipped with the reason and the others still get theirs. `count_against` names a rule with a budget in this unit: the give is counted in it, and if it would pass the budget nothing is given. Only an owner or admin can; use `units.give_preview` first. */
      give: (input: UnitsGiveInput, options?: RequestOptions) =>
        call("units.give", input, options) as Promise<UnitsGiveOutput>,
      /** Preview giving a unit by hand. What `units.give` would do with the same input, without doing it: who gets the unit, who is skipped and why (the unit's own settings), who matched nobody, and what is left of the budget when the give is counted in a rule. Nothing is written. */
      givePreview: (input: UnitsGivePreviewInput, options?: RequestOptions) =>
        call("units.give_preview", input, options) as Promise<UnitsGivePreviewOutput>,
      /** List units. Newest first, with what each holds across everyone, how many hold it, and what was added and taken in the last 30 days. `counts` says how many units each group has. */
      list: (input: UnitsListInput = {}, options?: RequestOptions) =>
        call("units.list", input, options) as Promise<UnitsListOutput>,
      /** Send a unit from one person to another. Moves an amount of one unit from one person to another, as two receipts (`send` and `receive`, with the same `transfer` ID) that happen together or not at all. The sender must hold the amount above the unit's lowest balance (`insufficient_balance`), have sent less than the unit's daily limit today (`rate_limited`), and the receiver must be able to hold it (the unit's cap). What expires keeps its expiry: the receiver gets the sender's clock, not a new one. A send makes nothing: it is not counted as given or spent. The unit must allow it (`sendable`). Both people must already be known. Called by your server with a project key for a person, or by an owner or admin; never by an agent. Units cannot be bought, cashed out or given a money value. */
      send: (input: UnitsSendInput, options?: RequestOptions) =>
        call("units.send", input, options) as Promise<UnitsSendOutput>,
      /** Take a unit from a person for something. Takes an amount of one unit from one person, for a stated reason: a free coffee for 100 Beans. All or nothing: it is refused with `insufficient_balance` when the person holds less than the amount above the unit's lowest balance. What expires first is taken first. A `reference` (your own redemption or order ID) can be used once per unit; a second spend with it is refused with `reference_used`, and a retry of the same request returns the first answer. The unit must allow it (`spendable`). Called by your server with a project key, or by an owner or admin; never by an agent. */
      spend: (input: UnitsSpendInput, options?: RequestOptions) =>
        call("units.spend", input, options) as Promise<UnitsSpendOutput>,
      /** Change a unit. Changes what you send. A setting applies to changes from now on and changes nobody's balance: lowering a cap below what people hold leaves their balances, and stops further additions. */
      update: (input: UnitsUpdateInput, options?: RequestOptions) =>
        call("units.update", input, options) as Promise<UnitsUpdateOutput>,
      /** Use something a person holds. Redeems an amount (one by default) of a unit a person holds: a coupon at the till, a ticket at the door. All or nothing: it is refused with `insufficient_balance` when the person holds less. What expires first is used first. A `reference` (your own scan or redemption ID) can be used once per unit; a second use with it is refused with `reference_used`, and a retry of the same request returns the first answer. The unit must allow it (`usable`). It fires the `unit.used` webhook as well as `activity.created`. Called by your server with a project key, or by an owner or admin; never by an agent. */
      use: (input: UnitsUseInput, options?: RequestOptions) =>
        call("units.use", input, options) as Promise<UnitsUseOutput>,
    },
    users: {
      /** Export people as CSV. The people Lurk has heard of, newest first, as a CSV file: the brand's identifier, when Lurk first heard of them, and a column for each unit with what they hold. Up to 10,000 people; past that the file stops and says so (`truncated`). Text a spreadsheet would run as a formula is written as text. Every export leaves an audit entry. */
      export: (input: UsersExportInput = {}, options?: RequestOptions) =>
        call("users.export", input, options) as Promise<UsersExportOutput>,
      /** Get a person. By `usr_…` ID or by the brand's own identifier (the one events use): what they hold, their time zone, and how many receipts they have. Also whether they are new, returning or lapsing, and when they were last active. */
      get: (input: UsersGetInput, options?: RequestOptions) =>
        call("users.get", input, options) as Promise<UsersGetOutput>,
      /** List people. The people Lurk has heard of in this project, newest first (or oldest first with `sort`), with what each holds. Search takes the brand's whole identifier: they are kept sealed, so there is no partial match. `audience` keeps only the people in one audience, `status` keeps only the new, returning or lapsing ones, and `include=total` adds how many people match across every page. Every person says which of the three they are. */
      list: (input: UsersListInput = {}, options?: RequestOptions) =>
        call("users.list", input, options) as Promise<UsersListOutput>,
    },
    views: {
      /** Save a view. Saves a question about the project: who, what, over which range, as which shape (a number, a chart over time, or a ranked list). It only reads, so a member, a key or an agent can save one. The audience and units it names must exist. */
      create: (input: ViewsCreateInput, options?: RequestOptions) =>
        call("views.create", input, options) as Promise<ViewsCreateOutput>,
      /** Read a view. A view and its answer, computed from the project's data when asked: a number, a series over time, or a ranked list. Read it over another `range`, `compare` it with the span of the same length just before, or read it for another `audience`. Ranges and weeks are in the project's time zone (a week is Monday to Sunday). */
      get: (input: ViewsGetInput, options?: RequestOptions) =>
        call("views.get", input, options) as Promise<ViewsGetOutput>,
      /** List views. The saved questions of the project, newest first. A view is typed data (who, what, over, shape), never SQL. Search matches a name or key. */
      list: (input: ViewsListInput = {}, options?: RequestOptions) =>
        call("views.list", input, options) as Promise<ViewsListOutput>,
      /** Change a view. Renames a view, changes its description, or replaces its whole definition. Dashboards that show it show the new question. */
      update: (input: ViewsUpdateInput, options?: RequestOptions) =>
        call("views.update", input, options) as Promise<ViewsUpdateOutput>,
    },
    webhookEndpoints: {
      /** Add a webhook endpoint. Lurk sends the events you pick to this URL, signed with the secret in the response. The secret is shown once. */
      create: (input: WebhookEndpointsCreateInput, options?: RequestOptions) =>
        call("webhook_endpoints.create", input, options) as Promise<WebhookEndpointsCreateOutput>,
      /** Delete a webhook endpoint. Stops sending to it and removes its delivery history. This can't be undone. */
      delete: (input: WebhookEndpointsDeleteInput, options?: RequestOptions) =>
        call("webhook_endpoints.delete", input, options) as Promise<WebhookEndpointsDeleteOutput>,
      /** List webhook endpoints. Newest first. Shows where events go and whether each endpoint is still switched on. */
      list: (input: WebhookEndpointsListInput = {}, options?: RequestOptions) =>
        call("webhook_endpoints.list", input, options) as Promise<WebhookEndpointsListOutput>,
    },
  };
}
