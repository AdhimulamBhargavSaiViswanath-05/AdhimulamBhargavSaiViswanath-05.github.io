import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { navigation, site } from '../data/siteContent';

export default function NavMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label={`${site.name} home`}>
          <span>{site.initials}</span>
          <div>
            <strong>{site.name}</strong>
            <small>AI/ML portfolio</small>
          </div>
        </a>

        <NavigationMenu.Root className="desktop-nav" aria-label="Main navigation">
          <NavigationMenu.List className="nav-list">
            {navigation.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link className="nav-link" href={item.href}>
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger className="mobile-trigger" aria-label="Open navigation menu">
            <HamburgerMenuIcon />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="mobile-drawer">
              <div className="mobile-drawer-header">
                <Dialog.Title>Navigate</Dialog.Title>
                <Dialog.Close className="icon-button" aria-label="Close navigation menu">
                  <Cross2Icon />
                </Dialog.Close>
              </div>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}