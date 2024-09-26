import React, { useState, useEffect } from 'react';
import './kanbanboard.css';
import AddIcon from './assets/add.svg'
import TodoIcon from './assets/To-do.svg'
import Progressicon from './assets/in-progress.svg'
import Backlogicon from './assets/Backlog.svg'
import NoPriorityicon from './assets/No-priority.svg'
import LowPriorityicon from './assets/Img - Low Priority.svg'
import MediumPriorityicon from './assets/Img - Medium Priority.svg'
import HighPriorityicon from './assets/Img - High Priority.svg'
import DisplayIcon from './assets/Display.svg'
const KanbanBoard = () => {

    const groups = {
        'Todo':{
            icon: TodoIcon,
        },

        'In progress':{
            icon: Progressicon,
        },
        'Backlog':{
            icon: Backlogicon,
        },

        'usr-1':{
            icon: Backlogicon,
        },
        'usr-2':{
            icon: Backlogicon,
        },
        'usr-3':{
            icon: Backlogicon,
        },
        'usr-3':{
            icon: Backlogicon,
        },
        'usr-4':{
            icon: Backlogicon,
        },
        'usr-5':{
            icon: Backlogicon,
        },
        '0':{
            icon: NoPriorityicon,
        },
        '1':{
            icon: LowPriorityicon,
        },
        '2':{
            icon: MediumPriorityicon,
        },
        '3':{
            icon: HighPriorityicon,
        },
        '4':{
            icon: HighPriorityicon,
        },
        '5':{
            icon: HighPriorityicon,
        },
        Todo:{
            icon: TodoIcon,
        },
        status: {
            label: 'Status',
            icon: TodoIcon,
            subgroups: [
                { label: 'Open', icon: TodoIcon },
                { label: 'In Progress', icon: TodoIcon },
                { label: 'Closed', icon: TodoIcon },
            ],
        },
        userId: {
            label: 'User',
            icon: AddIcon,
            subgroups: [
                { label: 'Admin', icon: TodoIcon },
                { label: 'Member', icon: TodoIcon },
            ],
        },
        priority: {
            label: 'Priority',
            icon: TodoIcon,
            subgroups: [
                { label: 'High', icon: TodoIcon },
                { label: 'Medium', icon: TodoIcon },
                { label: 'Low', icon: TodoIcon },
            ],
        },
    };
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
    const [grouping, setGrouping] = useState("Status");
    const [ordering, setOrdering] = useState("Priority");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState('status'); // Default grouping
    const [sortBy, setSortBy] = useState('priority'); // Default sorting
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Fetch tickets data from the API
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment') // Replace with your API URL
            .then(response => response.json())
            .then(data => {
                setTickets(data.tickets);
                setIsLoaded(true);
            });
    }, []);

    const handleGroupingChange = (e) => {
        setGroupBy(e.target.value);
    };

    const handleSortingChange = (e) => {
        setSortBy(e.target.value);
    };

    // Grouping function
    const groupTickets = () => {
        return tickets.reduce((acc, ticket) => {
            const key = ticket[groupBy];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(ticket);
            return acc;
        }, {});
    };

    // Sorting function
    const sortTickets = (groupedTickets) => {
        return Object.keys(groupedTickets).map(key => ({
            group: key,
            tickets: groupedTickets[key].sort((a, b) => {
                return sortBy === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title);
            }),
        }));
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const groupedTickets = groupTickets();
    const sortedGroupedTickets = sortTickets(groupedTickets);

    return (
        
        <div>
        <div className="dropdown-container">
            <div className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                <span className='filter'><img src={DisplayIcon} />
                </span>   Display <span className='down-arrow'><i className="fas fa-angle-down"></i></span>
                </button>
                {isOpen && ( // Conditional rendering based on isOpen state
                    <div className="dropdown-content">
                        <div className="dropdown-item">
                            <label>Grouping</label>
                            <select onChange={handleGroupingChange}>
                            <option value="status">Status</option>
                        <option value="userId">User</option>
                        <option value="priority">Priority</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label>Ordering</label>
                            <select onChange={handleSortingChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
      
            <div className="kanban-container">
                {sortedGroupedTickets.map(group => (
                    <div key={group.group} className="kanban-group">
                                <div className="group-container">
                                    
                                <div className='header_checkbox'>
                                <img src={groups[group.group].icon} alt={group.group.label} className='icons' />
                                
                                    
                                    <p className='group-name'>{group.group}</p>
                                </div>
                                    <button className='add-button'>+</button>
                                </div>
                        {group.tickets.map(ticket => (
                            <div key={ticket.id} className="card">
                                <div className="header">
                                    <h3>{ticket.id}</h3>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC" alt="Profile Picture" />
                                </div>
                                <p className='title'>{ticket.title}</p>
                                <div className="badges">
                                <div className="badge1">


    <span className="badge feature">       <span className="icon-circle">
        <i className="fas fa-info"></i> {/* Font Awesome info icon */}
    </span></span>
</div>
                                <div className="badge2">

                                <span className="key-circle"></span>
                                    <span className="badge_feature">Feature Request</span>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
