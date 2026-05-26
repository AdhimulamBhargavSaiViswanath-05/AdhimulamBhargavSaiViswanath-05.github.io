import * as HoverCard from '@radix-ui/react-hover-card';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function ProfileCard({ profile }) {
  return (
    <HoverCard.Root openDelay={120} closeDelay={80}>
      <HoverCard.Trigger asChild>
        <a className="profile-card" href={profile.href} target="_blank" rel="noreferrer" data-reveal>
          <div className="profile-card-header">
            <img src={profile.logo} alt={profile.name} loading="lazy" decoding="async" />
            <span>Live profile</span>
          </div>
          <div className="profile-card-body">
            <h3>{profile.name}</h3>
            <p>{profile.handle}</p>
          </div>
          <div className="profile-card-footer">
            <span>Open profile</span>
            <ArrowTopRightIcon />
          </div>
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="hover-card" sideOffset={12} align="start">
          <p>{profile.name}</p>
          <strong>{profile.handle}</strong>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}