// Generated from openapi/openapi.json by scripts/generate.ts. Do not edit.

import type {
  ActivityExplainOutput,
  ActivityExportOutput,
  ActivityFeedOutput,
  ActivityListOutput,
  ActivityUndoOutput,
  AgentKeysCreateOutput,
  AgentKeysListOutput,
  AgentKeysRevokeOutput,
  ApiKeysCreateOutput,
  ApiKeysListOutput,
  ApiKeysRevokeOutput,
  AudiencesAddUsersOutput,
  AudiencesCreateOutput,
  AudiencesListOutput,
  BudgetsListOutput,
  ClocksAdvanceOutput,
  ClocksGetOutput,
  ClocksResetOutput,
  ClocksSetOutput,
  DashboardsCreateOutput,
  DashboardsGetOutput,
  DashboardsListOutput,
  DashboardsPinOutput,
  DashboardsReadOutput,
  DashboardsUpdateOutput,
  EventsCatalogOutput,
  EventsSendOutput,
  ExportsCancelOutput,
  ExportsCreateOutput,
  ExportsDownloadOutput,
  ExportsGetOutput,
  ExportsListOutput,
  HoldsDecideOutput,
  HoldsGetOutput,
  HoldsListOutput,
  IntegrationsHealthOutput,
  IntegrationsListOutput,
  InvitesAcceptOutput,
  InvitesDeclineOutput,
  InvitesListOutput,
  InvitesRevokeOutput,
  LurkyBriefOutput,
  LurkyDeleteConversationOutput,
  LurkyGetConversationOutput,
  LurkyGetSettingsOutput,
  LurkyHideSuggestionOutput,
  LurkyListConversationsOutput,
  LurkyShowSuggestionOutput,
  LurkySuggestionsOutput,
  LurkyUpdateSettingsOutput,
  LurkyUsageOutput,
  MembersInviteOutput,
  MembersListOutput,
  MembersMeOutput,
  MembersRemoveOutput,
  MembersUpdateOutput,
  OrganizationsCreateOutput,
  OrganizationsListOutput,
  ProjectsCreateOutput,
  ProjectsGetOutput,
  ProjectsListOutput,
  ProjectsSetupOutput,
  ProjectsUpdateOutput,
  PromotionsCreateOutput,
  PromotionsPreviewOutput,
  ProposalsCardOutput,
  ProposalsCreateOutput,
  ProposalsDecideOutput,
  ProposalsGetOutput,
  ProposalsListOutput,
  RulesCreateOutput,
  RulesGetOutput,
  RulesListOutput,
  RulesPauseOutput,
  RulesPreviewOutput,
  RulesPublishOutput,
  RulesResumeOutput,
  RulesStatsOutput,
  RulesUpdateOutput,
  TemplatesGetOutput,
  TemplatesInstallOutput,
  TemplatesListOutput,
  TemplatesPlanOutput,
  TemplatesRemoveOutput,
  UnitsCreateOutput,
  UnitsGetOutput,
  UnitsGiveOutput,
  UnitsGivePreviewOutput,
  UnitsListOutput,
  UnitsSendOutput,
  UnitsSpendOutput,
  UnitsUpdateOutput,
  UnitsUseOutput,
  UsersExportOutput,
  UsersGetOutput,
  UsersListOutput,
  ViewsCreateOutput,
  ViewsGetOutput,
  ViewsListOutput,
  ViewsUpdateOutput,
  WebhookEndpointsCreateOutput,
  WebhookEndpointsDeleteOutput,
  WebhookEndpointsListOutput,
} from "./types.ts";

