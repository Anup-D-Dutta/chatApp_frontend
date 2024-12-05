
export const sampleChats =[
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '1',
        groupChat: false,
        membars: ["1", "2"],
    },

    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '2',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '3',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '4',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '5',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '6',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '7',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: 'Raees Ansari',
        _id: '8',
        groupChat: false,
        membars: ["1", "2"],
    },


    {
        avatar: [
            "https://www.w3schools.com/howto/img_avatar.png",
        ],
        name: 'Anup Dutta',
        _id: '9',
        groupChat: true,
        membars: ["1", "2"],
    },

];

export const sampleUsers = [
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: 'Anup Dutta',
        _id: '1',
    },
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: 'Rohit Kumar',
        _id: '2',
    },
];

export const sampleNotifications = [
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: 'Anup Dutta',
        },
        _id: '1',
    },
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: 'Rohit Kumar',
        },
        _id: '2',
    },
];

export const sampleMessage = [
    {
        attachments: [],
        content: 'L*uda ka message hai',
        _id: 'dfbfgbDbdzfbzbzdf',
        sender: {
            _id: 'user._id',
            name: 'Rohit',
        },
        chat: 'chatId',
        createAt: '2024-02-12T10:41:30.630Z',
    },

    {
        attachments: [
            {
                public_id: 'asdsad 2',
                url: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        ],
        content: '',
        _id: 'dfbfgbDbdzfbzbzdfe',
        sender: {
            _id: 'sdvsvds',
            name: 'Rohit 2',
        },
        chat: 'chatId ',
        createAt: '2024-02-12T10:41:30.630Z',
    },
];


export const dashboardData = {
    users: [
        {
            name: 'John Doe',
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: '1',
            username: 'johndoe',
            friends: 5,
            groups: 1
        },
        {
            name: 'Jane Doe',
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: '2',
            username: 'janedoe',
            friends: 3,
            groups: 2
        },
    ],


    chats: [
        {
            name: 'John Doe',
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: '1',
            groupChat: false,
            members: [
                { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
                { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' }
            ],
            totalMembers: 12,
            totalMessages: 20,
            creator: {
                name: 'Raj kumar',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png'
            },
        },
        {
            name: 'Gandu Group',
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: '2',
            groupChat: true,
            members: [
                { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
                { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' }
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: 'Raj kumar',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png'
            },
        },
    ],

    messages: [
        {
            attachments: [],
            content: 'Ankit Kumar',
            _id: 'sdvsdvdfvdzfc',
            sender: {
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                name: 'Chaman'
            },
            chat: 'chatId',
            groupChat: false,
            createAt: '2024-02-12T10:41:30.630Z',
        },
        {
            attachments: [
                {
                    public_id: 'sdcasc 2',
                    url: 'https://www.w3schools.com/howto/img_avatar.png'
                },
            ],
            content: '',
            _id: 'ihnkn',
            sender: {
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                name: 'Chaman'
            },
            chat: 'chatId',
            groupChat: true,
            createAt: '2024-02-12T10:41:30.630Z',
        },
    ]
}


