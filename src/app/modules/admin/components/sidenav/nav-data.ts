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
        icon: 'fa fa-gear',
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
            },
            {
                routeLink: 'gradeList',
                label: 'Grade',
            },
            {
                routeLink: 'employeeTypeList',
                label: 'Employee Type',
            },
            {
                routeLink: 'employeeList',
                label: 'Employee',
            }
        ]
    },
    {
        routeLink: 'products',
        icon: 'fa fa-coffee',
        label: 'Leave',
        items: [
            {
                routeLink: 'lms_ActivityList',
                label: 'Activity List'                
            },
            {
                routeLink: 'lms_Weekend',
                label: 'Weekends'                
            }
        ]
    }
];