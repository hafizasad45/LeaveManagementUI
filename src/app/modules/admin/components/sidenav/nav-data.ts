import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'home',
        icon: 'fa fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'products',
        icon: 'fa fa-product-hunt',
        label: 'Users',
        items: [
            {
                routeLink: 'users',
                label: 'Show Users'                
            },
            {
                routeLink: 'changePassword',
                label: 'Change Password',
            }
        ]
    },
    {
        routeLink: 'statistics',
        icon: 'fa fa-bar-chart',
        label: 'Statistics'
    },
    {
        routeLink: 'coupens',
        icon: 'fa fa-tags',
        label: 'Coupens',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'coupens/create',
                label: 'Create Coupens'
            }
        ]
    },
    {
        routeLink: 'pages',
        icon: 'fa fa-file',
        label: 'Pages'
    },
    {
        routeLink: 'media',
        icon: 'fa fa-camera',
        label: 'Media'
    },
    {
        routeLink: 'settings',
        icon: 'fa fa-cog',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
];