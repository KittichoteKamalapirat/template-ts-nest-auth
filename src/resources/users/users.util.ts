// features restriction
export type Membership = "free" | "individual" | "team" | "enterprise";

export const MAX_TESTS_NUM: Record<Membership, number> = {
  free: 3,
  individual: 9999,
  team: 9999,
  enterprise: 9999,
};

// if CAN_CREATE_TITLE_TEST[membership] && showButton
export const CAN_GET_AI_SUGGESTED_TITLES: Record<Membership, boolean> = {
  free: false,
  individual: true,
  team: true,
  enterprise: true,
};

// if teamMembers.length < MAX_TEAM_MEMBERS_NUM[membership] && showButton
export const MAX_TEAM_MEMBERS_NUM: Record<Membership, number> = {
  free: 1,
  individual: 1,
  team: 3,
  enterprise: 9999,
};

// if myChannels.length < MAX_CHANNELS_NUM[membership] && showButton
export const MAX_CHANNELS_NUM: Record<Membership, number> = {
  free: 1,
  individual: 1,
  team: 3,
  enterprise: 9999,
};
