import { ProfileFeature } from '../../features/profile/profile';

export default function ProfileScreen() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <ProfileFeature />
      </div>
    </div>
  );
}