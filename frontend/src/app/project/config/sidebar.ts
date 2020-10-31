import { SideBarLink } from '@nevilparmar11/interface/ui-model/nav-link';

export const SideBarLinks = [
  new SideBarLink('Kanban Board', 'board', 'board'),
  new SideBarLink('Project Settings', 'cog', 'settings'),
  new SideBarLink('Repository','github',"https://github.com/nevilparmar11/project-management-system-server-client-"),
  new SideBarLink('Feedback','feedback','https://google.com'),
  new SideBarLink('My Profile','chevron-right','user-profile'),
  // new SideBarLink('Logout', 'arrow-up','../account/logout'),
  // new SideBarLink('Releases','ship'),
  // new SideBarLink('Issues and filters', 'filters'),
  // new SideBarLink('Pages', 'page'),
  // new SideBarLink('Reports', 'report'),
  // new SideBarLink('Components', 'component')
];