export interface OperationOutputs {
  "activity.explain": ActivityExplainOutput;
  "activity.export": ActivityExportOutput;
  "activity.feed": ActivityFeedOutput;
  "activity.list": ActivityListOutput;
  "activity.undo": ActivityUndoOutput;
  "agent_keys.create": AgentKeysCreateOutput;
  "agent_keys.list": AgentKeysListOutput;
  "agent_keys.revoke": AgentKeysRevokeOutput;
  "api_keys.create": ApiKeysCreateOutput;
  "api_keys.list": ApiKeysListOutput;
  "api_keys.revoke": ApiKeysRevokeOutput;
  "audiences.add_users": AudiencesAddUsersOutput;
  "audiences.create": AudiencesCreateOutput;
  "audiences.list": AudiencesListOutput;
  "budgets.list": BudgetsListOutput;
  "clocks.advance": ClocksAdvanceOutput;
  "clocks.get": ClocksGetOutput;
  "clocks.reset": ClocksResetOutput;
  "clocks.set": ClocksSetOutput;
  "dashboards.create": DashboardsCreateOutput;
  "dashboards.get": DashboardsGetOutput;
  "dashboards.list": DashboardsListOutput;
  "dashboards.pin": DashboardsPinOutput;
  "dashboards.read": DashboardsReadOutput;
  "dashboards.update": DashboardsUpdateOutput;
  "events.catalog": EventsCatalogOutput;
  "events.send": EventsSendOutput;
  "exports.cancel": ExportsCancelOutput;
  "exports.create": ExportsCreateOutput;
  "exports.download": ExportsDownloadOutput;
  "exports.get": ExportsGetOutput;
  "exports.list": ExportsListOutput;
  "holds.decide": HoldsDecideOutput;
  "holds.get": HoldsGetOutput;
  "holds.list": HoldsListOutput;
  "integrations.health": IntegrationsHealthOutput;
  "integrations.list": IntegrationsListOutput;
  "invites.accept": InvitesAcceptOutput;
  "invites.decline": InvitesDeclineOutput;
  "invites.list": InvitesListOutput;
  "invites.revoke": InvitesRevokeOutput;
  "lurky.brief": LurkyBriefOutput;
  "lurky.delete_conversation": LurkyDeleteConversationOutput;
  "lurky.get_conversation": LurkyGetConversationOutput;
  "lurky.get_settings": LurkyGetSettingsOutput;
  "lurky.hide_suggestion": LurkyHideSuggestionOutput;
  "lurky.list_conversations": LurkyListConversationsOutput;
  "lurky.show_suggestion": LurkyShowSuggestionOutput;
  "lurky.suggestions": LurkySuggestionsOutput;
  "lurky.update_settings": LurkyUpdateSettingsOutput;
  "lurky.usage": LurkyUsageOutput;
  "members.invite": MembersInviteOutput;
  "members.list": MembersListOutput;
  "members.me": MembersMeOutput;
  "members.remove": MembersRemoveOutput;
  "members.update": MembersUpdateOutput;
  "organizations.create": OrganizationsCreateOutput;
  "organizations.list": OrganizationsListOutput;
  "projects.create": ProjectsCreateOutput;
  "projects.get": ProjectsGetOutput;
  "projects.list": ProjectsListOutput;
  "projects.setup": ProjectsSetupOutput;
  "projects.update": ProjectsUpdateOutput;
  "promotions.create": PromotionsCreateOutput;
  "promotions.preview": PromotionsPreviewOutput;
  "proposals.card": ProposalsCardOutput;
  "proposals.create": ProposalsCreateOutput;
  "proposals.decide": ProposalsDecideOutput;
  "proposals.get": ProposalsGetOutput;
  "proposals.list": ProposalsListOutput;
  "rules.create": RulesCreateOutput;
  "rules.get": RulesGetOutput;
  "rules.list": RulesListOutput;
  "rules.pause": RulesPauseOutput;
  "rules.preview": RulesPreviewOutput;
  "rules.publish": RulesPublishOutput;
  "rules.resume": RulesResumeOutput;
  "rules.stats": RulesStatsOutput;
  "rules.update": RulesUpdateOutput;
  "templates.get": TemplatesGetOutput;
  "templates.install": TemplatesInstallOutput;
  "templates.list": TemplatesListOutput;
  "templates.plan": TemplatesPlanOutput;
  "templates.remove": TemplatesRemoveOutput;
  "units.create": UnitsCreateOutput;
  "units.get": UnitsGetOutput;
  "units.give": UnitsGiveOutput;
  "units.give_preview": UnitsGivePreviewOutput;
  "units.list": UnitsListOutput;
  "units.send": UnitsSendOutput;
  "units.spend": UnitsSpendOutput;
  "units.update": UnitsUpdateOutput;
  "units.use": UnitsUseOutput;
  "users.export": UsersExportOutput;
  "users.get": UsersGetOutput;
  "users.list": UsersListOutput;
  "views.create": ViewsCreateOutput;
  "views.get": ViewsGetOutput;
  "views.list": ViewsListOutput;
  "views.update": ViewsUpdateOutput;
  "webhook_endpoints.create": WebhookEndpointsCreateOutput;
  "webhook_endpoints.delete": WebhookEndpointsDeleteOutput;
  "webhook_endpoints.list": WebhookEndpointsListOutput;
}
