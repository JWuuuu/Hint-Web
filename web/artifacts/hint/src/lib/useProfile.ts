/**
 * useProfile — the current anonymous user's saved identity. Returns the
 * profile (or null when none exists yet), loading state, and a save mutation
 * used by both onboarding and the Me edit flow.
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Profile, ProfileInput } from "@workspace/api-client-react";
import { getAnonId } from "./identity";

function localProfileKey(anonId: string) {
  return `hint_profile_v2_${anonId}`;
}

function readLocalProfile(anonId: string): Profile | null {
  try {
    const raw = window.localStorage.getItem(localProfileKey(anonId));
    if (!raw) return null;
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

function writeLocalProfile(anonId: string, input: Omit<ProfileInput, "anonId">): Profile {
  const existing = readLocalProfile(anonId);
  const profile: Profile = {
    anonId,
    name: input.name,
    birthDate: input.birthDate,
    birthTime: input.birthTime ?? null,
    birthPlace: input.birthPlace ?? null,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(localProfileKey(anonId), JSON.stringify(profile));
  } catch {
    // If localStorage is blocked, still return the in-memory value for this save.
  }

  return profile;
}

export function useProfile() {
  const anonId = getAnonId();
  const queryClient = useQueryClient();
  const queryKey = ["profile", anonId];

  const query = useQuery<Profile | null>({
    queryKey,
    queryFn: async () => readLocalProfile(anonId),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const profile = query.data ?? null;
  const isMissing = query.isSuccess && query.data === null;

  async function saveProfile(input: Omit<ProfileInput, "anonId">) {
    const saved = writeLocalProfile(anonId, input);
    queryClient.setQueryData(queryKey, saved);
    return saved;
  }

  return {
    anonId,
    profile,
    isLoading: query.isLoading,
    isMissing,
    isError: query.isError,
    saveProfile,
    isSaving: false,
    refetch: query.refetch,
  };
}
