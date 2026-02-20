// mockData.js

export const mockExpenses = {
  sheets: [
    { id: 1, label: "January", netIncome: 3325 },
    { id: 2, label: "February", netIncome: 3780 },
    { id: 3, label: "March", netIncome: 3460 },
    { id: 4, label: "April", netIncome: 3995 },
    { id: 5, label: "May", netIncome: 3610 },
    { id: 6, label: "June", netIncome: 3870 }
  ],

  expenses: [
    // JANUARY (sheetId: 1)
    { id: 101, name: "Rent", amount: 1200, isPaid: true, userId: 1, sheetId: 1 },
    { id: 102, name: "Groceries", amount: 260, isPaid: false, userId: 1, sheetId: 1 },
    { id: 103, name: "Electric", amount: 140, isPaid: true, userId: 1, sheetId: 1 },
    { id: 104, name: "Internet", amount: 75, isPaid: true, userId: 1, sheetId: 1 },
    { id: 105, name: "Gas", amount: 90, isPaid: false, userId: 1, sheetId: 1 },
    { id: 106, name: "Dining Out", amount: 180, isPaid: false, userId: 1, sheetId: 1 },
    { id: 107, name: "Subscriptions", amount: 45, isPaid: true, userId: 1, sheetId: 1 },
    { id: 108, name: "Gym", amount: 55, isPaid: true, userId: 1, sheetId: 1 },
    { id: 109, name: "Car Wash", amount: 25, isPaid: true, userId: 1, sheetId: 1 },
    { id: 110, name: "Coffee", amount: 65, isPaid: false, userId: 1, sheetId: 1 },

    // FEBRUARY (sheetId: 2)
    { id: 201, name: "Rent", amount: 1200, isPaid: true, userId: 1, sheetId: 2 },
    { id: 202, name: "Groceries", amount: 240, isPaid: true, userId: 1, sheetId: 2 },
    { id: 203, name: "Electric", amount: 155, isPaid: false, userId: 1, sheetId: 2 },
    { id: 204, name: "Internet", amount: 75, isPaid: true, userId: 1, sheetId: 2 },
    { id: 205, name: "Gas", amount: 85, isPaid: true, userId: 1, sheetId: 2 },
    { id: 206, name: "Dining Out", amount: 210, isPaid: false, userId: 1, sheetId: 2 },
    { id: 207, name: "Subscriptions", amount: 45, isPaid: true, userId: 1, sheetId: 2 },
    { id: 208, name: "Gym", amount: 55, isPaid: true, userId: 1, sheetId: 2 },
    { id: 209, name: "Movies", amount: 40, isPaid: false, userId: 1, sheetId: 2 },
    { id: 210, name: "Snacks", amount: 70, isPaid: true, userId: 1, sheetId: 2 },

    // MARCH (sheetId: 3)
    { id: 301, name: "Rent", amount: 1200, isPaid: true, userId: 1, sheetId: 3 },
    { id: 302, name: "Groceries", amount: 275, isPaid: false, userId: 1, sheetId: 3 },
    { id: 303, name: "Electric", amount: 135, isPaid: true, userId: 1, sheetId: 3 },
    { id: 304, name: "Internet", amount: 75, isPaid: true, userId: 1, sheetId: 3 },
    { id: 305, name: "Gas", amount: 95, isPaid: false, userId: 1, sheetId: 3 },
    { id: 306, name: "Dining Out", amount: 190, isPaid: true, userId: 1, sheetId: 3 },
    { id: 307, name: "Subscriptions", amount: 45, isPaid: true, userId: 1, sheetId: 3 },
    { id: 308, name: "Gym", amount: 55, isPaid: true, userId: 1, sheetId: 3 },
    { id: 309, name: "Clothes", amount: 120, isPaid: false, userId: 1, sheetId: 3 },
    { id: 310, name: "Coffee", amount: 60, isPaid: true, userId: 1, sheetId: 3 },

    // APRIL (sheetId: 4)
    { id: 401, name: "Rent", amount: 1200, isPaid: true, userId: 1, sheetId: 4 },
    { id: 402, name: "Groceries", amount: 255, isPaid: true, userId: 1, sheetId: 4 },
    { id: 403, name: "Electric", amount: 160, isPaid: false, userId: 1, sheetId: 4 },
    { id: 404, name: "Internet", amount: 75, isPaid: true, userId: 1, sheetId: 4 },
    { id: 405, name: "Gas", amount: 100, isPaid: true, userId: 1, sheetId: 4 },
    { id: 406, name: "Dining Out", amount: 230, isPaid: false, userId: 1, sheetId: 4 },
    { id: 407, name: "Subscriptions", amount: 45, isPaid: true, userId: 1, sheetId: 4 },
    { id: 408, name: "Gym", amount: 55, isPaid: true, userId: 1, sheetId: 4 },
    { id: 409, name: "Car Payment", amount: 410, isPaid: false, userId: 1, sheetId: 4 },
    { id: 410, name: "Snacks", amount: 80, isPaid: true, userId: 1, sheetId: 4 },

    // MAY (sheetId: 5)
    { id: 501, name: "Rent", amount: 1200, isPaid: true, userId: 1, sheetId: 5 },
    { id: 502, name: "Groceries", amount: 270, isPaid: false, userId: 1, sheetId: 5 },
    { id: 503, name: "Electric", amount: 145, isPaid: true, userId: 1, sheetId: 5 },
    { id: 504, name: "Internet", amount: 75, isPaid: true, userId: 1, sheetId: 5 },
    { id: 505, name: "Gas", amount: 110, isPaid: false, userId: 1, sheetId: 5 },
    { id: 506, name: "Dining Out", amount: 205, isPaid: true, userId: 1, sheetId: 5 },
    { id: 507, name: "Subscriptions", amount: 45, isPaid: true, userId: 1, sheetId: 5 },
    { id: 508, name: "Gym", amount: 55, isPaid: true, userId: 1, sheetId: 5 },
    { id: 509, name: "Hobbies", amount: 150, isPaid: false, userId: 1, sheetId: 5 },
    { id: 510, name: "Coffee", amount: 70, isPaid: true, userId: 1, sheetId: 5 },

    // JUNE (sheetId: 6)
    { id: 601, name: "Rent", amount: 1200, isPaid: true, userId: 1, sheetId: 6 },
    { id: 602, name: "Groceries", amount: 265, isPaid: true, userId: 1, sheetId: 6 },
    { id: 603, name: "Electric", amount: 170, isPaid: false, userId: 1, sheetId: 6 },
    { id: 604, name: "Internet", amount: 75, isPaid: true, userId: 1, sheetId: 6 },
    { id: 605, name: "Gas", amount: 120, isPaid: false, userId: 1, sheetId: 6 },
    { id: 606, name: "Dining Out", amount: 215, isPaid: true, userId: 1, sheetId: 6 },
    { id: 607, name: "Subscriptions", amount: 45, isPaid: true, userId: 1, sheetId: 6 },
    { id: 608, name: "Gym", amount: 55, isPaid: true, userId: 1, sheetId: 6 },
    { id: 609, name: "Travel", amount: 300, isPaid: false, userId: 1, sheetId: 6 },
    { id: 610, name: "Snacks", amount: 85, isPaid: true, userId: 1, sheetId: 6 }
  ]
};