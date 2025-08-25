interface MenuItems {
  title: string
  icon: string
}
interface AdminLinks {
  [key: string]: MenuItems
}

const ADMIN_NAVLINKS: AdminLinks = {
  '/admin/dasboard': {
    title: 'Dashboard',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 13.1V19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 4.1V5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  '/admin/transactions': {
    title: 'Transactions',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.72827 19.7C7.54827 18.82 8.79828 18.89 9.51828 19.85L10.5283 21.2C11.3383 22.27 12.6483 22.27 13.4583 21.2L14.4683 19.85C15.1883 18.89 16.4383 18.82 17.2583 19.7C19.0383 21.6 20.4883 20.97 20.4883 18.31V7.04C20.4883 3.01 19.5483 2 15.7683 2H8.20828C4.42828 2 3.48828 3.01 3.48828 7.04V18.3C3.49828 20.97 4.95827 21.59 6.72827 19.7Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.25 10H14.75" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
}

const getUsableAdminLinks = () => {
  const links = ADMIN_NAVLINKS
  return {
    links: ADMIN_NAVLINKS,
    keys: Object.keys(links),
  }
}

export default getUsableAdminLinks
