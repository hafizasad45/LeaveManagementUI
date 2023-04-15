import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'home',
        icon: 'fa fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'products',
        icon: 'fa fa-user',
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
        routeLink: 'products',
        icon: 'fa fa-user',
        label: 'System Setting',
        items: [
            {
                routeLink: 'instituteList',
                label: 'Institute'                
            },
            {
                routeLink: 'branchList',
                label: 'Branch',
            },
            {
                routeLink: 'departmentList',
                label: 'Department',
            },
            {
                routeLink: 'designationList',
                label: 'Designation',
            }
        ]
    }
];