import { UserRole } from "../generated/prisma";

export const ROLE_HIERARCHY = {
  OWNER: 4,
  ADMIN: 3,
  ACCOUNT_EXECUTIVE: 2,
  BAND: 1,
} as const;

export type Permission = 
  | "pages.create"
  | "pages.edit"
  | "pages.delete"
  | "pages.publish"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "announcements.create"
  | "announcements.delete"
  | "forum.moderate"
  | "forum.delete"
  | "artists.edit.all"
  | "artists.edit.own"
  | "documents.upload"
  | "documents.delete"
  | "messages.send"
  | "messages.read"
  | "site.settings"
  | "analytics.view";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  OWNER: [
    "pages.create",
    "pages.edit",
    "pages.delete",
    "pages.publish",
    "users.create",
    "users.edit",
    "users.delete",
    "announcements.create",
    "announcements.delete",
    "forum.moderate",
    "forum.delete",
    "artists.edit.all",
    "artists.edit.own",
    "documents.upload",
    "documents.delete",
    "messages.send",
    "messages.read",
    "site.settings",
    "analytics.view",
  ],
  ADMIN: [
    "announcements.create",
    "announcements.delete",
    "forum.moderate",
    "forum.delete",
    "artists.edit.all",
    "artists.edit.own",
    "documents.upload",
    "documents.delete",
    "messages.send",
    "messages.read",
    "analytics.view",
  ],
  ACCOUNT_EXECUTIVE: [
    "announcements.create",
    "artists.edit.all",
    "artists.edit.own",
    "documents.upload",
    "messages.send",
    "messages.read",
    "analytics.view",
  ],
  BAND: [
    "artists.edit.own",
    "messages.send",
    "messages.read",
  ],
};

export function hasPermission(
  userRole: UserRole,
  permission: Permission
): boolean {
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions.includes(permission);
}

export function hasRole(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function canEditArtist(
  userRole: UserRole,
  isOwnProfile: boolean
): boolean {
  if (hasPermission(userRole, "artists.edit.all")) {
    return true;
  }
  return isOwnProfile && hasPermission(userRole, "artists.edit.own");
}