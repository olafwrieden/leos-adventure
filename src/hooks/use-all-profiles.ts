import { useKV } from '@github/spark/hooks';
import { ChildProfile } from '@/types';

export function useAllProfiles() {
  const [allProfiles, setAllProfiles] = useKV<ChildProfile[]>('all-child-profiles', []);

  const addOrUpdateProfile = (profile: ChildProfile) => {
    setAllProfiles(current => {
      const existing = current.find(p => p.id === profile.id);
      if (existing) {
        return current.map(p => p.id === profile.id ? profile : p);
      }
      return [...current, profile];
    });
  };

  const removeProfile = (profileId: string) => {
    setAllProfiles(current => current.filter(p => p.id !== profileId));
  };

  return {
    allProfiles,
    addOrUpdateProfile,
    removeProfile
  };
}