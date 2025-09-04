import { useKV } from '@github/spark/hooks';
import { ChildProfile } from '@/types';

export function useAllProfiles() {
  const [allProfiles, setAllProfiles] = useKV<ChildProfile[]>('all-child-profiles', []);

  const addOrUpdateProfile = (profile: ChildProfile) => {
    setAllProfiles(current => {
      const safeCurrent = current ?? [];
      const existing = safeCurrent.find(p => p.id === profile.id);
      if (existing) {
        return safeCurrent.map(p => p.id === profile.id ? profile : p);
      }
      return [...safeCurrent, profile];
    });
  };

  const removeProfile = (profileId: string) => {
    setAllProfiles(current => (current ?? []).filter(p => p.id !== profileId));
  };

  return {
    allProfiles,
    addOrUpdateProfile,
    removeProfile
  };
}